package com.erp.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.erp.auth.PrincipalDetails;
import com.erp.dto.ManagerDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtProperties jwtProperties;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            ManagerDTO inputData = mapper.readValue(request.getInputStream(), ManagerDTO.class);
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(inputData.getManagerId(), inputData.getPw());
            Authentication authentication = authenticationManager.authenticate(authRequest);
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtProperties.getEXPIRATION_TIME()))
                .withClaim("managerId", principalDetails.getManager().getManagerId())
                .withClaim("role", principalDetails.getManager().getRole())
                .sign(Algorithm.HMAC512(jwtProperties.getSECRET().getBytes()));
        response.addHeader(jwtProperties.getHEADER(), jwtProperties.getTOKEN_PREFIX()+jwtToken); //이름 상관없는데, Properties에 설정해둔 거 있으니 그거 씀 & 토큰 이름 접두사 넣음
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        new ObjectMapper().writeValue(
                response.getWriter(),
                Map.of(
                        "message", "login OK",
                        "role", principalDetails.getManager().getRole()
                )
        );
    }
}

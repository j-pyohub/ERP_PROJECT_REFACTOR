package com.erp.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.erp.auth.PrincipalDetails;
import com.erp.dao.ManagerDAO;
import com.erp.dto.ManagerDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

@Log4j2
public class JwtBasicAuthenticationFilter extends BasicAuthenticationFilter {
    private final ManagerDAO managerDAO;
    private final JwtProperties jwtProperties;

    public JwtBasicAuthenticationFilter(AuthenticationManager authenticationManager, ManagerDAO managerDAO, JwtProperties jwtProperties) {
        super(authenticationManager);
        this.managerDAO = managerDAO;
        this.jwtProperties = jwtProperties;
        log.info("사용자 인증 필터");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("doFilter"+request.getRequestURI());
        String jwtToken =request.getHeader(jwtProperties.getHEADER());
        log.info("jwtToken:"+jwtToken);
        if (jwtToken == null || !jwtToken.trim().startsWith(jwtProperties.getTOKEN_PREFIX())) {
            chain.doFilter(request, response);
            return;
        }
        jwtToken = jwtToken.replace(jwtProperties.getTOKEN_PREFIX(), "");
        String managerId = JWT.require(Algorithm.HMAC512(jwtProperties.getSECRET()))
                .build().verify(jwtToken).getClaim("managerId").asString();
        log.info("managerId:"+managerId);

        if (managerId != null) {
            ManagerDTO manager = managerDAO.getManagerForLogin(managerId);
            PrincipalDetails details = new PrincipalDetails(manager);
            Authentication authentication = new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}

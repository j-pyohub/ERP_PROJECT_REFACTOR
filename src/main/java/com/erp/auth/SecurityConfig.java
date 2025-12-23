package com.erp.auth;

import com.erp.auth.LoginSuccessHandler;
import com.erp.dao.ManagerDAO;
import com.erp.jwt.JwtAuthenticationFilter;
import com.erp.jwt.JwtBasicAuthenticationFilter;
import com.erp.jwt.JwtProperties;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import java.io.IOException;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    private final CorsFilter corsFilter;
    private final LoginSuccessHandler loginSuccessHandler;
    private final JwtProperties jwtProperties;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration ac) throws Exception {
        return ac.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager am, ManagerDAO managerDAO) throws Exception {
        JwtAuthenticationFilter jwtAuthFilter =
                    new JwtAuthenticationFilter(am, jwtProperties);
            jwtAuthFilter.setFilterProcessesUrl("/api/auth/login");
        http.csrf(csrf -> csrf.disable());
        http.addFilter(corsFilter);
        http
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(
                new JwtBasicAuthenticationFilter(am, managerDAO, jwtProperties),
                UsernamePasswordAuthenticationFilter.class
            );
        http.authorizeHttpRequests(auth ->
                auth
                .requestMatchers("/**","/login", "/react/**", "/api/auth/**").permitAll()
                .requestMatchers("/api/**").authenticated()
                .requestMatchers("/react/**").permitAll()

                .anyRequest().authenticated());

        http.exceptionHandling(ex -> {
           ex.accessDeniedHandler(new AccessDeniedHandler() {
               @Override
               public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                   response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                   request.getRequestDispatcher("/no Permission").forward(request, response);
               }
           });
        });

        return http.build();
    }
}

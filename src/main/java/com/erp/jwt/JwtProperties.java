package com.erp.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {
    private String SECRET;
    private long EXPIRATION_TIME;
    private String TOKEN_PREFIX;
    private String HEADER;
}

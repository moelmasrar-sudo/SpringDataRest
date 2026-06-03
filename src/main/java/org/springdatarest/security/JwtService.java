package org.springdatarest.security;

import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtService {
    static final long EXPIRATIONTIME = 86400000; // 1 day in ms
    static final String PREFIX = "Bearer ";
    // Generate secret key. In production, use application.properties.
    static final SecretKey key = Jwts.SIG.HS256.key().build();

    public String getToken(String username) {
        String token = Jwts.builder()
                .subject(username)
                .expiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(key)
                .compact();
        return token;
    }

    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null) {
            String user = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token.replace(PREFIX, ""))
                    .getPayload()
                    .getSubject();

            if (user != null)
                return user;
        }
        return null;
    }
}

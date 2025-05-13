package com.bookmytable.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")          // put in application.properties
    private String secret;           // any 32+ char random string

    @Value("${jwt.expiration-ms:3600000}")  // 1 h default
    private long expirationMs;

    private SecretKey key;

    @PostConstruct                    // create once at startup
    private void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /* ------------------------------------------------------------------ */

    public String generateToken(UserDetails user) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                   .setSubject(user.getUsername())
                   .setIssuedAt(now)
                   .setExpiration(exp)
                   .signWith(key, SignatureAlgorithm.HS256)
                   .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
    }

    /** Reads “Authorization: Bearer <token>” header */
    public String resolveToken(HttpServletRequest req) {
        String hdr = req.getHeader("Authorization");
        return (hdr != null && hdr.startsWith("Bearer "))
               ? hdr.substring(7)
               : null;
    }
}

package com.bookmytable.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtil {

  private final Key key = Keys.hmacShaKeyFor(
      System.getenv("JWT_SECRET").getBytes());

  public String generate(String subject) {
    return Jwts.builder()
        .setSubject(subject)
        .setIssuedAt(new Date())
        .setExpiration(Date.from(Instant.now().plusSeconds(4 * 60 * 60)))
        .signWith(key)
        .compact();
  }

  public String validateAndGetSubject(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
               .parseClaimsJws(token).getBody().getSubject();
  }
}

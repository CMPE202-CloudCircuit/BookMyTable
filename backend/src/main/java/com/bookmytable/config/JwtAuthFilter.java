package com.bookmytable.config;

import com.bookmytable.service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import com.bookmytable.util.JwtProvider; // Ensure this is the correct package for JwtProvider
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import lombok.NonNull;

import java.io.IOException;

// @Component @RequiredArgsConstructor
// public class JwtAuthFilter extends OncePerRequestFilter {

//   private final JwtUtil jwt;
//   private final UserService users;

//   @Override
//   protected void doFilterInternal(
//       @NonNull HttpServletRequest req, 
//       @NonNull HttpServletResponse res, 
//       @NonNull FilterChain chain)
//       throws ServletException, IOException {

//     String header = req.getHeader("Authorization");
//     if (header != null && header.startsWith("Bearer ")) {
//       String token = header.substring(7);
//       try {
//         String email = jwt.validateAndGetSubject(token);
//         var userDetails = users.loadUserByUsername(email);
//         var auth = new UsernamePasswordAuthenticationToken(
//                       userDetails, null, userDetails.getAuthorities());
//         auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
//         SecurityContextHolder.getContext().setAuthentication(auth);
//       } catch (Exception ignored) { }  // invalid token ⇒ anonymous
//     }
//     chain.doFilter(req, res);
//   }
// }
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider; // Ensure JwtProvider is implemented and available in the specified package
    //private final JwtProvider jwtProvider;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
                                    throws IOException, ServletException {

        String token = jwtProvider.resolveToken(req);
        if (token != null && jwtProvider.validateToken(token)) {

            String username = jwtProvider.extractUsername(token);
            UserDetails userDetails = userService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(req, res);
    }
}

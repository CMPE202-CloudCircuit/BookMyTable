package com.bookmytable.config;

import com.bookmytable.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserService userService;            // implements UDS
    private final PasswordEncoder passwordEncoder;

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);  // now type-safe
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}


// @Configuration @EnableWebSecurity @EnableMethodSecurity
// @RequiredArgsConstructor
// public class SecurityConfig {

//    private final UserService userService;
//   private final JwtAuthFilter jwtFilter;
//   private final UserService   users;

//   @Bean
//   public SecurityFilterChain chain(
//         org.springframework.security.config.annotation.web.builders.HttpSecurity http)
//         throws Exception {

//     http.csrf(cs -> cs.disable())
//         .sessionManagement(sm ->
//            sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//         .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/api/auth/**").permitAll()
//            .requestMatchers(HttpMethod.GET, "/api/restaurants/**").permitAll()
//            .anyRequest().authenticated())
//         .addFilterBefore(jwtFilter,
//            org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
//         .httpBasic(Customizer.withDefaults());

//     return http.build();
//   }

//   @Bean
//   PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

//   @Bean
//     public AuthenticationManager authManager(HttpSecurity http) throws Exception {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userService);    // now acceptable
//         provider.setPasswordEncoder(passwordEncoder);

//         return new ProviderManager(provider);
//     }
// }

// @Configuration
// @EnableWebSecurity
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final UserService userService;       // implements UserDetailsService
//     private final PasswordEncoder passwordEncoder;

//     @Bean
//     public AuthenticationManager authManager(HttpSecurity http) throws Exception {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userService);    // now acceptable
//         provider.setPasswordEncoder(passwordEncoder);

//         return new ProviderManager(provider);
//     }
// }

package com.bookmytable.service;

import com.bookmytable.dto.UserSignupDto;
import com.bookmytable.model.Role;
import com.bookmytable.model.User;
import com.bookmytable.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import com.bookmytable.security.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;    // inject in config
    private final JwtProvider jwtProvider;              // write or wire

    /* --------------- SIGN-UP --------------- */
    public User register(UserSignupDto dto) {

        if (userRepo.existsByUsername(dto.username()))
            throw new IllegalStateException("Username in use");
        if (userRepo.existsByEmail(dto.email()))
            throw new IllegalStateException("Email in use");

        Set<Role> roles = Arrays.stream(dto.roles())
                                .map(String::toUpperCase)
                                .map(Role::valueOf)
                                .collect(Collectors.toSet());

        User user = User.builder()
                        .username(dto.username())
                        .email(dto.email())
                        .password(passwordEncoder.encode(dto.password()))
                        .phone(dto.phone())
                        .roles(roles)
                        .build();

        return userRepo.save(user);
    }

    /* --------------- LOGIN (returns JWT) --------------- */
    public String login(String username, String rawPassword) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, rawPassword));

        UserDetails details = loadUserByUsername(username);
        return jwtProvider.generateToken(details);
    }

    /* --------------- UserDetailsService --------------- */
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User u = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        return org.springframework.security.core.userdetails.User
                .withUsername(u.getUsername())
                .password(u.getPassword())
                .authorities(u.getRoles().stream()
                              .map(Enum::name)
                              .toArray(String[]::new))
                .build();
    }
}

// /**
//  * Handles user-related business logic (sign-up, lookup, etc.).
//  */
// @Service
// @RequiredArgsConstructor          // injects userRepo + passwordEncoder via constructor
// public class UserService {

//     private final UserRepository userRepo;
//     private final PasswordEncoder passwordEncoder;

//     // -------------------------------------------------------------------------
//     // Public API
//     // -------------------------------------------------------------------------

//     /**
//      * Registers a new user and returns the persisted entity.
//      * Throws IllegalStateException if username or email is already taken.
//      */
//     public User register(UserSignupDto dto) {

//         // 1. Guard clauses — uniqueness checks
//         if (userRepo.existsByUsername(dto.username())) {
//             throw new IllegalStateException("Username already in use");
//         }
//         if (userRepo.existsByEmail(dto.email())) {
//             throw new IllegalStateException("Email already in use");
//         }

//         // 2. Convert String[] → Set<Role>
//         Set<Role> roles = Arrays.stream(dto.roles())
//                                 .map(String::trim)
//                                 .map(String::toUpperCase)
//                                 .map(Role::valueOf)   // "ADMIN" → Role.ADMIN
//                                 .collect(Collectors.toSet());

//         // 3. Build and save the user
//         User user = User.builder()
//                         .username(dto.username())
//                         .email(dto.email())
//                         .password(passwordEncoder.encode(dto.password()))
//                         .roles(roles)
//                         .build();

//         return userRepo.save(user);
//     }

//     /** Simple lookup by username (optional helper). */
//     public Optional<User> findByUsername(String username) {
//         return userRepo.findByUsername(username);
//     }
// }

// // UserService
// package com.bookmytable.service;

// import com.bookmytable.config.JwtUtil;
// import com.bookmytable.model.Role;
// import com.bookmytable.model.User;
// import com.bookmytable.repo.UserRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.core.userdetails.*;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.util.Set;

// @Service @RequiredArgsConstructor
// public class UserService implements UserDetailsService {

//   private final UserRepository repo;
//   private final PasswordEncoder encoder;
//   private final JwtUtil jwt;

//   public String register(String email, String raw) {
//     if (repo.existsByEmail(email)) throw new RuntimeException("email taken");
//     User u = new User();
//     u.setEmail(email);
//     u.setPasswordHash(encoder.encode(raw));
//     u.setRoles(Set.of(Role.CUSTOMER));
//     repo.save(u);
//     return jwt.generate(email);
//   }

//   public String login(String email, String raw) {
//     User u = repo.findByEmail(email).orElseThrow(
//         () -> new RuntimeException("bad credentials"));
//     if (!encoder.matches(raw, u.getPasswordHash()))
//       throw new RuntimeException("bad credentials");
//     return jwt.generate(email);
//   }

//   @Override
//   public UserDetails loadUserByUsername(String email) {
//     User u = repo.findByEmail(email).orElseThrow();
//     return User.builder()
//         .username(u.getEmail())
//         .password(u.getPasswordHash())
//         .roles(u.getRoles().stream().map(Enum::name).toArray(String[]::new))
//         .build();
//   }
// }

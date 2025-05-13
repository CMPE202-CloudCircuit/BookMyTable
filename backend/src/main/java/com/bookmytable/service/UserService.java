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

// AuthController
package com.bookmytable.web;

import com.bookmytable.dto.*;
import com.bookmytable.service.UserService;
import com.bookmytable.model.User; // Ensure this is the correct package for the User class
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/auth",
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

  private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserSignupDto dto) {
        return ResponseEntity.ok(userService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username,
                                                     @RequestParam String password) {
        String token = userService.login(username, password);
        return ResponseEntity.ok(Map.of("token", token));
    }
}

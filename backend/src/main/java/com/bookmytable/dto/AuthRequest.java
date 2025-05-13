package com.bookmytable.dto;
import jakarta.validation.constraints.*;
public record AuthRequest(
        @Email String email,
        @Size(min = 8, max = 32) String password) {}
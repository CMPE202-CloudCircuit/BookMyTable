package com.bookmytable.dto;
import jakarta.validation.constraints.*;
public record AuthRequest(
        @Email String email,
        @Size(min = 4, max = 64) String password) {}
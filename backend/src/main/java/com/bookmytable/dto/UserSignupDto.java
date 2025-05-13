package com.bookmytable.dto;
// src/main/java/com/bookmytable/dto/UserSignupDto.java
public record UserSignupDto(
        String username,
        String email,
        String password,
        String phone,
        String[] roles      // e.g. ["ADMIN","USER"]
) {}

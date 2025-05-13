// SearchRequest / SearchResult
package com.bookmytable.dto;
import jakarta.validation.constraints.*;
import java.time.*;
import java.util.List;

public record SearchRequest(
    @NotNull LocalDate date,
    @NotNull LocalTime time,
    @Min(1) @Max(12) int partySize,
    String city, String state,
    @Pattern(regexp="^\\d{5}$") String zip) {}
    

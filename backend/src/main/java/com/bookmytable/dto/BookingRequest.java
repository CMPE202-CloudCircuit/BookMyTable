// BookingRequest
package com.bookmytable.dto;
import jakarta.validation.constraints.*;
import java.time.*;

public record BookingRequest(
    @NotNull String restaurantId,
    @NotNull LocalDate date,
    @NotNull LocalTime time,
    @Min(1) @Max(12) int partySize) {}

// SearchRequest / SearchResult
package com.bookmytable.dto;
import jakarta.validation.constraints.*;
import java.time.*;
import java.util.List;

public record SearchResult(
    String id, String name, String cuisine,
    int costRating, double averageRating,
    int timesBookedToday,
    List<LocalTime> availableTimes) {}

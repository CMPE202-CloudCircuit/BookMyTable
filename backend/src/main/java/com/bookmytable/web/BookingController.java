// BookingController
package com.bookmytable.web;

import com.bookmytable.dto.BookingRequest;
import com.bookmytable.model.Booking;
import com.bookmytable.repo.UserRepository;
import com.bookmytable.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/bookings",
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class BookingController {

  private final BookingService service;
  private final UserRepository users;

  @PostMapping
  public ResponseEntity<Booking> create(
      @AuthenticationPrincipal User principal,
      @Valid @RequestBody BookingRequest req) {

    var u = users.findByEmail(principal.getUsername()).orElseThrow();
    return ResponseEntity.ok(
        service.create(u.getId(), req, u.getEmail(), u.getPhone()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> cancel(
      @AuthenticationPrincipal User principal,
      @PathVariable String id) {

    var u = users.findByEmail(principal.getUsername()).orElseThrow();
    service.cancel(id, u.getId());
    return ResponseEntity.noContent().build();
  }
}

// BookingService
package com.bookmytable.service;

import com.bookmytable.dto.BookingRequest;
import com.bookmytable.model.Booking;
import com.bookmytable.repo.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class BookingService {

  private final BookingRepository repo;
  private final EmailService email;
  private final SmsService   sms;

  public Booking create(String userId, BookingRequest req,
                        String emailAddr, String phone) {

    if (repo.existsByRestaurantIdAndDateAndTimeAndStatus(
          req.restaurantId(), req.date(), req.time(), "BOOKED"))
      throw new RuntimeException("slot taken");

    Booking b = new Booking();
    b.setRestaurantId(req.restaurantId());
    b.setUserId(userId);
    b.setDate(req.date());
    b.setTime(req.time());
    b.setPartySize(req.partySize());
    b.setStatus("BOOKED");
    b.setConfirmationCode(UUID.randomUUID().toString().substring(0, 8));

    repo.save(b);

    email.send(emailAddr, "Booking confirmed, code: " + b.getConfirmationCode());
    sms.send(phone, "Booked! Code: " + b.getConfirmationCode());

    return b;
  }

  public void cancel(String bookingId, String userId) {
    Booking b = repo.findById(bookingId).orElseThrow();
    if (!b.getUserId().equals(userId)) throw new RuntimeException("forbidden");
    b.setStatus("CANCELLED");
    repo.save(b);
  }
}

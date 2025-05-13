// Booking.java
package com.bookmytable.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.*;

@Data @Document
public class Booking {
  @Id private String id;
  private String restaurantId;
  private String userId;
  private LocalDate date;
  private LocalTime time;
  private int partySize;
  private String status;            // BOOKED | CANCELLED
  private String confirmationCode;
}

// Restaurant.java
package com.bookmytable.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalTime;
import java.util.List;

@Data @Document
public class Restaurant {
  @Id private String id;
  private String name;
  private String cuisine;
  private int    costRating;       // 1-4
  private Address address;
  private double averageRating;
  private int    timesBookedToday;
  private List<LocalTime> tableSlots;
}

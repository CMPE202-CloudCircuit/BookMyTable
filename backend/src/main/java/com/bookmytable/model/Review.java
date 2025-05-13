// Review.java
package com.bookmytable.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data @Document
public class Review {
  @Id private String id;
  private String restaurantId;
  private String userId;
  private int rating;
  private String comment;
  private LocalDateTime createdAt;
}

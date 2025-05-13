// PublicController
package com.bookmytable.web;

import com.bookmytable.dto.*;
import com.bookmytable.model.Review;
import com.bookmytable.repo.ReviewRepository;
import com.bookmytable.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/restaurants",
                produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PublicController {

  private final RestaurantService service;
  private final ReviewRepository  reviews;

  @GetMapping("/search")
  public List<SearchResult> search(@Valid SearchRequest req) {
    return service.search(req);
  }

  @GetMapping("/{id}/reviews")
  public List<Review> reviews(@PathVariable String id,
                              @RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size) {
    return reviews.findByRestaurantId(id, PageRequest.of(page, size));
  }
}

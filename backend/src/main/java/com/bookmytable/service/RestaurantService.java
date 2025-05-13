// RestaurantService
package com.bookmytable.service;

import com.bookmytable.dto.*;
import com.bookmytable.model.Restaurant;
import com.bookmytable.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.List;

@Service @RequiredArgsConstructor
public class RestaurantService {

  private final RestaurantRepository restRepo;
  private final BookingRepository    bookingRepo;

  public List<SearchResult> search(SearchRequest req) {
    List<Restaurant> pool =
        req.zip() != null
          ? restRepo.findByAddressZip(req.zip())
          : restRepo.findByAddressCityIgnoreCaseAndAddressStateIgnoreCase(
                req.city(), req.state());

    LocalTime from = req.time().minusMinutes(30);
    LocalTime to   = req.time().plusMinutes(30);

    return pool.stream().map(r -> {
      int bookedToday = bookingRepo.countByRestaurantIdAndDate(r.getId(), req.date());
      List<LocalTime> free = r.getTableSlots().stream()
          .filter(t -> !t.isBefore(from) && !t.isAfter(to))
          .filter(t ->
            bookingRepo.countByRestaurantIdAndDateAndTime(
              r.getId(), req.date(), t) == 0)
          .toList();

      return new SearchResult(
          r.getId(), r.getName(), r.getCuisine(),
          r.getCostRating(), r.getAverageRating(),
          bookedToday, free);
    }).filter(sr -> !sr.availableTimes().isEmpty()).toList();
  }
}

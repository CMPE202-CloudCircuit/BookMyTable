// BookingRepository
package com.bookmytable.repo;
import com.bookmytable.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.time.LocalTime;

public interface BookingRepository extends MongoRepository<Booking,String>{
  int countByRestaurantIdAndDate(String restId, LocalDate date);
  int countByRestaurantIdAndDateAndTime(
        String restId, LocalDate date, LocalTime time);
  boolean existsByRestaurantIdAndDateAndTimeAndStatus(
        String restId, LocalDate date, LocalTime time, String status);
}

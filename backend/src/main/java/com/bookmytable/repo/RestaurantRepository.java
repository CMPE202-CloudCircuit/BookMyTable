// RestaurantRepository
package com.bookmytable.repo;
import com.bookmytable.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface RestaurantRepository extends MongoRepository<Restaurant,String>{
  // simple geo/area filter
  List<Restaurant> findByAddressCityIgnoreCaseAndAddressStateIgnoreCase(String city,String state);
  List<Restaurant> findByAddressZip(String zip);
}

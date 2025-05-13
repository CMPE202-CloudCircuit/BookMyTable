// ReviewRepository
package com.bookmytable.repo;
import com.bookmytable.model.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface ReviewRepository extends MongoRepository<Review,String>{
  List<Review> findByRestaurantId(String restId, Pageable pg);
}

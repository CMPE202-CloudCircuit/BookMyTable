// UserRepository
package com.bookmytable.repo;
import com.bookmytable.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends MongoRepository<User,String>{
  Optional<User> findByEmail(String email);
  boolean existsByEmail(String email);
  boolean existsByUsername(String username);
  Optional<User> findByUsername(String username);
}

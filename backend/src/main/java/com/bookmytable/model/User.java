// User.java
package com.bookmytable.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data                           // getters / setters / equalsHashCode / toString
@NoArgsConstructor              // <- fixes “constructor User() is undefined”
@AllArgsConstructor
@Builder                        // <- gives you User.builder()
@Document(collection = "users") // <-- Mongo document, not a JPA entity
public class User {

    @Id                         // from Spring Data *not* jakarta.persistence
    private String id;          // String, UUID, or org.bson.types.ObjectId

    private String username;
    private String email;
    private String password;

    private String phone;   
    /** Role as ENUM (simplest).  See option B below if you need a roles
     *  collection instead of embedding/enums.                            */
    private Set<Role> roles = new HashSet<>();
}


// @Data @Document @Builder
// public class User {
//   @Id private String id;
//   private String email;
//   private String passwordHash;
//   private Set<Role> roles;
//   private String phone;
// }

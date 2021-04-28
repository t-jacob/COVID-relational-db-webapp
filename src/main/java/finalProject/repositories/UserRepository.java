package finalProject.repositories;

// inherits and stores the generic CRUD operations
// implements CRUD operations for the `User` java class objects


import finalProject.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository
        extends CrudRepository<User, Integer> {

    // CUSTOM QUERIES

    // FIND ALL USERS
    @Query(value = "SELECT * FROM user",
            nativeQuery = true)
    public List<User> findAllUsers();

    // FIND USERS BY ID
    @Query(value = "SELECT * FROM user WHERE id=:userId",
            nativeQuery = true)
    public User findUserById(@Param("userId") Integer id);
}

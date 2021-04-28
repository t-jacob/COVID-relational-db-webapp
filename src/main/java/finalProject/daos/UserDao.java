package finalProject.daos;

// a DAO to map java CRUD operations on User objects to the SQL schema `user` via HTTP requests

import finalProject.models.User;
import finalProject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserDao {

    // instantiate CRUD Repository
    @Autowired
    UserRepository userRepository;

    // FIND ALL USERS
    @GetMapping("/api/user")
    public List<User> findAllUsers() {
        return userRepository.findAllUsers();
    }

    // FIND USER BY ID
    @GetMapping("/api/user/{userId}")
    public User findUserById(
            @PathVariable("userId") Integer userId) {
        return userRepository.findUserById(userId);
    }

    // CREATE USER
    @PostMapping("api/user")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // UPDATE USER
    @PutMapping("/api/user/{userId}")
    public User updateUser (
            @PathVariable("userId") Integer userId,
            @RequestBody User userUpdates) {
        User user = userRepository.findUserById(userId);

        // create new User object with the following attributes
        user.setFirstName(userUpdates.getFirstName());
        user.setLastName(userUpdates.getLastName());
        user.setUserName(userUpdates.getUserName());
        user.setPassword(userUpdates.getPassword());
        user.setEmail(userUpdates.getEmail());
        user.setDateOfBirth(userUpdates.getDateOfBirth());
        user.setUserRole(userUpdates.getUserRole());

        return userRepository.save(user);
    }

    // DELETE USER
    @DeleteMapping("api/user/{userId}")
    public void deleteUser(
            @PathVariable("userId") Integer userId) {
        userRepository.deleteById(userId);
    }

}

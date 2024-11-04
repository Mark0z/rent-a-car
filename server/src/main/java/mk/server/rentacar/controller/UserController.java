package mk.server.rentacar.controller;

import mk.server.rentacar.model.User;
import mk.server.rentacar.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> selectedUser = userService.getUserById(id);
        return selectedUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User createdUser = userService.saveUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/collection/")
    public ResponseEntity<List<User>> addUsers(@RequestBody List<User> listOfUsers) {
        List<User> users = userService.saveListOfUsers(listOfUsers);
        return ResponseEntity.ok(users);
    }
}

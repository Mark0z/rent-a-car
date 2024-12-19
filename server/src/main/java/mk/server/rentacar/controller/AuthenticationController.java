package mk.server.rentacar.controller;

import mk.server.rentacar.model.User;
import mk.server.rentacar.modelDTO.UserDTO;
import mk.server.rentacar.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = authenticationService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();

        return authenticationService.login(username, password)
                .map(user -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("username", user.getUsername());
                    response.put("firstName", user.getFirstName());
                    response.put("lastName", user.getLastName());
                    response.put("email", user.getEmail());
                    response.put("phone", user.getPhone());
                    response.put("userType", user.getRole());
                    response.put("userId", String.valueOf(user.getId()));
                    response.put("dateJoined", String.valueOf(user.getDateJoined()));

                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Invalid credentials");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
                });
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        User findUser = authenticationService.updateUser(id, user);
        return ResponseEntity.ok(findUser);
    }

    @PostMapping("/change-password/{id}/{oldPassword}/{newPassword}")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @PathVariable String oldPassword, @PathVariable String newPassword) {
        Optional<User> findUser = authenticationService.changePassword(id, oldPassword, newPassword);

        if (findUser.isPresent()) {
            return ResponseEntity.ok(findUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials");
        }
    }
}

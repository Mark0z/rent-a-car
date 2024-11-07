package mk.server.rentacar.service;

import mk.server.rentacar.model.User;
import mk.server.rentacar.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private void preprocessUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getDateJoined() == null) {
            user.setDateJoined(new Date());
        }
        if (user.getLoyaltyPoints() == null) {
            user.setLoyaltyPoints(0);
        }
        if (user.getRole() == null) {
            user.setRole("USER");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        preprocessUser(user);
        return userRepository.save(user);
    }

    public List<User> saveListOfUsers(List<User> listOfUsers) {
        listOfUsers.forEach(this::preprocessUser);
        return userRepository.saveAll(listOfUsers);
    }
}

package mk.server.rentacar.service;

import mk.server.rentacar.model.User;
import mk.server.rentacar.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
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

    public User register(User user) {
        preprocessUser(user);
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            user.setId(id);
            preprocessUser(user);
            user.setPassword(optionalUser.get().getPassword());
            return userRepository.save(user);
        }
        return null;
    }

    public Optional<User> login(String username, String password) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public User changePassword(Long id, String oldPassword, String newPassword) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (passwordEncoder.matches(oldPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                return userRepository.save(user);
            }
        }
        return null;
    }
}

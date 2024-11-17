package mk.server.rentacar.service;

import mk.server.rentacar.model.Car;
import mk.server.rentacar.model.Reservation;
import mk.server.rentacar.model.User;
import mk.server.rentacar.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final CarService carService;
    private final UserService userService;

    public ReservationService(ReservationRepository reservationRepository, CarService carService, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.carService = carService;
        this.userService = userService;
    }

    private void preprocessReservation(Reservation reservation) {
        Car car = getCarOrThrow(reservation.getCar().getId());
        User user = getUserOrThrow(reservation.getUser().getId());

        if (!checkAvailability(reservation)) {
            throw new IllegalArgumentException("Car is not available.");
        }

        reservation.setStatus("CREATED");
        BigDecimal totalCost = calculateTotalCost(reservation.getStartDate(), reservation.getEndDate(), car.getPricePerDay());
        reservation.setTotalPrice(totalCost);
    }

    private Car getCarOrThrow(Long carId) {
        return carService.getCarById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car with ID " + carId + " does not exist."));
    }

    private User getUserOrThrow(Long userId) {
        return userService.getUserById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " does not exist."));
    }

    private BigDecimal calculateTotalCost(Date startDate, Date endDate, BigDecimal pricePerDay) {
        LocalDate localStart = convertToLocalDate(startDate);
        LocalDate localEnd = convertToLocalDate(endDate);

        BigDecimal diffInDays = BigDecimal.valueOf(ChronoUnit.DAYS.between(localStart, localEnd));
        if (diffInDays.intValue() < 1) {
            throw new IllegalArgumentException("Wrong date");
        }

        return pricePerDay.multiply(diffInDays);
    }

    private LocalDate convertToLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private boolean checkAvailability(Reservation reservationDto) {
        List<Reservation> reservationList =
                reservationRepository.getReservationsByCarId(reservationDto.getCar().getId());
        Date checkedStartDate = reservationDto.getStartDate();
        Date checkedEndDate = reservationDto.getEndDate();

        for (Reservation reservation : reservationList) {
            Date startDate = reservation.getStartDate();
            Date endDate = reservation.getEndDate();

            if (checkedStartDate.after(startDate) && checkedStartDate.before(endDate)
                    || checkedEndDate.after(startDate) && checkedEndDate.before(endDate)
                    || startDate.after(checkedStartDate) && endDate.before(checkedEndDate)
                    || checkedStartDate.equals(startDate) || checkedEndDate.equals(endDate)) {
                throw new IllegalArgumentException("Error reservation date");
            }
        }
        return true;
    }

    public Reservation addReservation(Reservation reservation) {
        preprocessReservation(reservation);
        return reservationRepository.save(reservation);
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}

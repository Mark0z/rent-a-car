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

    public ReservationService(ReservationRepository reservationRepository, CarService carService, UserService userService, UserService userService1) {
        this.reservationRepository = reservationRepository;
        this.carService = carService;
        this.userService = userService1;
    }

    private void preprocessReservation(Reservation reservation) {
        Long carId = reservation.getCar().getId();
        Long userId = reservation.getUser().getId();

        Optional<Car> carOpt = carService.getCarById(carId);
        Optional<User> userOpt = userService.getUserById(userId);

        if (carOpt.isEmpty()) {
            throw new IllegalArgumentException("Car with ID " + carId + " does not exist.");
        }
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist.");
        }

        Car car = carOpt.get();

        if (!checkAvailability(reservation)) {
            throw new IllegalArgumentException("Car is not available!!!");
        }

        if (!car.getAvailability()) {
            throw new IllegalArgumentException("Car is not available");
        }

        reservation.setStatus("CREATED");
        Date startDate = reservation.getStartDate();
        Date endDate = reservation.getEndDate();

        LocalDate localStart = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localEnd = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        BigDecimal diffInDays = BigDecimal.valueOf(ChronoUnit.DAYS.between(localStart, localEnd));

        if (diffInDays.intValue() < 1) {
            throw new IllegalArgumentException("Wrong date");
        }

        BigDecimal carPrice = car.getPricePerDay();
        BigDecimal totalCost = carPrice.multiply(diffInDays);

        reservation.setTotalPrice(totalCost);
        car.setAvailability(false);
    }

    private boolean checkAvailability(Reservation reservationDto) {
        List<Reservation> reservationList =
                reservationRepository.getReservationsByCarId(reservationDto.getCar().getId());
        Date checkedDate = reservationDto.getStartDate();

        for (Reservation reservation : reservationList) {
            Date startDate = reservation.getStartDate();
            Date endDate = reservation.getEndDate();

            if ((checkedDate.after(startDate) && checkedDate.before(endDate))
                    || checkedDate.equals(startDate)) {
                throw new IllegalArgumentException("Error start date");
            }
        }
        return true;
    }

    public Reservation addReservation(Reservation reservation) {
        preprocessReservation(reservation);
        return reservationRepository.save(reservation);
    }

    public List<Reservation> addListOfReservations(List<Reservation> reservationList) {
        reservationList.forEach(this::preprocessReservation);
        return reservationRepository.saveAll(reservationList);
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}

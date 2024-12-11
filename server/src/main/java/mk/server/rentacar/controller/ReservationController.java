package mk.server.rentacar.controller;

import mk.server.rentacar.model.Reservation;
import mk.server.rentacar.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/")
    public List<Reservation> getReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable Long id) {
        try {
            Optional<Reservation> reservation = reservationService.getReservationById(id);
            return ResponseEntity.ok(reservation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("user/{id}")
    public ResponseEntity<List<Reservation>> getListOfUserReservations(@PathVariable Long id) {
        List<Reservation> reservationList = reservationService.getListOfUserReservations(id);
        return ResponseEntity.ok(reservationList);
    }

    @PostMapping("/")
    public ResponseEntity<?> addReservation(@RequestBody Reservation reservation) {
        try {
            Reservation reservationReservation = reservationService.addReservation(reservation);
            return ResponseEntity.ok(reservationReservation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/collection")
    public ResponseEntity<List<Reservation>> addReservationCollection(@RequestBody List<Reservation> reservationCollection) {
        List<Reservation> successfulReservations = new ArrayList<>();

        for (Reservation reservation : reservationCollection) {
            try {
                Reservation reservations = reservationService.addReservation(reservation);
                successfulReservations.add(reservations);
            } catch (IllegalArgumentException ignored) {
            }
        }

        return ResponseEntity.ok(successfulReservations);
    }
}

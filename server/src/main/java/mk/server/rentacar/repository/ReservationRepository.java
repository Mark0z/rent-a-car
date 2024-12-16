package mk.server.rentacar.repository;

import mk.server.rentacar.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> getReservationsByCarId(Long id);
    List<Reservation> getReservationsByUserId(Long id);

    List<Reservation> getReservationsByStatus(String status);
}

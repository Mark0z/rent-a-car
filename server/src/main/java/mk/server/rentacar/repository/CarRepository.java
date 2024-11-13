package mk.server.rentacar.repository;

import mk.server.rentacar.model.Car;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c ORDER BY SIZE(c.reservations) DESC")
    List<Car> findCarWithMostReservations(Pageable pageable);
}

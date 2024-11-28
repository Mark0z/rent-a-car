package mk.server.rentacar.repository;

import mk.server.rentacar.model.Car;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c ORDER BY SIZE(c.reservations) DESC")
    List<Car> findCarWithMostReservations(Pageable pageable);

    @Query("""
             SELECT c
             FROM Car c
             WHERE c.id IN (
                 SELECT r.car.id
                 FROM Reservation r
                 WHERE (:startDate BETWEEN r.startDate AND r.endDate)
                    OR (:endDate BETWEEN r.startDate AND r.endDate)
                    OR (:startDate <= r.startDate AND :endDate >= r.endDate)
                    OR (:startDate >= r.startDate AND :endDate <= r.endDate)
             )
            """)
    List<Car> findAvailableCars(
            @Param(value = "startDate") Timestamp startDate,
            @Param(value = "endDate") Timestamp endDate
    );
}
package mk.server.rentacar.service;

import mk.server.rentacar.model.Car;
import mk.server.rentacar.repository.CarRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    private void preprocessCar(Car car) {
        String link = CarImageScraper.getImageLink(car.getBrand(), car.getModel());
        car.setImageUrl(link);
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public List<Car> getTopNCarsWithMostReservations(Integer limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return carRepository.findCarWithMostReservations(pageable);
    }

    public List<Car> getAvailableCars(String startDate, String endDate) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedStartDate = dateFormat.parse(startDate);
            Date parsedEndDate = dateFormat.parse(endDate);
            Timestamp timestampStartDate = new java.sql.Timestamp(parsedStartDate.getTime());
            Timestamp timestampEndDate = new java.sql.Timestamp(parsedEndDate.getTime());
            return carRepository.findAvailableCars(timestampStartDate, timestampEndDate);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public Car saveCar(Car car) {
        preprocessCar(car);
        return carRepository.save(car);
    }

    public List<Car> saveListOfCars(List<Car> listOfCars) {
        listOfCars.forEach(this::preprocessCar);
        return carRepository.saveAll(listOfCars);
    }

    public Car updateCar(Long id, Car updatedCar) {
        return carRepository.findById(id).map(existingCar -> {
            existingCar.setBrand(updatedCar.getBrand());
            existingCar.setModel(updatedCar.getModel());
            existingCar.setYear(updatedCar.getYear());
            existingCar.setFuelType(updatedCar.getFuelType());
            existingCar.setPricePerDay(updatedCar.getPricePerDay());
            existingCar.setMileage(updatedCar.getMileage());
            existingCar.setTransmission(updatedCar.getTransmission());
            existingCar.setImageUrl(updatedCar.getImageUrl());
            existingCar.setRegistrationNumber(updatedCar.getRegistrationNumber());
            return carRepository.save(existingCar);
        }).orElseThrow(() -> new IllegalArgumentException("Car with " + id + " does not exists"));
    }

    public void removeCarById(Long id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Car with ID " + id + " does not exist.");
        }
    }
}

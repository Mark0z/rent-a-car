package mk.server.rentacar.service;

import mk.server.rentacar.model.Car;
import mk.server.rentacar.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public List<Car> saveListOfCars(List<Car> listOfCars) {
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

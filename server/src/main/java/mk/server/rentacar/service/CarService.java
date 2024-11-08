package mk.server.rentacar.service;

import mk.server.rentacar.model.Car;
import mk.server.rentacar.repository.CarRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    private void preprocessCar(Car car) {
        String link = getCarImage(car.getBrand(), car.getModel());
        String linkToImage = extractImageFromString(link);
        car.setImageUrl(linkToImage);
    }

    private String extractImageFromString(String link) {
        String regex = "<string[^>]*>(.*?)</string>";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(link);

        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    private String getCarImage(String brand, String model) {
        String API_URL = "https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=";
        String carBrandAndModel = prepareStringToApi(brand) + "+" + prepareStringToApi(model);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> exchange = restTemplate.exchange(
                API_URL + carBrandAndModel,
                HttpMethod.GET,
                HttpEntity.EMPTY,
                String.class
        );
        return exchange.getBody();
    }

    private String prepareStringToApi(String string) {
        return string.trim().replace(" ", ",");
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
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

package com.wecp.car_rental_management_system.service;

import com.wecp.car_rental_management_system.entity.Car;
import com.wecp.car_rental_management_system.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


// public class CarService {
//     // implement car service
// }


@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<Car> getAvailableCars() {
        return carRepository.findAll().stream()
                .filter(car -> "available".equalsIgnoreCase(car.getStatus()))
                .collect(Collectors.toList());
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Long carId, Car updatedCar) {
        Car car = carRepository.findById(carId).orElseThrow();
        car.setMake(updatedCar.getMake());
        car.setModel(updatedCar.getModel());
        car.setYear(updatedCar.getYear());
        car.setRegistrationNumber(updatedCar.getRegistrationNumber());
        car.setStatus(updatedCar.getStatus());
        car.setRate(updatedCar.getRate());
        car.setCategory(updatedCar.getCategory());
        return carRepository.save(car);
    }
}
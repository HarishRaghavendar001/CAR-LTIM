package com.wecp.car_rental_management_system.repository;

import com.wecp.car_rental_management_system.entity.Car;

import org.springframework.data.jpa.mapping.JpaPersistentProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car,Long> {
    // implement jpa repository here
}

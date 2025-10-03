package com.wecp.car_rental_management_system.service;

import com.wecp.car_rental_management_system.entity.CarCategory;
import com.wecp.car_rental_management_system.repository.CarCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


// public class CarCategoryService {
//     // implement car category service
// }


@Service
public class CarCategoryService {
    @Autowired
    private CarCategoryRepository carCategoryRepository;

    public List<CarCategory> getAllCarCategories() {
        return carCategoryRepository.findAll();
    }

    public CarCategory createCarCategory(CarCategory carCategory) {
        return carCategoryRepository.save(carCategory);
    }

    public CarCategory updateCarCategory(Long categoryId, CarCategory updatedCategory) {
        CarCategory category = carCategoryRepository.findById(categoryId).orElseThrow();
        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());
        category.setBaseRate(updatedCategory.getBaseRate());
        return carCategoryRepository.save(category);
    }
}

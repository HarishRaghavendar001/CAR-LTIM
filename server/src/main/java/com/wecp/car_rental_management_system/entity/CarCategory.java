package com.wecp.car_rental_management_system.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

// @Table(name = "car_categories") // do not change this line i.e table name
// public class CarCategory {
//     // implement entity
// }


@Entity
@Table(name = "car_categories") // do not change this line i.e table name
public class CarCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double baseRate;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Car> cars;

    public CarCategory(Long id, String name, String description, Double baseRate, List<Car> cars) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.baseRate = baseRate;
        this.cars = cars;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getBaseRate() {
        return baseRate;
    }

    public void setBaseRate(Double baseRate) {
        this.baseRate = baseRate;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    // Getters and Setters
}

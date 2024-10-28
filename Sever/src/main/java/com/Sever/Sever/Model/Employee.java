package com.Sever.Sever.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeID;

    @Column(nullable = false)
    private String name;

    private String position;

    private double salary;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date hireDate;

    private String email;
    private String phoneNumber;
}

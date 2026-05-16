package com.sahilakhtar.school_management.entity;

import com.sahilakhtar.school_management.enums.Status;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String email;

    private String phoneNumber;

    private String rollNumber;

    private String studentClass;

    private String parentName;

    private String password;

    private String parentPhone;

    private String address;
    private String city;

    @Enumerated(EnumType.STRING)
    private Status status;

}
package com.sahilakhtar.school_management.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String rollNumber;
    private String password;

    private String studentClass;
    private String parentName;
    private String parentPhone;
    private String address;
    private String city;

}

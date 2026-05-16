package com.sahilakhtar.school_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddStudentRequestDto {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email")
    private String email;

    private String phoneNumber;

    private String rollNumber;

    private String studentClass;
    private String parentName;
    private String parentPhone;
    private String address;
    private String city;
}
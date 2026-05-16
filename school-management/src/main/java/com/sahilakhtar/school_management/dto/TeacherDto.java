package com.sahilakhtar.school_management.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeacherDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String subjects;

    private String qualification;

    private Integer experience;

    private String assignedClass;
}
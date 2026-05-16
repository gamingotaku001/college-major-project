package com.sahilakhtar.school_management.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDto {

    private Long studentId;

    private String studentName;

    private String rollNumber;

    private String studentClass;

    private LocalDate attendanceDate;

    private String status;
}
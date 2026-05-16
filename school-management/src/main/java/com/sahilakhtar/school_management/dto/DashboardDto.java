package com.sahilakhtar.school_management.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardDto {

    private long totalStudents;
    private long totalTeachers;
    private long totalClasses;
}

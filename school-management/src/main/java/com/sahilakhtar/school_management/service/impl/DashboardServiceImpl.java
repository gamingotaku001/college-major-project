package com.sahilakhtar.school_management.service.impl;

import com.sahilakhtar.school_management.dto.DashboardDto;
import com.sahilakhtar.school_management.repository.ClassRoomRepository;
import com.sahilakhtar.school_management.repository.StudentRepository;
import com.sahilakhtar.school_management.repository.TeacherRepository;
import com.sahilakhtar.school_management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ClassRoomRepository classRoomRepository;

    @Override
    public DashboardDto getDashboardData() {

        long totalStudents = studentRepository.count();
        long totalTeachers = teacherRepository.count();
        long totalClasses = classRoomRepository.count();

        return DashboardDto.builder()
                .totalStudents(totalStudents)
                .totalTeachers(totalTeachers)
                .totalClasses(totalClasses)
                .build();
    }
}
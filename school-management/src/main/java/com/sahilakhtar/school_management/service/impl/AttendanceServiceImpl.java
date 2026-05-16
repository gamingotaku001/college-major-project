package com.sahilakhtar.school_management.service.impl;

import com.sahilakhtar.school_management.dto.AttendanceDto;
import com.sahilakhtar.school_management.entity.Attendance;
import com.sahilakhtar.school_management.repository.AttendanceRepository;
import com.sahilakhtar.school_management.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl
        implements AttendanceService {

    private final AttendanceRepository
            attendanceRepository;

    @Override
    public AttendanceDto markAttendance(
            AttendanceDto dto
    ) {

        Attendance attendance =
                Attendance.builder()

                        .studentId(dto.getStudentId())

                        .studentName(dto.getStudentName())

                        .rollNumber(dto.getRollNumber())

                        .studentClass(dto.getStudentClass())

                        .attendanceDate(
                                dto.getAttendanceDate()
                        )

                        .status(dto.getStatus())

                        .build();

        return mapToDto(
                attendanceRepository.save(
                        attendance
                )
        );
    }

    @Override
    public List<AttendanceDto>
    getAttendanceByClass(
            String studentClass
    ) {

        return attendanceRepository
                .findByStudentClass(
                        studentClass
                )

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto>
    getAttendanceByDate(
            LocalDate date
    ) {

        return attendanceRepository
                .findByAttendanceDate(date)

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto>
    getAttendanceByStudent(
            Long studentId
    ) {

        return attendanceRepository
                .findByStudentId(studentId)

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    /* ================= MAPPER ================= */

    private AttendanceDto mapToDto(
            Attendance attendance
    ) {

        return AttendanceDto.builder()

                .studentId(
                        attendance.getStudentId()
                )

                .studentName(
                        attendance.getStudentName()
                )

                .rollNumber(
                        attendance.getRollNumber()
                )

                .studentClass(
                        attendance.getStudentClass()
                )

                .attendanceDate(
                        attendance.getAttendanceDate()
                )

                .status(
                        attendance.getStatus()
                )

                .build();
    }
}
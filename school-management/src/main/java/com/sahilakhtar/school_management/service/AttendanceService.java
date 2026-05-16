package com.sahilakhtar.school_management.service;

import com.sahilakhtar.school_management.dto.AttendanceDto;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    AttendanceDto markAttendance(
            AttendanceDto attendanceDto
    );

    List<AttendanceDto> getAttendanceByClass(
            String studentClass
    );

    List<AttendanceDto> getAttendanceByDate(
            LocalDate date
    );

    List<AttendanceDto> getAttendanceByStudent(
            Long studentId
    );
}
package com.sahilakhtar.school_management.controller;

import com.sahilakhtar.school_management.dto.AttendanceDto;
import com.sahilakhtar.school_management.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceService
            attendanceService;

    /* ================= SAVE ================= */

    @PostMapping
    public AttendanceDto markAttendance(

            @RequestBody
            AttendanceDto dto

    ) {

        return attendanceService
                .markAttendance(dto);
    }

    /* ================= BY CLASS ================= */

    @GetMapping("/class/{studentClass}")
    public List<AttendanceDto>
    getAttendanceByClass(

            @PathVariable
            String studentClass

    ) {

        return attendanceService
                .getAttendanceByClass(
                        studentClass
                );
    }

    /* ================= BY DATE ================= */

    @GetMapping("/date")
    public List<AttendanceDto>
    getAttendanceByDate(

            @RequestParam
            LocalDate date

    ) {

        return attendanceService
                .getAttendanceByDate(date);
    }

    /* ================= BY STUDENT ================= */

    @GetMapping("/student/{studentId}")
    public List<AttendanceDto>
    getAttendanceByStudent(

            @PathVariable
            Long studentId

    ) {

        return attendanceService
                .getAttendanceByStudent(
                        studentId
                );
    }
}
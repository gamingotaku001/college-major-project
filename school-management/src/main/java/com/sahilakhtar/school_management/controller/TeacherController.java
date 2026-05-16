package com.sahilakhtar.school_management.controller;
import com.sahilakhtar.school_management.dto.AddTeacherRequestDto;
import com.sahilakhtar.school_management.dto.TeacherDto;
import com.sahilakhtar.school_management.enums.Status;
import com.sahilakhtar.school_management.service.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping
    public TeacherDto addTeacher(@RequestBody @Valid AddTeacherRequestDto request) {
        return teacherService.addTeacher(request);
    }

    @GetMapping
    public List<TeacherDto> getAllTeacher() {
        return teacherService.getAllTeacher();
    }

    @GetMapping("/{id}")
    public TeacherDto getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
    }
    @PutMapping("/{id}")
    public TeacherDto updateTeacher(@PathVariable Long id,
                                    @RequestBody @Valid AddTeacherRequestDto request) {

        return teacherService.updateTeacher(id, request);
    }
    @PutMapping("/{id}/status")
    public void updatedTeacherStatus(@PathVariable Long id,
                                     @RequestParam Status status) {

        teacherService.updatedTeacherStatus(id, status);
    }
    @GetMapping("/approved")
    public List<TeacherDto> getApprovedTeachers() {
        return teacherService.getApprovedTeachers();
    }
    @GetMapping("/pending")
    public List<TeacherDto> getPendingTeachers() {

        return teacherService.getPendingTeachers();
    }
}

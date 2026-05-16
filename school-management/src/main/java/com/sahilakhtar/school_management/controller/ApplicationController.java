package com.sahilakhtar.school_management.controller;

import com.sahilakhtar.school_management.entity.Student;
import com.sahilakhtar.school_management.entity.Teacher;
import com.sahilakhtar.school_management.enums.Status;
import com.sahilakhtar.school_management.repository.StudentRepository;
import com.sahilakhtar.school_management.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apply")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    // ===============================
    // 📊 FETCH PENDING STUDENTS
    // ===============================
    @GetMapping("/students")
    public List<Student> getPendingStudents() {
        return studentRepository.findByStatus(Status.PENDING);
    }

    // ===============================
    // 📊 FETCH PENDING TEACHERS
    // ===============================
    @GetMapping("/teachers")
    public List<Teacher> getPendingTeachers() {
        return teacherRepository.findByStatus(Status.PENDING);
    }
    @PostMapping("/students")
    public Student applyStudent(@RequestBody Student student) {
        student.setStatus(Status.PENDING);
        return studentRepository.save(student);
    }
}
package com.sahilakhtar.school_management.controller;

import com.sahilakhtar.school_management.dto.AddStudentRequestDto;
import com.sahilakhtar.school_management.dto.StudentDto;
import com.sahilakhtar.school_management.enums.Status;
import com.sahilakhtar.school_management.service.StudentService;
import com.sahilakhtar.school_management.dto.SetPasswordRequest;
import com.sahilakhtar.school_management.entity.Student;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // 🔥 VERY IMPORTANT for frontend
public class StudentController {

    private final StudentService studentService;

    // ================= CREATE (APPLY / ADD) =================
    @PostMapping
    public StudentDto addStudent(@RequestBody @Valid AddStudentRequestDto request){
        return studentService.addStudent(request);
    }

    // ================= GET ALL STUDENTS =================
    @GetMapping
    public List<StudentDto> getAllStudent(){
        return studentService.getAllStudent();
    }

    // ================= GET STUDENT BY ID =================
    @GetMapping("/{id}")
    public StudentDto getStudentById(@PathVariable Long id){
        return studentService.getStudentById(id);
    }

    // ================= UPDATE STUDENT (EDIT IN DASHBOARD) =================
    @PutMapping("/{id}")
    public StudentDto updateStudent(@PathVariable Long id,
                                    @RequestBody AddStudentRequestDto request) {
        return studentService.updatedStudent(id, request);
    }

    // ================= APPROVE / REJECT =================
    @PutMapping("/{id}/status")
    public void updateStudentStatus(@PathVariable Long id,
                                    @RequestParam Status status) {
        studentService.updateStudentStatus(id, status);
    }

    // ================= DELETE STUDENT =================
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
    }
    @PutMapping("/set-password")
    public Student setPassword(
            @RequestBody SetPasswordRequest request
    ){

        return studentService.setPassword(request);
    }
}
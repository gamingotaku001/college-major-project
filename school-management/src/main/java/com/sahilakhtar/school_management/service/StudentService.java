package com.sahilakhtar.school_management.service;

import com.sahilakhtar.school_management.dto.AddStudentRequestDto;
import com.sahilakhtar.school_management.dto.StudentDto;
import com.sahilakhtar.school_management.enums.Status;
import com.sahilakhtar.school_management.dto.SetPasswordRequest;
import com.sahilakhtar.school_management.entity.Student;

import java.util.List;

public interface StudentService {

    StudentDto addStudent(AddStudentRequestDto request);

    List<StudentDto> getAllStudent();

    StudentDto getStudentById(Long id);

    void deleteStudent(Long id);

    StudentDto updatedStudent(Long id, AddStudentRequestDto request);

    void updateStudentStatus(Long id, Status status);
    Student setPassword(
            SetPasswordRequest request
    );
}
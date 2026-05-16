package com.sahilakhtar.school_management.service.impl;

import com.sahilakhtar.school_management.dto.AddTeacherRequestDto;
import com.sahilakhtar.school_management.dto.TeacherDto;
import com.sahilakhtar.school_management.entity.Teacher;
import com.sahilakhtar.school_management.enums.Status;
import com.sahilakhtar.school_management.exception.DuplicateResourceException;
import com.sahilakhtar.school_management.exception.ResourceNotFoundException;
import com.sahilakhtar.school_management.repository.TeacherRepository;
import com.sahilakhtar.school_management.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    // ===============================
    // ➕ ADD TEACHER (ADMIN)
    // ===============================
    @Override
    public TeacherDto addTeacher(AddTeacherRequestDto request) {

        if (teacherRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        Teacher teacher = Teacher.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .subjects(request.getSubjects())
                .qualification(request.getQualification())
                .experience(request.getExperience())
                .assignedClass(request.getAssignedClass())

                .build();

        // ✅ Admin-created teacher = approved directly
        teacher.setStatus(Status.PENDING);

        Teacher savedTeacher = teacherRepository.save(teacher);

        return mapToDto(savedTeacher);
    }

    // ===============================
    // 📋 GET ALL TEACHERS
    // ===============================
    @Override
    public List<TeacherDto> getAllTeacher() {
        return getApprovedTeachers();
    }

    // ===============================
    // 🔍 GET BY ID
    // ===============================
    @Override
    public TeacherDto getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        return mapToDto(teacher);
    }

    // ===============================
    // ❌ DELETE
    // ===============================
    @Override
    public void deleteTeacher(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        teacherRepository.delete(teacher);
    }

    // ===============================
    // ✏️ UPDATE
    // ===============================
    @Override
    public TeacherDto updateTeacher(Long id, AddTeacherRequestDto request) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        if (teacherRepository.existsByEmail(request.getEmail())
                && !teacher.getEmail().equals(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setEmail(request.getEmail());
        teacher.setPhoneNumber(request.getPhoneNumber());
        teacher.setSubjects(request.getSubjects());
        teacher.setQualification(request.getQualification());
        teacher.setExperience(request.getExperience());

        // 🔥 NEW
        teacher.setAssignedClass(request.getAssignedClass());

        Teacher updatedTeacher = teacherRepository.save(teacher);

        return mapToDto(updatedTeacher);
    }

    // ===============================
    // 🔄 UPDATE STATUS (APPROVE / REJECT)
    // ===============================
    @Override
    public void updatedTeacherStatus(Long teacherId, Status status) {

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        teacher.setStatus(status);

        teacherRepository.save(teacher);
    }

    // ===============================
    // ✅ GET APPROVED TEACHERS
    // ===============================
    @Override
    public List<TeacherDto> getApprovedTeachers() {
        return teacherRepository.findByStatus(Status.APPROVED)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<TeacherDto> getPendingTeachers() {

        return teacherRepository.findByStatus(Status.PENDING)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ===============================
    // 🔁 MAPPER
    // ===============================
    private TeacherDto mapToDto(Teacher teacher) {

        return TeacherDto.builder()
                .id(teacher.getId())
                .firstName(teacher.getFirstName())
                .lastName(teacher.getLastName())
                .email(teacher.getEmail())
                .phoneNumber(teacher.getPhoneNumber())
                .subjects(teacher.getSubjects())
                .qualification(teacher.getQualification())
                .experience(teacher.getExperience())

                // 🔥 NEW
                .assignedClass(teacher.getAssignedClass())

                .build();
    }
}
package com.sahilakhtar.school_management.service.impl;

import com.sahilakhtar.school_management.dto.AddStudentRequestDto;
import com.sahilakhtar.school_management.dto.StudentDto;
import com.sahilakhtar.school_management.entity.Student;
import com.sahilakhtar.school_management.enums.Status;
import com.sahilakhtar.school_management.repository.StudentRepository;
import com.sahilakhtar.school_management.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.sahilakhtar.school_management.dto.SetPasswordRequest;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public StudentDto addStudent(AddStudentRequestDto request) {

        Student student = Student.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .studentClass(request.getStudentClass())
                .rollNumber(request.getRollNumber())
                .parentName(request.getParentName())
                .parentPhone(request.getParentPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .status(Status.PENDING)
                .build();

        return mapToDto(studentRepository.save(student));
    }

    @Override
    public List<StudentDto> getAllStudent() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto getStudentById(Long id) {
        return mapToDto(studentRepository.findById(id).orElseThrow());
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public StudentDto updatedStudent(Long id, AddStudentRequestDto request) {

        Student s = studentRepository.findById(id).orElseThrow();

        s.setFirstName(request.getFirstName());
        s.setLastName(request.getLastName());
        s.setEmail(request.getEmail());
        s.setPhoneNumber(request.getPhoneNumber());
        s.setStudentClass(request.getStudentClass());
        s.setRollNumber(request.getRollNumber());
        s.setParentName(request.getParentName());
        s.setParentPhone(request.getParentPhone());
        s.setAddress(request.getAddress());
        s.setCity(request.getCity());

        return mapToDto(studentRepository.save(s));
    }

    @Override
    public void updateStudentStatus(Long id, Status status) {
        Student s = studentRepository.findById(id).orElseThrow();
        s.setStatus(status);
        studentRepository.save(s);
    }

    @Override
    public Student setPassword(
            SetPasswordRequest request
    ){

        Student student =
                studentRepository
                        .findByRollNumberAndStudentClass(

                                request.getRollNumber(),
                                request.getStudentClass()
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found"
                                )
                        );

        student.setPassword(
                request.getPassword()
        );

        return studentRepository.save(
                student
        );
    }

    private StudentDto mapToDto(Student s) {
        return StudentDto.builder()
                .id(s.getId())
                .firstName(s.getFirstName())
                .lastName(s.getLastName())
                .email(s.getEmail())
                .phoneNumber(s.getPhoneNumber())
                .studentClass(s.getStudentClass())
                .rollNumber(s.getRollNumber())
                .parentName(s.getParentName())
                .parentPhone(s.getParentPhone())
                .address(s.getAddress())
                .city(s.getCity())
                .password(s.getPassword())
                .build();
    }
}
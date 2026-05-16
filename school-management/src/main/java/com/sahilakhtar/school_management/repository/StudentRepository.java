package com.sahilakhtar.school_management.repository;

import com.sahilakhtar.school_management.entity.Student;
import com.sahilakhtar.school_management.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByEmail(String email);

    List<Student> findByStatus(Status status);

    Optional<Student>
    findByRollNumberAndStudentClass(

            String rollNumber,
            String studentClass
    );
}
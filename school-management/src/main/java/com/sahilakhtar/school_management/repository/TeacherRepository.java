package com.sahilakhtar.school_management.repository;

import com.sahilakhtar.school_management.entity.Teacher;
import com.sahilakhtar.school_management.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    boolean existsByEmail(String email);

    // 🔥 FIXED HERE
    List<Teacher> findByStatus(Status status);
}
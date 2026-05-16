package com.sahilakhtar.school_management.service;

import com.sahilakhtar.school_management.dto.AddTeacherRequestDto;
import com.sahilakhtar.school_management.dto.TeacherDto;
import com.sahilakhtar.school_management.enums.Status;

import java.util.List;

public interface TeacherService {

    TeacherDto addTeacher(AddTeacherRequestDto request);

    List<TeacherDto> getAllTeacher();

    TeacherDto getTeacherById(Long id);

    void deleteTeacher(Long id);

    TeacherDto updateTeacher(Long id, AddTeacherRequestDto request);

    void updatedTeacherStatus(Long teacherId, Status status);

    List<TeacherDto> getApprovedTeachers();

    List<TeacherDto> getPendingTeachers();

}

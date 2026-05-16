package com.sahilakhtar.school_management.service.impl;


import com.sahilakhtar.school_management.entity.ClassRoom;
import com.sahilakhtar.school_management.entity.Teacher;
import com.sahilakhtar.school_management.exception.ResourceNotFoundException;
import com.sahilakhtar.school_management.repository.ClassRoomRepository;
import com.sahilakhtar.school_management.repository.TeacherRepository;
import com.sahilakhtar.school_management.service.ClassRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class ClassRoomServiceImpl implements ClassRoomService {

    private final ClassRoomRepository classRoomRepository;
    private final TeacherRepository teacherRepository;

    @Override
    public void assignTeacherToClass(Long classId, Long teacherId) {

        ClassRoom classRoom = classRoomRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"));

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        classRoom.setTeacher(teacher);
        classRoomRepository.save(classRoom);
    }
}

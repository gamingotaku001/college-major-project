package com.sahilakhtar.school_management.controller;

import com.sahilakhtar.school_management.service.ClassRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor

public class ClassRoomController {

    private final ClassRoomService classRoomService;

    @PostMapping("/{classId}/assign-teacher/{teacherId}")
    public void assignTeacherToClass(@PathVariable Long classId,
                                     @PathVariable Long teacherId) {

        classRoomService.assignTeacherToClass(classId,teacherId);
    }



}

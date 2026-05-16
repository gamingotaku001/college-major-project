package com.sahilakhtar.school_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sahilakhtar.school_management.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "teachers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String email;

    private String phoneNumber;

    // 🔥 CHANGED
    private String subjects;

    private String qualification;

    private Integer experience;

    @OneToOne(mappedBy = "teacher")
    @JsonIgnore
    private ClassRoom classRoom;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime createdAt;

    private String assignedClass;
}
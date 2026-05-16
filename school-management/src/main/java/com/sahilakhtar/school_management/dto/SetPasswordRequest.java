package com.sahilakhtar.school_management.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetPasswordRequest {

    private String rollNumber;

    private String studentClass;

    private String password;
}
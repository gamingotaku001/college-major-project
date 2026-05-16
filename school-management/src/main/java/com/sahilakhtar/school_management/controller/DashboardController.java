package com.sahilakhtar.school_management.controller;

import com.sahilakhtar.school_management.dto.DashboardDto;
import com.sahilakhtar.school_management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardDto getDashboard() {
        return dashboardService.getDashboardData();
    }
}
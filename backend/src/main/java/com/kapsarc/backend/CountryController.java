package com.kapsarc.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/countries")
public class CountryController {

  private final ProductionRepository productionRepository;

  @GetMapping
  public ResponseEntity<String[]> getAllCountries() {
    return ResponseEntity.ok(productionRepository.getAllCountries());
  }
}

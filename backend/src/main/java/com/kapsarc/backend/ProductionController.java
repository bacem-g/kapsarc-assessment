package com.kapsarc.backend;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productions")
@RequiredArgsConstructor
public class ProductionController {

  private final ProductionRepository productionPerCountryRepository;

  @GetMapping("/all")
  public ResponseEntity<List<Production>> getAllProductions() {
    List<Production> data = productionPerCountryRepository.findAll();
    return ResponseEntity.ok(data);
  }

  @GetMapping
  public ResponseEntity<List<Production>> getProductionsPerCountry(@RequestParam String countryName) {
    List<Production> data = productionPerCountryRepository.findByCountry(countryName);
    return ResponseEntity.ok(data);
  }
}

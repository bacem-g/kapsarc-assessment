package com.kapsarc.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
@Table(name = "productions")
public class Production {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private String country;
  private String monthYear;
  private Integer value; // Thousand barrels per day
}

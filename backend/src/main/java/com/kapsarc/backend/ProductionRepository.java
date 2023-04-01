package com.kapsarc.backend;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionRepository extends JpaRepository<Production, UUID> {

  @Query("select distinct p.country from Production p")
  String[] getAllCountries();

  List<Production> findByCountry(String countryName);
}

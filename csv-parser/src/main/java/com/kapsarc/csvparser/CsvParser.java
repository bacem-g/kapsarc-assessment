package com.kapsarc.csvparser;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

@Component
@RequiredArgsConstructor
public class CsvParser {

  private final ProductionRepository productionPerCountryRepository;

  private static final String COMMA_DELIMITER = ",";
  private static final String[] MONTHS = new String[]{"Nov2021","Dec2021","Jan2022","Feb2022","Mar2022","Apr2022",
      "May2022","Jun2022","Jul2022","Aug2022","Sep2022","Oct2022","Nov2022","Dec2022","Jan2023"};

  @EventListener(ApplicationReadyEvent.class)
  public void start() throws IOException {
    List<List<String>> records = new ArrayList<>();
    File file = ResourceUtils.getFile("classpath:data.csv");
    try (BufferedReader br = new BufferedReader(new FileReader(file))) {
      String line;
      while ((line = br.readLine()) != null) {
        String[] values = line.split(COMMA_DELIMITER);
        records.add(Arrays.asList(values));
      }

      records.remove(0);
      List<Production> dbRecords = new ArrayList<>();
      records.stream().forEachOrdered(record -> {
        for(int i = 0; i < MONTHS.length; i++) {
          Production productionPerCountry = Production.builder()
              .country(record.get(0))
              .monthYear(MONTHS[i])
              .value(Integer.valueOf(record.get(i+1)))
              .build();
          dbRecords.add(productionPerCountry);
        }
      });

      productionPerCountryRepository.saveAllAndFlush(dbRecords);
      System.out.println("All records extracted and inserted into DB");
    }
  }
}

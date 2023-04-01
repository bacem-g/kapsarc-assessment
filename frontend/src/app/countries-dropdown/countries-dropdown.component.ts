import { Component, EventEmitter, Output } from '@angular/core';
import { ProductionService } from '../production.service';

@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html',
  styleUrls: ['./countries-dropdown.component.css']
})
export class CountriesDropdownComponent {
  constructor(private productionService: ProductionService) { }
  @Output() countrySelected = new EventEmitter<string>();
  selectedCountry: string = 'all';
  countries: string[] = [];

  ngOnInit(): void {
    this.getAllCountries();
  }

  onSelected() {
    this.countrySelected.emit(this.selectedCountry);
  }

  getAllCountries() {
    this.productionService.getAllCountries().subscribe(
      countries => this.countries = countries,
      error => console.log(error)
    );
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { ProductionService } from '../production.service';
import { State } from 'src/state/state.model';
import { StateService } from 'src/state/state.service';

@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html',
  styleUrls: ['./countries-dropdown.component.css']
})
export class CountriesDropdownComponent {
  constructor(private productionService: ProductionService,
              private stateService: StateService) { }
  @Output() countrySelected = new EventEmitter<string>();
  selectedCountry: string = 'all';
  countries: string[] = [];

  ngOnInit(): void {
    this.getAllCountries();
    let state = this.stateService.state$.getValue();
    this.selectedCountry = state.country;
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

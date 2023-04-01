import { Component } from '@angular/core';
import { Production } from '.././production.model';
import { ProductionService } from '.././production.service';
import { StateService } from '../../state/state.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  constructor(private productionService: ProductionService,
              private stateService: StateService) { }
  productions: Production[] = [];

  onCountrySelected(selectedCountry: string) {
    this.updateState(selectedCountry);
    if (selectedCountry == 'all') {
      this.getAllProductions();
    } else {
      this.productionService.getProductionsForCountry(selectedCountry).subscribe(
        data => this.productions = data,
        error => console.log(error)
      );
    }
  }

  ngOnInit(): void {
    let state = this.stateService.state$.getValue() || {};
    this.onCountrySelected(state.country);
  }

  getAllProductions() {
    this.productionService.getAllProductions().subscribe(
      data => this.productions = data,
      error => console.log(error)
    );
    ;
  }

  updateState(selectedCountry: string) {
    let state = this.stateService.state$.getValue() || {};
    state.country = selectedCountry;
    this.stateService.state$.next(state);
  }
}

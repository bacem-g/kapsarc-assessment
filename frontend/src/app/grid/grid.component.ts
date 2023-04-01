import { Component } from '@angular/core';
import { Production } from '.././production.model';
import { ProductionService } from '.././production.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  constructor(private productionService: ProductionService) { }
  productions: Production[] = [];
  displayedColumns = ['country', 'monthYear', 'productionPerDay'];
  selectedCountry: string = 'all';
  countries: string[] = []

  onSelected() {
    if (this.selectedCountry == 'all') {
      this.getAllProductions();
    } else {
      this.productionService.getProductionsForCountry(this.selectedCountry).subscribe(
        data => this.productions = data,
        error => console.log(error)
      );
    }
  }

  getAllCountries() {
    this.productionService.getAllCountries().subscribe(
      countries => this.countries = countries,
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.getAllProductions();
    this.getAllCountries();
  }

  getAllProductions() {
    this.productionService.getAllProductions().subscribe(
      data => this.productions = data,
      error => console.log(error)
    );
    ;
  }
}

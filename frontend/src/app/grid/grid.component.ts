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

  onCountrySelected(countryName: string) {
    console.log('event received my parent ' + countryName)
    if (countryName == 'all') {
      this.getAllProductions();
    } else {
      this.productionService.getProductionsForCountry(countryName).subscribe(
        data => this.productions = data,
        error => console.log(error)
      );
    }
  }

  ngOnInit(): void {
    this.getAllProductions();
  }

  getAllProductions() {
    this.productionService.getAllProductions().subscribe(
      data => this.productions = data,
      error => console.log(error)
    );
    ;
  }
}

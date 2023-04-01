import { Component } from '@angular/core';
import { ProductionService } from '../production.service';
import { StateService } from 'src/state/state.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  constructor(private productionService: ProductionService,
              private stateService: StateService) { }
  documentStyle = getComputedStyle(document.documentElement);
  data: any;
  options: any;

  onCountrySelected(selectedCountry: string) {
    this.updateState(selectedCountry);
    this.productionService.getProductionsForCountry(selectedCountry).subscribe(
      data => {
        let labels: string[] = [];
        let values: number[] = [];
        data.forEach(e => {
          labels.push(e.monthYear);
          values.push(e.value);
        });

        this.data = {
          labels: labels,
          datasets: [
              {
                  label: data[0].country,
                  backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
                  borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                  data: values
              }
          ]
      };

      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.initChart();
    let state = this.stateService.state$.getValue();
    this.onCountrySelected(state.country);
  }

  initChart() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
  }

  updateState(selectedCountry: string) {
    let state = this.stateService.state$.getValue() || {};
    state.country = selectedCountry;
    this.stateService.state$.next(state);
  }
}


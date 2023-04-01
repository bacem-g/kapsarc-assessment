import { Component } from '@angular/core';
import { ProductionService } from '../production.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  constructor(private productionService: ProductionService) { }
  documentStyle = getComputedStyle(document.documentElement);
  data: any;
  options: any;

  onCountrySelected(countryName: string) {
    this.productionService.getProductionsForCountry(countryName).subscribe(
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
}


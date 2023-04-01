import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Production } from './production.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  constructor(private http: HttpClient) { }

  private productionApi = 'api/productions';
  private countryApi = 'api/countries';

  getAllProductions(): Observable<Production[]> {
    return this.http.get<Production[]>(this.productionApi + '/all')
  }

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.countryApi)
  }

  getProductionsForCountry(countryName: string) {
    return this.http.get<Production[]>(this.productionApi, { params: {countryName: countryName} })
  }
}

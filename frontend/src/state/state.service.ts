import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { State } from './state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  state$ = new BehaviorSubject<State>({country: 'all'});
}

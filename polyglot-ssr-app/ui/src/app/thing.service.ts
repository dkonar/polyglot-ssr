import { Injectable } from '@angular/core';
import { Thing } from './thing';
import { THINGS } from './mock-things';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThingService {
  constructor() { }
  getThings(): Observable<Thing[]> {
    return of(THINGS);
  }
}

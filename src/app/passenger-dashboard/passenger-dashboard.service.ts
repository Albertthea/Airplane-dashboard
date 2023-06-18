import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passenger } from './models/passenger.interface';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const PASSENGER_API: string = '/api/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get<Passenger[]>(PASSENGER_API)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPassenger(id: number): Observable<Passenger> {
    return this.http
      .get<Passenger>(`${PASSENGER_API}/${id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updatePassengers(passenger: Passenger): Observable<Passenger> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger, {
        headers: headers,
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removePassengers(passenger: Passenger): Observable<Passenger> {
    return this.http
      .delete<Passenger>(`${PASSENGER_API}/${passenger.id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Flight {
  id: number;
  flight_number: string;
  departure_airport_id: number;
  arrival_airport_id: number;
  departure_time: string;
  arrival_time: string;
  flight_type: string;
  estimated_co2: number;
  plane_id: number;
  departure_airport: any;
  arrival_airport: any;
  plane: any;
}

export interface FlightStatistics {
  total_flights: number;
  total_co2: number;
  average_co2: number;
  flights_by_type: any;
  top_routes: any[];
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = `${environment.apiUrl}/flights`;

  constructor(private http: HttpClient) { }

  // Obtener todos los vuelos
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  // Obtener estadísticas de vuelos
  getFlightStatistics(): Observable<FlightStatistics> {
    return this.http.get<FlightStatistics>(`${this.apiUrl}/statistics`);
  }

  // Obtener vuelos por aeropuerto
  getFlightsByAirport(airportId: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/airport/${airportId}`);
  }

  // Obtener vuelos por fecha
  getFlightsByDate(date: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/date/${date}`);
  }

  // Obtener vuelos por tipo
  getFlightsByType(type: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/type/${type}`);
  }

  // Obtener CO2 por aeropuerto
  getCO2ByAirport(airportId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/co2/airport/${airportId}`);
  }

  // Obtener vuelos con mayor CO2
  getHighestCO2Flights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/co2/highest`);
  }
}
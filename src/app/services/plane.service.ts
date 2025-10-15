import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Plane {
  id?: number;
  model: string;
  manufacturer: string;
  year: number;
  capacity: number;
  fuel_efficiency: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  private apiUrl = `${environment.apiUrl}/planes`;

  constructor(private http: HttpClient) { }

  // Obtener todos los aviones
  getPlanes(): Observable<Plane[]> {
    return this.http.get<Plane[]>(this.apiUrl);
  }

  // Obtener un avión por ID
  getPlane(id: number): Observable<Plane> {
    return this.http.get<Plane>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo avión
  createPlane(plane: Plane): Observable<Plane> {
    return this.http.post<Plane>(this.apiUrl, plane);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Territory {
  id?: number;
  name: string;
  description?: string;
  pollution_level?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PollutionAnalysis {
  average_pollution: number;
  max_pollution: number;
  min_pollution: number;
  total_territories: number;
  high_pollution_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class TerritoryService {
  private apiUrl = `${environment.apiUrl}/territories`;

  constructor(private http: HttpClient) { }

  // Obtener todos los territorios
  getTerritories(): Observable<Territory[]> {
    return this.http.get<Territory[]>(this.apiUrl);
  }

  // Obtener un territorio por ID
  getTerritory(id: number): Observable<Territory> {
    return this.http.get<Territory>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo territorio
  createTerritory(territory: Territory): Observable<Territory> {
    return this.http.post<Territory>(this.apiUrl, territory);
  }

  // Obtener análisis de contaminación
  getPollutionAnalysis(): Observable<PollutionAnalysis> {
    return this.http.get<PollutionAnalysis>(`${this.apiUrl}/pollution_analysis`);
  }

  // Health check
  healthCheck(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/health`);
  }
}
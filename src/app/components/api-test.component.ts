import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerritoryService, Territory, PollutionAnalysis } from '../services/territory.service';
import { PlaneService, Plane } from '../services/plane.service';
import { FlightService, Flight, FlightStatistics } from '../services/flight.service';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="api-test-container">
      <h1>🔗 Test Conexión API Backend</h1>
      
      <!-- Health Check -->
      <div class="test-section">
        <h2>🏥 Health Check</h2>
        <button (click)="testHealthCheck()" class="test-btn">Probar Health Check</button>
        <div class="result" [class.error]="healthError">
          <pre>{{ healthResult | json }}</pre>
        </div>
      </div>

      <!-- Territories Test -->
      <div class="test-section">
        <h2>🌍 Territorios</h2>
        <button (click)="testTerritories()" class="test-btn">Obtener Territorios</button>
        <button (click)="testPollutionAnalysis()" class="test-btn">Análisis Contaminación</button>
        <div class="result">
          <pre>{{ territoriesResult | json }}</pre>
        </div>
      </div>

      <!-- Planes Test -->
      <div class="test-section">
        <h2>✈️ Aviones</h2>
        <button (click)="testPlanes()" class="test-btn">Obtener Aviones</button>
        <div class="result">
          <pre>{{ planesResult | json }}</pre>
        </div>
      </div>

      <!-- Flights Test -->
      <div class="test-section">
        <h2>🛫 Vuelos</h2>
        <button (click)="testFlights()" class="test-btn">Obtener Vuelos</button>
        <button (click)="testFlightStatistics()" class="test-btn">Estadísticas</button>
        <div class="result">
          <pre>{{ flightsResult | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-test-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .test-section {
      margin-bottom: 30px;
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
    }

    .test-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    .test-btn:hover {
      background: #0056b3;
    }

    .result {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;
      max-height: 300px;
      overflow-y: auto;
    }

    .result.error {
      background: #f8d7da;
      color: #721c24;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
    }
  `]
})
export class ApiTestComponent implements OnInit {
  healthResult: any = null;
  healthError: boolean = false;
  territoriesResult: any = null;
  planesResult: any = null;
  flightsResult: any = null;

  constructor(
    private territoryService: TerritoryService,
    private planeService: PlaneService,
    private flightService: FlightService
  ) {}

  ngOnInit() {
    // Auto-test health check on load
    this.testHealthCheck();
  }

  testHealthCheck() {
    this.healthError = false;
    this.territoryService.healthCheck().subscribe({
      next: (result) => {
        this.healthResult = { 
          status: 'SUCCESS ✅', 
          data: result,
          timestamp: new Date().toISOString()
        };
      },
      error: (error) => {
        this.healthError = true;
        this.healthResult = { 
          status: 'ERROR ❌', 
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });
  }

  testTerritories() {
    this.territoryService.getTerritories().subscribe({
      next: (territories) => {
        this.territoriesResult = {
          status: 'SUCCESS ✅',
          count: territories.length,
          data: territories.slice(0, 3), // Solo primeros 3 para mostrar
          timestamp: new Date().toISOString()
        };
      },
      error: (error) => {
        this.territoriesResult = {
          status: 'ERROR ❌',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });
  }

  testPollutionAnalysis() {
    this.territoryService.getPollutionAnalysis().subscribe({
      next: (analysis) => {
        this.territoriesResult = {
          status: 'POLLUTION ANALYSIS ✅',
          data: analysis,
          timestamp: new Date().toISOString()
        };
      },
      error: (error) => {
        this.territoriesResult = {
          status: 'ERROR ❌',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });
  }

  testPlanes() {
    this.planeService.getPlanes().subscribe({
      next: (planes) => {
        this.planesResult = {
          status: 'SUCCESS ✅',
          count: planes.length,
          data: planes.slice(0, 3), // Solo primeros 3 para mostrar
          timestamp: new Date().toISOString()
        };
      },
      error: (error) => {
        this.planesResult = {
          status: 'ERROR ❌',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });
  }

  testFlights() {
    this.flightService.getFlights().subscribe({
      next: (flights) => {
        this.flightsResult = {
          status: 'SUCCESS ✅',
          count: flights.length,
          data: flights.slice(0, 3), // Solo primeros 3 para mostrar
          timestamp: new Date().toISOString()
        };
      },
      error: (error) => {
        this.flightsResult = {
          status: 'ERROR ❌',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });
  }

  testFlightStatistics() {
    this.flightService.getFlightStatistics().subscribe({
      next: (stats) => {
        this.flightsResult = {
          status: 'FLIGHT STATISTICS ✅',
          data: stats,
          timestamp: new Date().toISOString()
        };
      },
      error: (error) => {
        this.flightsResult = {
          status: 'ERROR ❌',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });
  }
}
import { Component } from '@angular/core';
import { FlightMap } from './flight-map';

interface FlightData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  airline: string;
  flightNumber: string;
  destination: string;
  color?: string;
}

@Component({
  selector: 'app-flight-map-example',
  imports: [FlightMap],
  template: `
    <div class="example-container">
      <h2>Flight Map Example</h2>
      <p>This example shows how to use the FlightMap component with custom data:</p>
      
      <app-flight-map [flights]="customFlights"></app-flight-map>
      
      <div class="controls">
        <button (click)="addRandomFlight()">Add Random Flight</button>
        <button (click)="clearFlights()">Clear All Flights</button>
        <button (click)="resetToDefault()">Reset to Default</button>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      padding: 20px;
    }
    
    .controls {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
    
    button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    button:hover {
      background: #0056b3;
    }
  `]
})
export class FlightMapExample {
  customFlights: FlightData[] = [
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: 48.8566,
      endLng: 2.3522,
      airline: 'Air France',
      flightNumber: 'AF1234',
      destination: 'Paris (CDG)',
      color: '#e74c3c'
    },
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: 52.5200,
      endLng: 13.4050,
      airline: 'Lufthansa',
      flightNumber: 'LH5678',
      destination: 'Berlin (BER)',
      color: '#3498db'
    }
  ];

  addRandomFlight(): void {
    const destinations = [
      { lat: 55.7558, lng: 37.6176, city: 'Moscow (SVO)', airline: 'Aeroflot', color: '#9b59b6' },
      { lat: 39.9042, lng: 116.4074, city: 'Beijing (PEK)', airline: 'Air China', color: '#f39c12' },
      { lat: -33.9249, lng: 18.4241, city: 'Cape Town (CPT)', airline: 'South African', color: '#1abc9c' },
      { lat: -34.6037, lng: -58.3816, city: 'Buenos Aires (EZE)', airline: 'Aerolíneas Argentinas', color: '#e67e22' }
    ];

    const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
    const flightNumber = Math.floor(Math.random() * 9000) + 1000;

    this.customFlights.push({
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: randomDest.lat,
      endLng: randomDest.lng,
      airline: randomDest.airline,
      flightNumber: `${randomDest.airline.substring(0, 2).toUpperCase()}${flightNumber}`,
      destination: randomDest.city,
      color: randomDest.color
    });
  }

  clearFlights(): void {
    this.customFlights = [];
  }

  resetToDefault(): void {
    this.customFlights = [
      {
        startLat: 41.2974,
        startLng: 2.0833,
        endLat: 48.8566,
        endLng: 2.3522,
        airline: 'Air France',
        flightNumber: 'AF1234',
        destination: 'Paris (CDG)',
        color: '#e74c3c'
      },
      {
        startLat: 41.2974,
        startLng: 2.0833,
        endLat: 52.5200,
        endLng: 13.4050,
        airline: 'Lufthansa',
        flightNumber: 'LH5678',
        destination: 'Berlin (BER)',
        color: '#3498db'
      }
    ];
  }
}

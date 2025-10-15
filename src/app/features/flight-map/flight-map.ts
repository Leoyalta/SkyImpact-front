import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-flight-map',
  imports: [CommonModule],
  templateUrl: './flight-map.html',
  styleUrl: './flight-map.scss'
})
export class FlightMap implements OnInit, OnDestroy {
  @ViewChild('globeContainer', { static: true }) globeContainer!: ElementRef;
  @Input() flights: FlightData[] = [];
  
  private globe: any;
  private mockFlights: FlightData[] = [
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: 40.6413,
      endLng: -73.7781,
      airline: 'Iberia',
      flightNumber: 'IB1234',
      destination: 'New York (JFK)',
      color: '#ff6b6b'
    },
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: 51.4700,
      endLng: -0.4543,
      airline: 'Vueling',
      flightNumber: 'VY5678',
      destination: 'London (LHR)',
      color: '#4ecdc4'
    },
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: 35.6762,
      endLng: 139.6503,
      airline: 'Air Europa',
      flightNumber: 'UX9012',
      destination: 'Tokyo (NRT)',
      color: '#45b7d1'
    },
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: -33.9399,
      endLng: 18.4747,
      airline: 'Iberia',
      flightNumber: 'IB3456',
      destination: 'Cape Town (CPT)',
      color: '#f9ca24'
    },
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: -22.9068,
      endLng: -43.1729,
      airline: 'LATAM',
      flightNumber: 'LA7890',
      destination: 'Rio de Janeiro (GIG)',
      color: '#6c5ce7'
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeGlobe();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.globe) {
      this.globe.destroy();
    }
  }

  private initializeGlobe(): void {
    // Import Globe dynamically
    import('globe.gl').then((Globe) => {
      const flightsData = this.flights.length > 0 ? this.flights : this.mockFlights;
      
      this.globe = new Globe.default(this.globeContainer.nativeElement)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .showAtmosphere(true)
        .atmosphereColor('#3a0ca3')
        .atmosphereAltitude(0.15);

      // Add flight paths
      this.globe
        .arcsData(flightsData)
        .arcStartLat((d: FlightData) => d.startLat)
        .arcStartLng((d: FlightData) => d.startLng)
        .arcEndLat((d: FlightData) => d.endLat)
        .arcEndLng((d: FlightData) => d.endLng)
        .arcColor((d: FlightData) => d.color || '#ff6b6b')
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2000)
        .arcStroke(2)
        .arcsTransitionDuration(1000);

      // Add labels for airports
      const airports = flightsData.map(flight => ({
        lat: flight.startLat,
        lng: flight.startLng,
        label: 'Barcelona (BCN)',
        size: 0.5,
        color: '#ff6b6b'
      })).concat(flightsData.map(flight => ({
        lat: flight.endLat,
        lng: flight.endLng,
        label: flight.destination,
        size: 0.3,
        color: flight.color || '#ff6b6b'
      })));

      this.globe
        .labelsData(airports)
        .labelLat((d: any) => d.lat)
        .labelLng((d: any) => d.lng)
        .labelText((d: any) => d.label)
        .labelSize((d: any) => d.size)
        .labelColor((d: any) => d.color)
        .labelDotRadius((d: any) => d.size)
        .labelResolution(6);

      // Globe is already added to DOM via constructor

      // Auto-rotate
      this.globe.controls().autoRotate = true;
      this.globe.controls().autoRotateSpeed = 0.5;

      console.log('Flight map globe initialized successfully');
    }).catch(error => {
      console.error('Error loading Globe.gl:', error);
    });
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.globe) {
      setTimeout(() => {
        const container = this.globeContainer.nativeElement;
        this.globe.width(container.clientWidth);
        this.globe.height(container.clientHeight);
      }, 100);
    }
  }

  // Method to get flights data for template
  getFlightsData(): FlightData[] {
    return this.flights.length > 0 ? this.flights : this.mockFlights;
  }

  // Method to update flights data
  updateFlights(newFlights: FlightData[]): void {
    this.flights = newFlights;
    if (this.globe) {
      this.globe.arcsData(newFlights);
    }
  }
}

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
  private mockFlights: FlightData[] = this.generateSpainFlights();

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeGlobe();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.globe) {
      this.globe.destroy();
    }
  }

  private generateSpainFlights(): FlightData[] {
    const spainAirports = [
      { name: 'Madrid (MAD)', lat: 40.4839, lng: -3.5680 },
      { name: 'Barcelona (BCN)', lat: 41.2974, lng: 2.0833 },
      { name: 'Palma de Mallorca (PMI)', lat: 39.5517, lng: 2.7388 },
      { name: 'Málaga (AGP)', lat: 36.6749, lng: -4.4991 },
      { name: 'Alicante (ALC)', lat: 38.2822, lng: -0.5582 },
      { name: 'Valencia (VLC)', lat: 39.4893, lng: -0.4816 },
      { name: 'Sevilla (SVQ)', lat: 37.4180, lng: -5.8931 },
      { name: 'Bilbao (BIO)', lat: 43.3011, lng: -2.9106 },
      { name: 'Granada (GRX)', lat: 37.1887, lng: -3.7774 },
      { name: 'Santiago (SCQ)', lat: 42.8963, lng: -8.4151 },
      { name: 'Vigo (VGO)', lat: 42.2318, lng: -8.6268 },
      { name: 'Santander (SDR)', lat: 43.4271, lng: -3.8200 },
      { name: 'Zaragoza (ZAZ)', lat: 41.6662, lng: -1.0419 },
      { name: 'Murcia (MJV)', lat: 37.7749, lng: -0.8124 },
      { name: 'Córdoba (ODB)', lat: 37.8419, lng: -4.8489 },
      { name: 'Jerez (XRY)', lat: 36.7446, lng: -6.0601 },
      { name: 'Almería (LEI)', lat: 36.8439, lng: -2.3701 },
      { name: 'Badajoz (BJZ)', lat: 38.8913, lng: -6.8213 },
      { name: 'León (LEN)', lat: 42.5890, lng: -5.6558 },
      { name: 'Valladolid (VLL)', lat: 41.7062, lng: -4.8519 }
    ];

    const airlines = ['Iberia', 'Vueling', 'Air Europa', 'Ryanair', 'EasyJet', 'Volotea', 'Air Nostrum'];
    const flights: FlightData[] = [];

    for (let i = 0; i < 100; i++) {
      const startAirport = spainAirports[Math.floor(Math.random() * spainAirports.length)];
      let endAirport = spainAirports[Math.floor(Math.random() * spainAirports.length)];
      
      // Asegurar que el destino sea diferente al origen
      while (endAirport === startAirport) {
        endAirport = spainAirports[Math.floor(Math.random() * spainAirports.length)];
      }

      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const flightNumber = Math.floor(Math.random() * 9000) + 1000;

      flights.push({
        startLat: startAirport.lat,
        startLng: startAirport.lng,
        endLat: endAirport.lat,
        endLng: endAirport.lng,
        airline: airline,
        flightNumber: `${airline.substring(0, 2).toUpperCase()}${flightNumber}`,
        destination: endAirport.name,
        color: '#00ff00' // Verde para salida
      });
    }

    return flights;
  }

  getAirportName(lat: number, lng: number): string {
    const spainAirports = [
      { name: 'Madrid (MAD)', lat: 40.4839, lng: -3.5680 },
      { name: 'Barcelona (BCN)', lat: 41.2974, lng: 2.0833 },
      { name: 'Palma de Mallorca (PMI)', lat: 39.5517, lng: 2.7388 },
      { name: 'Málaga (AGP)', lat: 36.6749, lng: -4.4991 },
      { name: 'Alicante (ALC)', lat: 38.2822, lng: -0.5582 },
      { name: 'Valencia (VLC)', lat: 39.4893, lng: -0.4816 },
      { name: 'Sevilla (SVQ)', lat: 37.4180, lng: -5.8931 },
      { name: 'Bilbao (BIO)', lat: 43.3011, lng: -2.9106 },
      { name: 'Granada (GRX)', lat: 37.1887, lng: -3.7774 },
      { name: 'Santiago (SCQ)', lat: 42.8963, lng: -8.4151 },
      { name: 'Vigo (VGO)', lat: 42.2318, lng: -8.6268 },
      { name: 'Santander (SDR)', lat: 43.4271, lng: -3.8200 },
      { name: 'Zaragoza (ZAZ)', lat: 41.6662, lng: -1.0419 },
      { name: 'Murcia (MJV)', lat: 37.7749, lng: -0.8124 },
      { name: 'Córdoba (ODB)', lat: 37.8419, lng: -4.8489 },
      { name: 'Jerez (XRY)', lat: 36.7446, lng: -6.0601 },
      { name: 'Almería (LEI)', lat: 36.8439, lng: -2.3701 },
      { name: 'Badajoz (BJZ)', lat: 38.8913, lng: -6.8213 },
      { name: 'León (LEN)', lat: 42.5890, lng: -5.6558 },
      { name: 'Valladolid (VLL)', lat: 41.7062, lng: -4.8519 }
    ];

    const airport = spainAirports.find(ap => 
      Math.abs(ap.lat - lat) < 0.1 && Math.abs(ap.lng - lng) < 0.1
    );
    
    return airport ? airport.name : 'Unknown Airport';
  }

  private initializeGlobe(): void {
    // Check if container is ready
    if (!this.globeContainer?.nativeElement) {
      console.error('Globe container not ready');
      return;
    }

    const container = this.globeContainer.nativeElement;
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      console.error('Container has no dimensions');
      return;
    }

    // Import Globe dynamically
    import('globe.gl').then((Globe) => {
      const flightsData = this.flights.length > 0 ? this.flights : this.mockFlights;
      
      this.globe = new Globe.default(container)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .showAtmosphere(true)
        .atmosphereColor('#3a0ca3')
        .atmosphereAltitude(0.15)
        .width(container.clientWidth)
        .height(container.clientHeight);

      // Add flight paths with gradient
      this.globe
        .arcsData(flightsData)
        .arcStartLat((d: FlightData) => d.startLat)
        .arcStartLng((d: FlightData) => d.startLng)
        .arcEndLat((d: FlightData) => d.endLat)
        .arcEndLng((d: FlightData) => d.endLng)
        .arcColor((d: FlightData) => ['#00ff00', '#ff0000']) // Gradient from green to red
        .arcStroke(0.02)
        .arcsTransitionDuration(1000);

      // Add labels for airports
      const uniqueAirports = new Map();
      flightsData.forEach(flight => {
        const startKey = `${flight.startLat},${flight.startLng}`;
        const endKey = `${flight.endLat},${flight.endLng}`;
        
        if (!uniqueAirports.has(startKey)) {
          uniqueAirports.set(startKey, {
            lat: flight.startLat,
            lng: flight.startLng,
            label: this.getAirportName(flight.startLat, flight.startLng),
            size: 0.05,
            color: '#00ff00'
          });
        }
        
        if (!uniqueAirports.has(endKey)) {
          uniqueAirports.set(endKey, {
            lat: flight.endLat,
            lng: flight.endLng,
            label: flight.destination,
            size: 0.03,
            color: '#ff0000'
          });
        }
      });

      this.globe
        .labelsData(Array.from(uniqueAirports.values()))
        .labelLat((d: any) => d.lat)
        .labelLng((d: any) => d.lng)
        .labelText((d: any) => d.label)
        .labelSize((d: any) => d.size)
        .labelColor((d: any) => d.color)
        .labelDotRadius((d: any) => d.size)
        .labelResolution(6);

      // Globe is already added to DOM via constructor

      // Position globe to focus on Spain with optimal zoom
      this.globe.pointOfView({ lat: 40.247909743925874, lng: -5.914254519146439, altitude: 0.6218937388142785 });
      
      // Log initial zoom
      const initialPov = this.globe.pointOfView();
      console.log('Initial zoom/altitude:', initialPov.altitude);
      console.log('Initial position:', { lat: initialPov.lat, lng: initialPov.lng });

      // Disable auto-rotation but allow manual movement
      this.globe.controls().autoRotate = false;
      this.globe.controls().enableRotate = true;
      this.globe.controls().enableZoom = true;
      this.globe.controls().enablePan = true;

      // Add zoom listener to console
      this.globe.controls().addEventListener('change', () => {
        const pov = this.globe.pointOfView();
        console.log('Current zoom/altitude:', pov.altitude);
        console.log('Current position:', { lat: pov.lat, lng: pov.lng });
      });

      // Improve texture quality
      const renderer = this.globe.renderer();
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.antialias = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = 1; // PCFSoftShadowMap
      
      // Force render
      renderer.render();

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

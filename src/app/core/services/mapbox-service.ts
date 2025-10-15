import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


export const SPANISH_AIRPORTS = [
  {
    name: 'Barcelona–El Prat (BCN)',
    city: 'Barcelona',
    coords: [2.0769, 41.2969],
    flights: { departures: 120, arrivals: 118 },
    co2: 420, 
  },
  {
    name: 'Madrid–Barajas (MAD)',
    city: 'Madrid',
    coords: [-3.5676, 40.4915],
    flights: { departures: 180, arrivals: 182 },
    co2: 640,
  },
  {
    name: 'Málaga–Costa del Sol (AGP)',
    city: 'Málaga',
    coords: [-4.4991, 36.6749],
    flights: { departures: 90, arrivals: 87 },
    co2: 270,
  },
  {
    name: 'Valencia (VLC)',
    city: 'Valencia',
    coords: [-0.4816, 39.4893],
    flights: { departures: 65, arrivals: 63 },
    co2: 210,
  },
  {
    name: 'Alicante–Elche (ALC)',
    city: 'Alicante',
    coords: [-0.5582, 38.2822],
    flights: { departures: 75, arrivals: 72 },
    co2: 240,
  },
  {
    name: 'Sevilla (SVQ)',
    city: 'Sevilla',
    coords: [-5.8970, 37.4179],
    flights: { departures: 55, arrivals: 58 },
    co2: 180,
  },
  {
    name: 'Bilbao (BIO)',
    city: 'Bilbao',
    coords: [-2.9106, 43.3011],
    flights: { departures: 38, arrivals: 37 },
    co2: 120,
  },
  {
    name: 'Gran Canaria (LPA)',
    city: 'Gran Canaria',
    coords: [-15.3866, 27.9319],
    flights: { departures: 95, arrivals: 92 },
    co2: 310,
  },
  {
    name: 'Palma de Mallorca (PMI)',
    city: 'Palma',
    coords: [2.7304, 39.5518],
    flights: { departures: 110, arrivals: 108 },
    co2: 350,
  },
  {
    name: 'Reus (REU)',
    city: 'Reus',
    coords: [1.1564, 41.1476],
    flights: { departures: 25, arrivals: 23 },
    co2: 75,
  }
];

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
   private map!: mapboxgl.Map;
     private readonly token = 'pk.eyJ1IjoibGVveWFsdGEiLCJhIjoiY21jbGtvOW14MGNvazJqczlhcGpjMGh4OSJ9.MGdsqLwTx3bpGLMc9otmGQ';

  constructor() {
  }

initMap(containerId: string, options?: Partial<mapboxgl.MapboxOptions>) {
  if (!this.map) {
    const elPratCoords: [number, number] = [2.0769, 41.2969];

    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: elPratCoords,
      zoom: 10,
      accessToken: this.token,
      ...options
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('zoom', () => {
      const zoom = this.map.getZoom();
      const scale = Math.min(2.5, Math.max(zoom / 8, 0.8)); 
      document.querySelectorAll<HTMLElement>('.marker').forEach(el => {
        el.style.transform = `scale(${scale})`;
      });
    });
  }
  return this.map;
}

addAirports(airports: any[]) {
  if (!this.map) return;

  airports.forEach(airport => {
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <strong>${airport.name}</strong><br>
        <em>${airport.city}</em><br><br>
        ✈️ Departures today: ${airport.flights.departures}<br>
        🛬 Arrivals today: ${airport.flights.arrivals}<br>
        🌍 CO₂ emitted: ${airport.co2} tons/day
      `);

    const level = airport.pollutionLevel || this.getPollutionLevel(airport.co2);

    const el = document.createElement('div');
    el.className = `marker pollution-${level}`;

    new mapboxgl.Marker(el)
      .setLngLat(airport.coords)
      .setPopup(popup)
      .addTo(this.map);
  });
}

private getPollutionLevel(co2: number): string {
  if (co2 < 200) return 'low';
  if (co2 < 400) return 'medium';
  return 'high';
}
}
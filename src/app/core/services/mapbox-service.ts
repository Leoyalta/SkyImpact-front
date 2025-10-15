import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

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
      style: 'mapbox://styles/mapbox/streets-v12',
      center: elPratCoords, 
      zoom: 12,
      accessToken: this.token,
      ...options
    });

    this.map.addControl(new mapboxgl.NavigationControl());

  
    new mapboxgl.Marker()
      .setLngLat(elPratCoords)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Aeropuerto El Prat'))
      .addTo(this.map);
  }
  return this.map;
}


addMarker(lng: number, lat: number, popupText?: string) {
  if (!this.map) return;

  const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat]);

  if (popupText) {
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(popupText);
    marker.setPopup(popup);
  }

  marker.addTo(this.map);
}
  
}
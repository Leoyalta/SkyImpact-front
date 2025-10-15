import { Injectable } from '@angular/core';
import Globe from 'globe.gl';

@Injectable({
  providedIn: 'root'
})
export class GlobeService {
  constructor() {}

  createGlobe(element: HTMLElement): any {
    try {
      const globe = new Globe(element);
      
      // Configuración básica del globo
      globe
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#3a228a')
        .atmosphereAltitude(0.15)
        .width(element.clientWidth)
        .height(element.clientHeight)
        .backgroundColor('rgba(0,0,0,0)'); // Fondo transparente

      // Configurar controles básicos
      this.setupGlobeControls(globe);

      // Forzar redimensionamiento del canvas
      setTimeout(() => {
        const canvas = element.querySelector('canvas');
        if (canvas) {
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          canvas.style.maxWidth = '100%';
          canvas.style.maxHeight = '100%';
          canvas.style.objectFit = 'contain'; // Asegurar que el contenido se ajuste
        }
      }, 100);

      return globe;
    } catch (error) {
      console.error('Error creating globe:', error);
      return null;
    }
  }

  updateGlobeControls(globe: any): void {
    if (globe) {
      this.setupGlobeControls(globe);
    }
  }


  private setupGlobeControls(globe: any): void {
    // Configurar controles básicos
    globe.controls().enableZoom = false;
    globe.controls().enableRotate = true;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
  }
}

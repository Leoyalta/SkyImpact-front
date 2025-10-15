import { Component, AfterViewInit } from '@angular/core';
import { MapboxService} from '../../core/services/mapbox-service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class Map implements AfterViewInit {

  constructor(private mapService: MapboxService) { }

  ngAfterViewInit(): void {
    this.mapService.initMap('map');
    this.mapService.addMarker(2.0769, 41.2969, 'Aeropuerto El Prat');
  }
}
import { Component, AfterViewInit } from '@angular/core';
import { MapboxService} from '../../core/services/mapbox-service';
import {SPANISH_AIRPORTS} from '../../core/services/mapbox-service'

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
    this.mapService.addAirports(SPANISH_AIRPORTS);
  }
}
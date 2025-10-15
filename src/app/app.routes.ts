import { Routes } from '@angular/router';
import { Map } from './features/map/map';
import { About } from './features/about/about';
import { Welcome } from './features/welcome/welcome';
import { FlightMap } from './features/flight-map/flight-map';

export const routes: Routes = [
       {
    path: '',
    children: [
      { path: 'map', component: Map},
      { path: 'about', component: About},
      { path: 'flight-map', component: FlightMap},
      { path: '', component: Welcome },
      { path: 'welcome', component: Welcome },

    ],
  },

];

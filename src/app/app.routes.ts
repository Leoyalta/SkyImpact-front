import { Routes } from '@angular/router';
import { Map } from './features/map/map';
import { About } from './features/about/about';
import { Welcome } from './features/welcome/welcome';
import { FlightMap } from './features/flight-map/flight-map';
import { ApiTestComponent } from './components/api-test.component';

export const routes: Routes = [
       {
    path: '',
    children: [
      { path: 'map', component: Map},
      { path: 'about', component: About},
      { path: 'flight-map', component: FlightMap},
      { path: 'api-test', component: ApiTestComponent},
      { path: 'welcome', component: Welcome },
      { path: '', component: Welcome } 
    ],
  },

];

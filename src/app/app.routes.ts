import { Routes } from '@angular/router';
import { Map } from './features/map/map';
import { About } from './features/about/about';

export const routes: Routes = [
       {
    path: '',
    children: [
      { path: 'map', component: Map},
      { path: 'about', component: About},
      { path: '', component: Map},
      
    ],
  },
];

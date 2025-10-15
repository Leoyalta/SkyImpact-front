import { Component } from '@angular/core';
import { GlobeViewer } from './globe-viewer/globe-viewer';

@Component({
  selector: 'app-welcome',
  imports: [GlobeViewer],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {

}

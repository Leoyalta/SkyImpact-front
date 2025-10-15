import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { GlobeService } from '../../../core/services/globe.service';

@Component({
  selector: 'app-globe-viewer',
  imports: [],
  templateUrl: './globe-viewer.html',
  styleUrl: './globe-viewer.scss'
})
export class GlobeViewer implements OnInit, OnDestroy {
  @ViewChild('globeContainer', { static: true }) globeContainer!: ElementRef;
  
  private globe: any;

  constructor(private globeService: GlobeService) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log('Initializing globe viewer');
      this.globe = this.globeService.createGlobe(this.globeContainer.nativeElement);
      
      if (this.globe) {
        console.log('Globe initialized successfully');
      } else {
        console.error('Failed to initialize globe');
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.globe) {
      this.globe.destroy();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.globe) {
      setTimeout(() => {
        const container = this.globeContainer.nativeElement;
        this.globe.width(container.clientWidth);
        this.globe.height(container.clientHeight);
        
        const canvas = container.querySelector('canvas');
        if (canvas) {
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          canvas.style.maxWidth = '100%';
          canvas.style.maxHeight = '100%';
          canvas.style.objectFit = 'contain';
        }
      }, 100);
    }
  }
}

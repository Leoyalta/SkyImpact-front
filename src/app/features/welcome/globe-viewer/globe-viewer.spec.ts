import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeViewer } from './globe-viewer';

describe('GlobeViewer', () => {
  let component: GlobeViewer;
  let fixture: ComponentFixture<GlobeViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobeViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobeViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightMap } from './flight-map';

describe('FlightMap', () => {
  let component: FlightMap;
  let fixture: ComponentFixture<FlightMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mock flights data', () => {
    expect(component['mockFlights']).toBeDefined();
    expect(component['mockFlights'].length).toBe(5);
  });

  it('should update flights when new data is provided', () => {
    const newFlights = [
      {
        startLat: 41.2974,
        startLng: 2.0833,
        endLat: 40.7128,
        endLng: -74.0060,
        airline: 'Test Airline',
        flightNumber: 'TA123',
        destination: 'Test Destination'
      }
    ];
    
    component.updateFlights(newFlights);
    expect(component.flights).toEqual(newFlights);
  });
});

# Flight Map Component

Un componente Angular que muestra vuelos en un globo 3D interactivo usando Globe.gl, similar al ejemplo de [Globe.gl Airline Routes](https://globe.gl/example/airline-routes/us-international-outbound.html).

## Características

- 🌍 Globo 3D interactivo con rotación automática
- ✈️ Visualización de rutas de vuelo con animaciones
- 🏷️ Etiquetas de aeropuertos
- 🎨 Colores personalizables para cada vuelo
- 📱 Diseño responsivo
- 🔄 Datos mock incluidos (5 vuelos desde Barcelona)

## Uso Básico

```typescript
import { FlightMap } from './features/flight-map/flight-map';

@Component({
  template: '<app-flight-map></app-flight-map>'
})
export class MyComponent {}
```

## Uso con Datos Personalizados

```typescript
import { FlightMap } from './features/flight-map/flight-map';

interface FlightData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  airline: string;
  flightNumber: string;
  destination: string;
  color?: string;
}

@Component({
  template: '<app-flight-map [flights]="myFlights"></app-flight-map>'
})
export class MyComponent {
  myFlights: FlightData[] = [
    {
      startLat: 41.2974,
      startLng: 2.0833,
      endLat: 40.6413,
      endLng: -73.7781,
      airline: 'Iberia',
      flightNumber: 'IB1234',
      destination: 'New York (JFK)',
      color: '#ff6b6b'
    }
  ];
}
```

## API

### Inputs

- `flights: FlightData[]` - Array de datos de vuelos. Si no se proporciona, se usan los datos mock.

### Métodos

- `updateFlights(newFlights: FlightData[])` - Actualiza los datos de vuelos dinámicamente.

## Estructura de Datos

```typescript
interface FlightData {
  startLat: number;    // Latitud del aeropuerto de origen
  startLng: number;    // Longitud del aeropuerto de origen
  endLat: number;      // Latitud del aeropuerto de destino
  endLng: number;      // Longitud del aeropuerto de destino
  airline: string;     // Nombre de la aerolínea
  flightNumber: string; // Número de vuelo
  destination: string;  // Nombre del destino
  color?: string;      // Color opcional para la ruta
}
```

## Datos Mock Incluidos

El componente incluye 5 vuelos mock desde Barcelona a:

1. **New York (JFK)** - Iberia IB1234 - Color: #ff6b6b
2. **London (LHR)** - Vueling VY5678 - Color: #4ecdc4
3. **Tokyo (NRT)** - Air Europa UX9012 - Color: #45b7d1
4. **Cape Town (CPT)** - Iberia IB3456 - Color: #f9ca24
5. **Rio de Janeiro (GIG)** - LATAM LA7890 - Color: #6c5ce7

## Estilos

El componente incluye estilos CSS personalizados con:
- Gradiente de fondo
- Efectos de cristal (backdrop-filter)
- Animaciones suaves
- Diseño responsivo
- Lista de vuelos activos

## Dependencias

- `globe.gl` - Biblioteca para visualización 3D
- `@angular/common` - Para directivas como *ngFor

## Navegación

El componente está disponible en la ruta `/flight-map` y se puede acceder desde el menú de navegación.

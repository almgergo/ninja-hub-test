import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {AgmMap, AgmPolygon, LatLngLiteral, PolyMouseEvent} from '@agm/core';
import {GeolocationService} from './geolocation.service';
import GeocodingResponse = Geocoding.GeocodingResponse;
import {google} from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-maps-test',
  templateUrl: './maps-test.component.html',
  styleUrls: ['./maps-test.component.scss']
})
export class MapsTestComponent implements OnInit {
  @ViewChildren('barnPolygons', {read: AgmPolygon}) barnPolygons: QueryList<
    AgmPolygon
  >;
  @ViewChild(AgmMap) map: any;
  polygon: any;

  title = 'My first AGM project';
  lat = 0;
  lng = 0;
  zoom = 16;

  barns: Array<{color: string; location: Array<LatLngLiteral>}> = [];

  private barnTemplate: Array<LatLngLiteral>;

  static getRandomColor() {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }

  constructor(private geo: GeolocationService) {}

  ngOnInit() {
    if (localStorage.getItem('geo_response_cache')) {
      const response: GeocodingResponse = JSON.parse(
        localStorage.getItem('geo_response_cache')
      );

      if (response.results.length > 0) {
        this.initFromGeolocationResponse(response.results[0]);
        console.log({storedResponse: response});
      }
    } else {
      this.geo
        .getCoordinates(['Sáripuszta telep, Kéthely, 8713'])
        .subscribe((response: GeocodingResponse) => {
          if (response.results.length > 0) {
            localStorage.setItem(
              'geo_response_cache',
              JSON.stringify(response)
            );
            this.lat = response.results[0].geometry.location.lat;
            this.lng = response.results[0].geometry.location.lng;
          }
        });
    }
  }

  printPaths(event: PolyMouseEvent) {
    this.barnPolygons.forEach(console.log);
    // console.log({event: event.getArray()});
  }

  private initFromGeolocationResponse(result: Geocoding.Result) {
    this.lat = result.geometry.location.lat;
    this.lng = result.geometry.location.lng;

    this.barnTemplate = [];
    this.barnTemplate.push({
      lat: result.geometry.bounds.northeast.lat,
      lng: result.geometry.bounds.northeast.lng
    });
    this.barnTemplate.push({
      lat: result.geometry.bounds.northeast.lat,
      lng: result.geometry.bounds.southwest.lng
    });
    this.barnTemplate.push({
      lat: result.geometry.bounds.southwest.lat,
      lng: result.geometry.bounds.southwest.lng
    });
    this.barnTemplate.push({
      lat: result.geometry.bounds.southwest.lat,
      lng: result.geometry.bounds.northeast.lng
    });

    // Construct the polygon.
    this.polygon = new goR2d6ogle.maps.Polygon({
      paths: this.barnTemplate,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      editable: true,
      draggable: true
    });

    this.polygon.setMap(this.map);

    this.barns.push({
      color: MapsTestComponent.getRandomColor(),
      location: this.barnTemplate
    });

    console.log({paths: this.barns});
  }

  addBarn() {
    this.barns.push({
      color: MapsTestComponent.getRandomColor(),
      location: this.barnTemplate
    });
  }

  wheel($event) {
    $event.stopPropagation();
  }

  polymouseover(event: PolyMouseEvent) {
    console.log({polymouseover: event.latLng.lat()});
  }
}

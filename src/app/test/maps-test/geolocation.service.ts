import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private http: HttpClient) {}

  public getCoordinates(address: string[]): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('address', address.join(','))
      .set('key', environment.maps.key);

    return this.http.get<any>(environment.maps.url, {params: params});
  }
}

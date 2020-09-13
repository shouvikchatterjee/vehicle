import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService {
  private loginUrl = `${environment.baseUrl}/login`;
  private vehiclesUrl = `${environment.baseUrl}/vehicles`;

  constructor(private http: HttpClient) { }

  getLoginDatas(): Observable<any> {
    return this.http.get(this.loginUrl);
  }

  getVehiclesDatas(): Observable<any> {
    return this.http.get(this.vehiclesUrl);
  }

}

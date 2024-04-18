import { Injectable, Inject } from '@angular/core';
// My angular server could not find HttpHeaders. Included it here.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  constructor(private httpClient: HttpClient,
  @Inject(BROWSER_STORAGE) private storage: Storage) {}
  
  private url = 'http://localhost:3000/api/trips';
  // Noticed the use of apiBaseUrl and tripUrl variables without them being declared or defined.
  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = 'http://localhost:3000/api/trip';
  
  getTrips() : Observable<Trip[]> {
    //console.log('Inside TripDataService::getTrips');
    return this.httpClient.get<Trip[]>(this.tripUrl);
  }
  
  addTrip(formData: Trip) : Observable<Trip[]> {
    //console.log('Inside TripDataService::addTrips');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    return this.httpClient.post<Trip[]>(this.tripUrl, formData, { headers: headers });
  }
  
  getTrip(tripCode: string) : Observable<Trip[]> {
    //console.log('Inside TripDataService::getTrip');
    return this.httpClient.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }
  
  updateTrip(formData: Trip) : Observable<Trip[]> {
    //console.log('Inside TripDataService::updateTrip');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    return this.httpClient.put<Trip[]>(this.tripUrl + '/' + formData.code, formData, {
      headers: headers,
    });
  }
  
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  
  public async makeAuthApiCall(
    urlPath: string, 
    user: User
  ): Promise<AuthResponse> {
      const url: string = `${this.apiBaseUrl}/${urlPath}`;
      return (await lastValueFrom(this.httpClient.post(url, user))) as AuthResponse;
    }
}

// event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}`);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: number, data: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, data);
  }

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(`${this.baseUrl}/${id}`);
  }  

  getYaml(id: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/yaml/${id}`, { responseType: 'text' });
  }

  download(id: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/generate/${id}`, { responseType: 'text' });
  }
}

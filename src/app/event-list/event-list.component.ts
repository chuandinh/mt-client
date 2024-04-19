import { Component, OnInit } from '@angular/core';

import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model';

import { StringUtils } from '../utils/string.utils'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit  {
  events: Event[] = [];

  constructor(private eventService: EventsService
  ) { 
    //this.event.sName;
  } 
  
  ngOnInit(): void {

    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(data => {
        console.log(data);
        this.events = data;
      });
  }

  deleteEvent(id: number) {

    if (confirm("Are you sure to delete this event ID: " + id + "?")) {
      this.eventService.deleteEvent(id)
      .subscribe(data => {
        console.log(data);
        this.getEvents();
      });
    }
  }


  download(id: number) {
    this.eventService.download(id)
    .subscribe(data => {
      console.log(data);
      var baseUrl = 'http://localhost:3000/temp';
      var url = baseUrl + "/" + data;

      window.open(url);
    });
  }
}

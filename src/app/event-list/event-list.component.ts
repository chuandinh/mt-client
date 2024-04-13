import { Component, OnInit } from '@angular/core';

import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model';

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
}

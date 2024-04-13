import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model';

import { StringUtils } from '../utils/string.utils';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.scss'
})
export class EventEditComponent implements OnInit {
  eventId: number = 0;
  event: Event = new Event();

  routingSubscription: any;

  selectedFile: File | any;

  constructor(private eventService: EventsService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { 
    //this.event.sName;
  }

  ngOnInit(): void {

    this.routingSubscription =
      this.route.params.subscribe(params => {

        if (params["id"]) {
          this.eventId = params["id"];
        } else {
          this.eventId = 0;
        }
        
        if (this.eventId > 0) {
          this.getEvent();
        }

      });  
  }

  getEvent(): void {
    this.eventService.getEvent(this.eventId)
      .subscribe(data => {
        console.log(data);
        this.event = data;
      });
  }

  saveEvent(): void { 
    this.eventService.updateEvent(this.getEventId(this.event), this.event)
      .subscribe(() => console.log('Data saved successfully'));
  }

  // create unique id base on date and time
  public getEventId(event: Event) : number {
    if(event.date == null) event.date = '';
    if(event.time == null) event.time = '';

    var id = `${event.date.replace("/", "")}${event.time.replace(":", "")}`;

    if(StringUtils.isInteger(id)) {
      return StringUtils.stringToInt(id);
    } else {
      var id = StringUtils.getCurrentDateTime();
      return StringUtils.stringToInt(id);
    }
  }  

  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (!this.selectedFile || this.selectedFile.length === 0) {
      return;
    }

    // Upload file
    const formData = new FormData();
    formData.append('upload', this.selectedFile);
    this.http.post(`http://localhost:3000/files/upload/${this.eventId}`, formData).subscribe(
      () => {
        console.log('File uploaded successfully');
      },
      error => {
        console.error('Error uploading file:', error);
      }
    );
  }  
}

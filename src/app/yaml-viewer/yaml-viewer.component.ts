import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-yaml-viewer',
  templateUrl: './yaml-viewer.component.html',
  styleUrl: './yaml-viewer.component.scss'
})
export class YamlViewerComponent {
  eventId: number = 0;
  yamlContent = "";

  routingSubscription: any;

  constructor(private eventService: EventsService,
    private route: ActivatedRoute,
  ) { 

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
          this.getYaml();
        } else {

        }

      });  
  }  

  getYaml(): void {
    this.eventService.getYaml(this.eventId)
      .subscribe(data => {
        console.log(data);
        this.yamlContent = data;
      });
  }  
}

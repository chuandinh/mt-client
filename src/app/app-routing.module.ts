import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { YamlViewerComponent } from './yaml-viewer/yaml-viewer.component';


const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventEditComponent },
  { path: 'yaml/:id', component: YamlViewerComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
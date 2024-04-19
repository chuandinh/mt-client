import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { EventsService } from '../services/events.service';
import { Event, Song, Media, Pdf } from '../models/event.model';

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

  eventTypes: Array<string> = ["Weekly Mass", "Wedding", "Funeral"];
  songTypes: Array<string> = ["Nhập Lễ", "Đáp Ca", "Alleluia", "Dâng Lễ", "Hiệp Lễ", "Kết Lễ"];
  mediaTypes: Array<string> = ["audio"];
  mediaParts: Array<string> = ["Be1", "Be2", "Sop", "Alto", "Tenor", "Bass", "All", "Be1Be2", "SopAlto", "SopTenor", "AltoTenor"];

  message = "";
  songIndex = -1;
  mediaIndex = -1;

  loading = false;

  constructor(private eventService: EventsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
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
        } else {
          this.event.date = this.getCurrentDate();
          this.event.time = "17:30";
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

  // create unique id base on date and time
  public getEventId(event: Event) : number {
    if(event.date == null) event.date = '';
    if(event.time == null) event.time = '';

    var id = `${event.date.replaceAll("/", "")}${event.time.replaceAll(":", "")}`;

    console.log("id: " + id);

    if(StringUtils.isInteger(id)) {
      return StringUtils.stringToInt(id);
    } else {
      var id = StringUtils.getCurrentDateTime();
      return StringUtils.stringToInt(id);
    }
  }  

  getCurrentDate(): string {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const day: number = currentDate.getDate();
    
    // Ensure that month and day are formatted with leading zeros if necessary
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();
    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    
    return `${year}/${formattedMonth}/${formattedDay}`;
  }


  cancel() {
    //this.router.navigate(["/"]);      
    this.location.back();
  }

  onSubmit() {
    this.loading = true;

    this.eventService.updateEvent(this.getEventId(this.event), this.event).subscribe({next: (data) => { 
        this.loading = false;
        this.message = "The event has been saved sucessfully."
      },
      error: (error) => {
        this.loading = false;
        this.message = "ERROR: " + error;
      }}
    );
  }

  addNewSong(reload: boolean = false) {
    let newSong = new Song();

    var sIndex = StringUtils.formatNumberWithDigits(this.event.songs.length + 1, 2);
    newSong.sId = StringUtils.combineNumbers(this.getEventId(this.event), sIndex);
    newSong.cId = StringUtils.combineNumbers(this.getEventId(this.event), sIndex);

    this.event.songs.push(newSong);
    this.songIndex = this.event.songs.length - 1;

    if (reload) {
      setTimeout(() => {
        this.songIndex = this.event.songs.length - 1;
      }, 100);
    }
  } 
 
  removeSong(index: number) {
    if (confirm("Are you sure to delete this song " + this.event.songs[index].cName)) {
      this.event.songs.splice(index, 1);
      this.songIndex = -1;
      this.mediaIndex = -1;
    }
  }

  setSongIndex(index: number) {
    this.songIndex = index;
    this.mediaIndex = -1;
  }

  closeSong(index: number) {
    if (this.songIndex == index) {
      this.songIndex = -1;
      this.mediaIndex = -1;
    }
  }

  closeMedia(index: number) {
    if (this.mediaIndex == index) { 
      this.mediaIndex = -1;
    }
  }

  nextSong() {
    this.songIndex++;
    this.mediaIndex = -1;
  }

  prevSong() {
    this.songIndex--;
    this.mediaIndex = -1;
  }

  addNewMedia(song: Song, reload: boolean = false) {
    let newMedia = new Media();

    // Set default media name as the song name
    newMedia.name = song.sName;
    newMedia.type = "audio";

    song.medias.push(newMedia);
    this.mediaIndex = song.medias.length - 1;

    if (reload) {
      setTimeout(() => {
        this.mediaIndex = song.medias.length - 1;
      }, 100);
    }
  }

  setMediaIndex(index: number) {
    this.mediaIndex = index;
  }

  nextMedia() {
    this.mediaIndex++;
  }

  prevMedia() {
    this.mediaIndex--;
  }

  removeMedia(song: Song, index: number) {
    if (confirm("Are you sure to delete this media " + song.medias[index].name)) {
      song.medias.splice(index, 1);
      this.mediaIndex = -1;
    }
  }

  // PDF File upload event  
  fileChange(eventId: number, song: Song, fileInput: any) {
    let filesToUpload = <Array<File>>fileInput.target.files;

    if (filesToUpload.length > 0) {
      let file: File = filesToUpload[0];

      console.log('fileName: ', file.name);
      console.log('size: ', file.size);

      if (file.name.slice(-3).toUpperCase() != "PDF") {
        alert('Please selecte PDF files only!');
        return;
      }

      // Upload file
      const formData = new FormData();
      formData.append('upload', file);
      this.http.post(`http://localhost:3000/files/upload/${this.eventId}`, formData).subscribe(
        () => {
          console.log('File uploaded successfully: ' + file.name);

          song.pdf.link = file.name;
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  // Mp3 file upload event  
  mediaFileChange(eventId: number, media: Media, fileInput: any) {
    let filesToUpload = <Array<File>>fileInput.target.files;

    if (filesToUpload.length > 0) {
      let file: File = filesToUpload[0];

      console.log('fileName: ', file.name);
      console.log('size: ', file.size);

      if (file.name.slice(-3).toUpperCase() != "MP3") {
        alert('Please selecte MP3 files only!');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size is over limit!');
        return;
      }    
      
      // Upload file
      const formData = new FormData();
      formData.append('upload', file);
      this.http.post(`http://localhost:3000/files/upload/${this.eventId}`, formData).subscribe(
        () => {
          console.log('File uploaded successfully: ' + file.name);

          media.link = file.name;
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );  
    }
  }  
}

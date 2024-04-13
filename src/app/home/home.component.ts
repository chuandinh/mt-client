// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  directories: any[] = [];
  selectedDirectory: any = "";
  directoryContents: any[] = [];
  selectedFile: File | any;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDirectories();
  }

  fetchDirectories() {
    this.http.get<any[]>('http://localhost:3000/files/directory').subscribe(
      directories => {
        this.directories = directories;
      },
      error => {
        console.error('Error fetching directories:', error);
      }
    );
  }

  fetchDirectoryContents(directory: string) {
    this.selectedDirectory = directory;
    this.http.get<any[]>(`http://localhost:3000/files/directory/${directory}`).subscribe(
      contents => {
        this.directoryContents = contents;
      },
      error => {
        console.error('Error fetching directory contents:', error);
      }
    );
  }

  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (!this.selectedDirectory || !this.selectedFile || this.selectedFile.length === 0) {
      return;
    }

    // Upload file
    const formData = new FormData();
    formData.append('upload', this.selectedFile);
    this.http.post(`http://localhost:3000/files/upload/${this.selectedDirectory}`, formData).subscribe(
      () => {
        console.log('File uploaded successfully');
        // Refresh directory contents after upload
        this.fetchDirectoryContents(this.selectedDirectory);
      },
      error => {
        console.error('Error uploading file:', error);
      }
    );
  }
}

// src/app/file-upload/file-upload.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | any;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    const formData = new FormData();
    formData.append('upload', this.selectedFile);

    this.http.post('http://localhost:3000/files/upload', formData).subscribe(
      () => {
        console.log('File uploaded successfully');
      },
      error => {
        console.error('Error uploading file:', error);
      }
    );
  }
}

// src/app/directory-list/directory-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent implements OnInit {
  directories: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDirectories();
  }

  fetchDirectories() {
    this.http.get<string[]>('http://localhost:3000/files/directory').subscribe(
      directories => {
        this.directories = directories;
      },
      error => {
        console.error('Error fetching directories:', error);
      }
    );
  }
}

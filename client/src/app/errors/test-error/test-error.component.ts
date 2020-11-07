import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  get404Error(){
    this.http.get(`${this.baseUrl}buggy/not-found`).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get400Error(){
    this.http.get(`${this.baseUrl}buggy/bad-request`).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get500Error(){
    this.http.get(`${this.baseUrl}buggy/server-error`).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get401Error(){
    this.http.get(`${this.baseUrl}buggy/auth`).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get400ValidationError(){
    this.http.post(`${this.baseUrl}account/register`,{ }).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
      this.validationErrors = err;
    });
  }
}

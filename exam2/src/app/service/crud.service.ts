import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

export class User {
  _id!: String;
  fname!: String;
  lname!: string
  age!: number;
  address!: String;
  career!: String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: String = 'http://localhost:8000/api';

  // HTTP header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //Add
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  //Get all obj
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}`)
  }

  //Get single obj
  GetUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/edit-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      )
  }

  //Update
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }

  //Delete
  deleteUser(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Handle client error
      errorMessage = error.error.message;
    } else {
      //Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


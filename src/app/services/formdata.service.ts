import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formdata, Id, Update } from '../model/Formdata';
import { Observable, Subject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FormdataService {
  public getCountSubject = new Subject<any>();
  formdatasUrl: string = 'https://my-json-server.typicode.com/mukeshg1/AngularApp/users';
  idUrl: string = 'https://my-json-server.typicode.com/mukeshg1/AngularApp/id';

  constructor(private http:HttpClient) { }

  //Get Formdata from server
  getFormdatas():Observable<Formdata[]> {
    return this.http.get<Formdata[]>(this.formdatasUrl);
  }

  getID():Observable<Id[]>{
    return this.http.get<Id[]>(this.idUrl); 
  }

  putID(ids: Id):Observable<Id[]>{
    return this.http.post<Id[]>(this.idUrl, ids, httpOptions);
  }

  //Edit 
  editTable(updatedatas: Formdata):Observable<any> {
    console.log("Edit..");
    const url =`${this.formdatasUrl}/${updatedatas.id}`;
    return this.http.put(url, updatedatas, httpOptions);
  }

  deleteTable(formdatas: Formdata):Observable<Formdata>{
    const url =`${this.formdatasUrl}/${formdatas.id}`;
    return this.http.delete<Formdata>(url, httpOptions);
    
  }

  //Add users
  addData(formdatas: Formdata):Observable<Formdata> {
    console.log("Added")
    return this.http.post<Formdata>(this.formdatasUrl, formdatas, httpOptions);
  }


  //Get Count
  getCount(count){
    this.getCountSubject.next(count);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Club} from "../models/club";
import {Player} from "../models/player";

const CLUB_API = 'http://localhost:8080/club/';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  getAllClubs() : Observable<any>{
    return this.http.get(CLUB_API+'all');
  }

  createClub(club :Club) : Observable<any>{
    return this.http.post(CLUB_API+'add',club);
  }

  updateClub(club: Club) : Observable<any>{
    return this.http.post(CLUB_API+'update',club);
  }

  getClubById(id:number) : Observable<any>{
    return this.http.get(CLUB_API+id);
  }

  deleteClub(id: number | undefined):Observable<any>{
    return this.http.post(CLUB_API+'delete/'+id,null);
  }
}

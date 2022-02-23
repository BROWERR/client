import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "../models/player";

const PLAYER_API = 'http://localhost:8080/player/';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getAllPlayers(id: number) : Observable<any>{
    return this.http.get(PLAYER_API+'all/'+id);
  }

  createPlayer(player: Player): Observable<any>{
    return this.http.post(PLAYER_API+'add',player);
  }

  updatePlayer(player: Player) : Observable<any>{
    return this.http.post(PLAYER_API+'update',player);
  }

  getPlayerById(id:number) : Observable<any>{
    return this.http.get(PLAYER_API+id);
  }

  deletePlayer(id: number | undefined):Observable<any>{
    return this.http.post(PLAYER_API+'delete/'+id,null);
  }
}

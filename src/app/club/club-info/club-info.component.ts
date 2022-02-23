import { Component, OnInit } from '@angular/core';
import {Club} from "../../models/club";
import {PlayerService} from "../../service/player.service";
import {ClubService} from "../../service/club.service";
import {Player} from "../../models/player";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  club!: Club;
  players!: Player[];
  constructor(private playerService: PlayerService,
              private clubService: ClubService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers(this.router.snapshot.params['id']).subscribe(data=>{
      this.players = data
    });
    this.clubService.getClubById(this.router.snapshot.params['id']).subscribe(data=> {
      this.club = data
    });
  }

  removePlayer(player:Player):void{
    const result = confirm('Do you really want to delete this player?');
    if (result) {
      this.playerService.deletePlayer(player.id).subscribe(() => {
        this.players.splice(<number>player.id, 1);
        this.ngOnInit();
      });
    }
  }
}

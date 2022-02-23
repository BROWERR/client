import { Component, OnInit } from '@angular/core';
import {Club} from "../../models/club";
import {ClubService} from "../../service/club.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user";
@Component({
  selector: 'app-list-clubs',
  templateUrl: './list-clubs.component.html',
  styleUrls: ['./list-clubs.component.css']
})
export class ListClubsComponent implements OnInit {
  clubs!:Club[];
  name!: string;
  user!: User;
  constructor(private clubService: ClubService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.clubService.getAllClubs().subscribe(data=>{
      this.clubs = data;
    });

  }

  removeClub(club: Club):void{
    const message = confirm('Do you really want to delete this club?')
    if(message){
      this.clubService.deleteClub(club.id).subscribe(()=>{
        this.clubs.splice(<number>club.id,1);
      });
      window.location.reload();
    }
  }

}

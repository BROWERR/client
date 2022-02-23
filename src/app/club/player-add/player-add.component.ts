import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubService} from "../../service/club.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Player} from "../../models/player";
import {PlayerService} from "../../service/player.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  addForm!:FormGroup;
  addPlayer!: Player;

  constructor(private fb : FormBuilder,
              private playerService: PlayerService,
              private router: ActivatedRoute,
              private snackbar: MatSnackBar,
              private location: Location) { }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
  }

  createAddForm():FormGroup{
    return this.fb.group({
      player_name:['',Validators.compose([Validators.required])],
      player_surname:['',Validators.compose([Validators.required])],
      player_games:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      player_goals:['',Validators.compose([Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      player_position:['',Validators.compose([Validators.required])],
    })
  }

  createPlayer(): void{
    this.playerService.createPlayer({
      player_name:this.addForm.value.player_name,
      player_surname:this.addForm.value.player_surname,
      player_games:this.addForm.value.player_games,
      player_goals:this.addForm.value.player_goals,
      player_position:this.addForm.value.player_position,
      club_id:this.router.snapshot.params['id']
    }).subscribe(data=>{
      this.addPlayer=data;
    })
    this.snackbar.open('Player successfully added!','Okay',{
      duration: 2500
    });
    this.addForm.reset();
  }



  back():void{
    this.location.back();
  }
}

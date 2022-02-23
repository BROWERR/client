import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClubService} from "../../service/club.service";
import {Club} from "../../models/club";

@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.css']
})
export class ClubAddComponent implements OnInit {
  addForm!:FormGroup;
  addClub!: Club;
  constructor(private fb : FormBuilder,
              private clubService: ClubService,
              private router: Router,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
  }

  createAddForm():FormGroup{
    return this.fb.group({
        club_name:['',Validators.compose([Validators.required])],
        club_games:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
        club_goals:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
        club_points:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])]
    })
  }

  createClub(): void{
    this.clubService.createClub({
      club_name:this.addForm.value.club_name,
      club_games:this.addForm.value.club_games,
      club_goals:this.addForm.value.club_goals,
      club_points:this.addForm.value.club_points,
    }).subscribe(data=>{
      this.addClub=data;
    })
    this.snackbar.open('The club was successfully added!','Okay',{
      duration: 2000
    });
    this.addForm.reset();
  }
}

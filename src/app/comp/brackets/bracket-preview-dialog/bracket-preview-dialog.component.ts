//General
import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//Models
//Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
//router
import { ActivatedRoute, Router } from '@angular/router';
import { TeamUnit } from '../../../models/teamsModels';

@Component({
  selector: 'app-bracket-preview-dialog',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,],
  templateUrl: './bracket-preview-dialog.component.html',
  styleUrl: './bracket-preview-dialog.component.scss'
})
export class BracketPreviewDialogComponent {
  corpName = 'BracketPreviewDialogComponent';
  /*$user!: UserM;
  $admin!:boolean;
  $developer:boolean;*/

  minGamesPerTeam: number = 0;
  totalGames: number = 0;
  pollTentative: number = 1;
  typeViewCreate: string = 'Create Bracket';

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<BracketPreviewDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      publicId: string;
      title: string;
      description: string;
      divisions: string;
      registeredTeams: TeamUnit[];
      event: any;
    }
  ) {
    /*authServ.reloadActiveUser(this.corpName);*/
    this.calculateGames();
  }

  validateAndCalculateGames() {
    if (
      this.pollTentative < 1 ||
      this.pollTentative > 99 ||
      isNaN(this.pollTentative)
    ) {
      this.pollTentative = 1;
      return;
    }
    this.calculateGames();
  }

  calculateGames() {
    if (this.data.title == 'Round Robin') {
      this.minGamesPerTeam = this.data.registeredTeams.length - 1;
      this.totalGames =
        (this.data.registeredTeams.length *
          (this.data.registeredTeams.length - 1)) /
        2;
    }
    if (this.data.title == 'Pool Games') {
      this.minGamesPerTeam = this.data.registeredTeams.length - 1;
      this.totalGames =
        this.pollTentative *
        ((this.data.registeredTeams.length *
          (this.data.registeredTeams.length - 1)) /
          2);
    }
    if (this.data.title == 'Single Elimination') {
      this.minGamesPerTeam = 1;
      this.totalGames = this.data.registeredTeams.length - 1;
    }
    if (this.data.title == 'Pool + Single Elimination') {
      this.minGamesPerTeam =
        1 + (this.data.registeredTeams.length - 1) * this.pollTentative;
      this.totalGames =
        this.pollTentative *
        ((this.data.registeredTeams.length *
          (this.data.registeredTeams.length - 1)) /
          2) +
        (this.data.registeredTeams.length - this.pollTentative);
    }
    if (this.data.title == 'Pool + Double Elimination') {
      this.minGamesPerTeam =
        2 + (this.data.registeredTeams.length - 1) * this.pollTentative;
      this.totalGames =
        this.pollTentative *
        ((this.data.registeredTeams.length *
          (this.data.registeredTeams.length - 1)) /
          2) +
        (2 * (this.data.registeredTeams.length - this.pollTentative) - 1);
    }
  }

  openCreateBracket() { }
  openPoolEdit() {
    console.log('Datos antes de enviar:', this.data);

    this.dialogRef.close();
    this.router.navigate([`poolEditor/${this.data.publicId}`]);
    /* 
        this.router.navigate(['../second-compon'], {
          state: { eventData: JSON.parse(JSON.stringify(this.data)) },
        }); */
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}

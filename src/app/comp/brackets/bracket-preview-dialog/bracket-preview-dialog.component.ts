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
import { BracketsService } from '../../../serv/brackets.service';
import { AuthService } from '../../../serv/auth.service';

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
  compName = 'BracketPreviewDialogComponent';
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
    private bracketServ: BracketsService,
    private authServ: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      publicId: string;
      title: string;
      description: string;
      divisions: string;
      registeredTeams: TeamUnit[];
      pollsSelectedCount: number;
      event: any;
    }
  ) {
    this.authServ.reloadActiveUser(this.compName);
    this.bracketServ.reloadData();
    this.bracketServ.dataLoad.eventPublicId = String(
      this.activatedRoute.snapshot.paramMap.get('publicId')
    );
    this.calculateGames();
  }
  onPollTentativeChange() {
    if (this.pollTentative < 1) {
      this.pollTentative = 1;
    } else if (this.pollTentative > 20) {
      this.pollTentative = 20;
    }

    this.calculateGames();
  }
  calculateGames() {
    let teams = this.data.registeredTeams.length;
    let pools = this.pollTentative;

    if (pools > teams / 2) {
      alert('Number of pools not allowed');
      return;
    }
    if (this.data.title == 'Round Robin') {
      this.minGamesPerTeam = teams - 1;
      this.totalGames = (teams * (teams - 1)) / 2;
    }
    if (this.data.title == 'Pool Games') {
      let baseSize = Math.floor(teams / pools);
      let extraTeams = teams % pools;
      let totalGames = 0;

      for (let i = 0; i < pools; i++) {
        let poolSize = baseSize + (i < extraTeams ? 1 : 0);
        totalGames += (poolSize * (poolSize - 1)) / 2;
      }

      this.totalGames = totalGames;
      this.minGamesPerTeam = baseSize - 1;
    }
    if (this.data.title == 'Single Elimination') {
      this.minGamesPerTeam = 1;
      this.totalGames = teams - 1;
    }
    if (this.data.title == 'Pool + Single Elimination') {
      this.minGamesPerTeam = 1 + (teams - 1) * pools;
      this.totalGames = pools * ((teams * (teams - 1)) / 2) + (teams - pools);
    }
    if (this.data.title == 'Pool + Double Elimination') {
      this.minGamesPerTeam = 2 + (teams - 1) * pools;
      this.totalGames =
        pools * ((teams * (teams - 1)) / 2) + (2 * (teams - pools) - 1);
    }
  }

  openCreateBracket() { }

  openPoolEdit() {
    if (
      this.pollTentative === 0 ||
      this.pollTentative > this.data.registeredTeams.length / 2
    ) {
      alert('Number of pools not allowed');
      return;
    }
    //load data.
    this.bracketServ.dataLoad.poolsSelectedCount = this.pollTentative;
    this.bracketServ.dataLoad.eventPublicId = this.data.title;

    console.log('Datos antes de enviar:', this.bracketServ.dataLoad);
    console.log('Array', this.data.registeredTeams);

    const registeredTeams = this.data.registeredTeams;
    const publicId = this.data.publicId;

    this.dialogRef.close();

    sessionStorage.setItem(
      'registeredTeams',
      JSON.stringify({
        registeredTeams: registeredTeams,
        pollTentative: this.pollTentative,
      })
    );

    this.router.navigate([`poolEditor/${publicId}`], {
      state: { registeredTeams },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

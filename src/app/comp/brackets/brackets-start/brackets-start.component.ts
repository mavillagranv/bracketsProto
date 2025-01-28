//General
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//Service
import { BracketService, } from '../../../serv/bracket.service';
//Components
import { BContactTeamsDialogComponent } from '../b-contact-teams-dialog/b-contact-teams-dialog.component';
//Models
import { EventModel } from '../../models/eventModel';
import { TeamUnit } from '../../models/teamModels';
//Material
import { MatDialog, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-brackets-start',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './brackets-start.component.html',
  styleUrl: './brackets-start.component.scss'
})
export class BracketsStartComponent {
  $intrestedTeams!: TeamUnit[];
  SUB$intrestedTeams = this.bracketServ.$intrestedTeams.subscribe((data: TeamUnit[]) => this.$intrestedTeams = data);
  $registeredTeams!: TeamUnit[];
  SUB$registeredTeams = this.bracketServ.$registeredTeams.subscribe(data => this.$registeredTeams = data);
  $event!: EventModel;
  SUB$event = this.bracketServ.$event.subscribe(data => this.$event = data);

  readonly dialog = inject(MatDialog);

  constructor(private bracketServ: BracketService) {
    this.bracketServ.loadTeamUnits()
  }
  openDialog(data: TeamUnit) {
    this.dialog.open(BContactTeamsDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: data
    });
  }

  //Forms
  selectedDivision: string = '';
  onSelectionChange(value: string) {
    console.log('Selected Division:', value);
  }
}

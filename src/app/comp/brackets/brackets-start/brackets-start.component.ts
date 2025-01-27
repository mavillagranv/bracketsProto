import { Component, inject } from '@angular/core';
import { BracketService, TeamUnitModel } from '../../../serv/bracket.service';
import { MatDialog, } from '@angular/material/dialog';
import { BContactTeamsDialogComponent } from '../b-contact-teams-dialog/b-contact-teams-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-brackets-start',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './brackets-start.component.html',
  styleUrl: './brackets-start.component.scss'
})
export class BracketsStartComponent {
  $intrestedTeams!: TeamUnitModel[];
  SUB$intrestedTeams = this.bracketServ.$intrestedTeams.subscribe(data => this.$intrestedTeams = data)
  $registeredTeams!: TeamUnitModel[];
  SUB$registeredTeams = this.bracketServ.$registeredTeams.subscribe(data => this.$registeredTeams = data)
  readonly dialog = inject(MatDialog);

  constructor(private bracketServ: BracketService) {
    this.bracketServ.loadTeamUnits()

  }
  openDialog(data: TeamUnitModel) {
    this.dialog.open(BContactTeamsDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: data
    });

  }
}

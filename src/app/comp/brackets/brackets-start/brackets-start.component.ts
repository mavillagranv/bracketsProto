//General
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserImagePipe } from '../../../userImage.pipe';

//Service
import { AuthService } from '../../../serv/auth.service';
import { BracketsService } from '../../../serv/brackets.service';
//Components
import { BContactTeamsDialogComponent } from '../b-contact-teams-dialog/b-contact-teams-dialog.component';
import { BracketPreviewDialogComponent } from '../bracket-preview-dialog/bracket-preview-dialog.component';
//Models
import { TeamUnit } from '../../../models/teamsModels';
import { EventModel } from '../../../models/eventsModel';
import { UserM } from '../../../models/userModels';
//Material
import { MatDialog, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-brackets-start',
  standalone: true,
  imports: [
    UserImagePipe,
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
export class BracketsStartComponent implements OnDestroy, OnInit {
  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                           Miguel's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */
  compName: string = 'BracketsStartComponent';
  eventPublicId!: string;
  $intrestedTeamUnits: TeamUnit[] = [];
  SUB$intrestedTeamUnits = this.bracketServ.$intrestedTeamUnits.subscribe((data: TeamUnit[]) => this.$intrestedTeamUnits = data);

  $registeredTeamUnits: TeamUnit[] = [];
  SUB$registeredTeamUnits = this.bracketServ.$registeredTeamUnits.subscribe(data => this.$registeredTeamUnits = data);

  $event!: EventModel;
  SUB$event = this.bracketServ.$event.subscribe(data => {
    this.$event = data
    console.log(this.$event)
  });
  $user!: UserM;
  SUB$user = this.authServ.$user.subscribe(data => {
    this.$user = data;
  })

  constructor(
    private bracketServ: BracketsService,
    private authServ: AuthService,
    private route: ActivatedRoute) {
    this.authServ.reloadActiveUser(this.compName);
    this.bracketServ.reloadData();
    this.bracketServ.dataLoad.eventPublicId = String(this.route.snapshot.paramMap.get('publicId'))
  }
  ngOnDestroy(): void {
    this.SUB$event.unsubscribe();
    this.SUB$intrestedTeamUnits.unsubscribe();
    this.SUB$registeredTeamUnits.unsubscribe();
  }
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadEventData()
  }
  loadEventData(): void {
    this.bracketServ.loadEvent(this.eventPublicId);
  }

  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                          Samuels's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */



  openDialog(data: TeamUnit[]) {
    this.dialog.open(BContactTeamsDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: data,
    });
  }

  openPreviewDialog(event: Event, registeredTeams: TeamUnit[]): void {
    if (this.selectedDivision == '') {
      alert('You have not selected a division');
      return;
    }
    const cardElement = (event.currentTarget as HTMLElement).closest(
      'mat-card'
    );
    const titleElement = cardElement?.querySelector('mat-card-title');
    const title = titleElement
      ? titleElement.textContent?.trim()
      : 'Unknown Title';
    const descriptionElement = cardElement?.querySelector('mat-card-subtitle');
    const description = descriptionElement
      ? descriptionElement.textContent?.trim()
      : 'Unknown description';

    this.dialog.open(BracketPreviewDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: {
        publicId: String(this.route.snapshot.paramMap.get('publicId')),
        title,
        description,
        registeredTeams,
        divisions: this.selectedDivision,
        event: this.$event,
      },
    });
  }
  //Forms
  selectedDivision: string = '';
  onSelectionChange(value: string) {
    this.bracketServ.dataLoad.selectedEventDivision = this.selectedDivision;
    console.log('Selected Division:', value);
  }
}

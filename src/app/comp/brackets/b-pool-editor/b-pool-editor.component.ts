//General
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//Service
//Components
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
import { UserM } from '../../../models/userModels';
import { AuthService } from '../../../serv/auth.service';
import { BracketsService } from '../../../serv/brackets.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameModel } from '../../../models/eventsModel';

//General
// Material & DragDrop
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamLogoPipe } from '../../../team-logo.pipe';
// Router & Services

@Component({
  selector: 'app-b-pool-editor',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    DragDropModule,
    MatSlideToggleModule,
    MatTooltipModule,
    TeamLogoPipe
  ],
  templateUrl: './b-pool-editor.component.html',
  styleUrl: './b-pool-editor.component.scss'
})
export class BPoolEditorComponent {
  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                           Miguel's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */
  compName = 'BPoolEditorComponent';
  $user!: UserM;
  SUB$user = this.authServ.$user.subscribe(data => {
    this.$user = data;
  })
  publicId: string = '';

  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                          Samuels's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */
  //forms
  registeredTeams: any[] = [];
  selectedEventDivision: string = '';
  poolsSelectedCount: number = 0;
  eventPublicId: string = '';
  eventData: any = {};
  hoveredTeam: any = null;
  hoverPosition = { x: 0, y: 0 };
  poolsMatrix: any[][] = [];
  lockedPools: boolean[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authServ: AuthService,
    private route: ActivatedRoute,
    public bracketServ: BracketsService
  ) {
    this.authServ.reloadActiveUser(this.compName);
    this.bracketServ.reloadData();
    this.bracketServ.dataLoad.eventPublicId = String(
      this.activatedRoute.snapshot.paramMap.get('publicId')
    );
    this.publicId = String(this.route.snapshot.paramMap.get('publicId'));
  }
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.bracketServ.dataLoad;

    if (
      navigation?.extras.state &&
      'registeredTeams' in navigation.extras.state
    ) {
      this.registeredTeams = navigation.extras.state['registeredTeams'];
    } else {
      const storedTeams = sessionStorage.getItem('registeredTeams');
      if (storedTeams) {
        const parsedData = JSON.parse(storedTeams);
        this.registeredTeams = parsedData.registeredTeams || [];
        this.poolsSelectedCount = parsedData.pollTentative || 1;
      } else {
        this.registeredTeams = [];
        this.poolsSelectedCount = 1;
      }
    }

    /*console.log(
      'Datos recibidos en nueva vista:',
      this.bracketServ.dataLoad
    );*/
    if (this.bracketServ.dataLoad) {
      this.eventData = this.bracketServ.dataLoad['$event'] || {};
      this.selectedEventDivision =
        this.bracketServ.dataLoad['selectedEventDivision'] || '';
      /* this.poolsSelectedCount =
        this.bracketServ.dataLoad['poolsSelectedCount'] || 0;*/
      this.eventPublicId = this.bracketServ.dataLoad['eventPublicId'] || '';

      this.poolsMatrix = Array.from(
        { length: this.poolsSelectedCount },
        () => []
      );
    } else {
      console.error('Error: No se encontró dataLoad en bracketServ');
    }
    //console.log(this.registeredTeams[0]);
    this.initializePools();
  }

  initializePools() {
    this.poolsMatrix = Array.from(
      { length: this.poolsSelectedCount },
      () => []
    );
    this.lockedPools = Array(this.poolsSelectedCount + 1).fill(false);
    console.log(this.poolsMatrix);
    console.log(this.lockedPools);
    this.distributeTeams();
  }

  distributeTeams() {
    if (!this.registeredTeams.length) {
      return;
    }
    let indexTeams = 0;
    let indexPools = 0;

    while (indexTeams < this.registeredTeams.length) {
      if ((this.registeredTeams[indexTeams].teamId = 'team0')) {
        this.registeredTeams[indexTeams].teamId = //simulate diferent team id.
          'team' + this.getRandomNumber(0, 20);
        this.registeredTeams[indexTeams].teamUnitCoach.userId =
          'Coach' + this.getRandomNumber(0, 20); //simulate diferent team id.
      }
      this.poolsMatrix[indexPools].push(this.registeredTeams[indexTeams]);
      indexTeams++;
      indexPools++;
      if (indexPools === this.poolsMatrix.length) {
        indexPools = 0;
      }
    }
    this.lockedPools = this.poolsMatrix.map(
      (_, i) => this.lockedPools[i] || false
    );

    this.poolsMatrix.push([]);
  }
  //simulate diferent team id.
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  togglePoolLock(index: number): void {
    this.lockedPools[index] = !this.lockedPools[index];
    console.log(this.lockedPools[index] + ' ' + index);
    if (this.lockedPools[index]) {
      const poolMatrixJson: string = JSON.stringify(this.poolsMatrix[index]); //Save pools matrix with teams
      const generatedGames = this.generateGamesForPool(this.poolsMatrix[index]); //Save pool with gameModel
      /* console.log(poolMatrixJson); //pools saved
      console.log(generatedGames); //game saved*/
      alert('Pool ' + (index + 1) + ' Saved');
    }
  }
  drop(event: CdkDragDrop<any[]>, index: number) {
    const previousId = event.previousContainer.id || 'undefined';
    const currentId = event.container.id || 'undefined';
    const previosValue = parseInt(previousId.split('-').pop()!, 10) || -1;
    const currentValue = parseInt(currentId.split('-').pop()!, 10) || -1;
    console.log(previosValue + '----Origin');
    console.log(currentValue + '----Destiny');
    console.log(this.lockedPools[index]);
    if (this.lockedPools[index]) {
      alert(
        'The pool: ' + currentValue + " is locked; you can't drop a card in it."
      );
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  savePools() {
    const hasEmptyPool = this.poolsMatrix
      .slice(0, this.poolsMatrix.length - 1)
      .some((pool) => pool.length === 0);

    if (hasEmptyPool) {
      alert('Warning, There is still empty pool');
      return;
    } else {
      alert('All pool saved');
      const poolMatrixJson: string = JSON.stringify(this.poolsMatrix); //Save pools matrix with teams
      //console.log(poolMatrixJson); //pools saved

      /*this.router.navigate(['/bracket-editor'], {
      state: { poolsMatrix: this.poolsMatrix },
    });*/
    }
  }

  publishPools() {
    const hasEmptyPool = this.poolsMatrix
      .slice(0, this.poolsMatrix.length - 1)
      .some((pool, i) => pool.length === 0 && !this.lockedPools[i]);

    if (hasEmptyPool) {
      alert('⚠️ Warning, There is still an empty pool.');
      return;
    }

    const unlockedPools = this.poolsMatrix
      .slice(0, this.poolsMatrix.length - 1)
      .filter((_, i) => !this.lockedPools[i]);

    if (unlockedPools.length === 0) {
      alert('⚠️ No unlocked pools available to publish.');
      return;
    }

    const poolMatrixJson: string = JSON.stringify(unlockedPools);

    const generatedGames = unlockedPools.flatMap((pool) =>
      this.generateGamesForPool(pool)
    );

    this.lockedPools = this.lockedPools.map((locked, i) =>
      this.poolsMatrix[i]
        ? locked || unlockedPools.includes(this.poolsMatrix[i])
        : false
    );

    alert('✅ Published games.');
  }

  generateGameMatrix(): GameModel[] {
    const gameMatrix: GameModel[] = [];

    for (let index = 0; index < this.poolsMatrix.length; index++) {
      const row = this.poolsMatrix[index];

      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          const team1 = row[i];
          const team2 = row[j];

          const getParticipants = (team: any) =>
            [
              ...(team.participantIds || []),
              ...(team.teamUnitPlayers?.map((p: any) => p.userId) || []),
              ...(team.teamUnitManagers?.map((m: any) => m.userId) || []),
              team.teamUnitCoach?.userId,
            ].filter(Boolean);

          const game: GameModel = {
            gameId: `${team1.teamId}_vs_${team2.teamId}`,
            scheduled: true,
            active: true,
            participants: [
              ...new Set([
                ...getParticipants(team1),
                ...getParticipants(team2),
              ]),
            ],

            dateStart: new Date(),
            dateEnd: new Date(),

            teamUnit1: {
              teamId: team1.teamId,
              teamName: team1.teamName,
              ownerId: team1.ownerId || 'placeholder_owner',
              teamLogoUrl: team1.teamLogoUrl || 'placeholder_logo.png',
              teamAbbreviation: team1.teamAbbreviation || 'T0',
              teamUnitId: team1.teamUnitId || 'placeholder_unit',
              teamUnitName: team1.teamUnitName || 'Placeholder Unit',
              teamUnitManagersIds: team1.teamUnitManagersIds || [],
              teamUnitFlavor: team1.teamUnitFlavor || 'default',
              divisionCode: team1.divisionCode || 'D0',
              teamUnitManagers: [],
              teamUnitPlayers: [],
            },

            teamUnit2: {
              teamId: team2.teamId,
              teamName: team2.teamName,
              ownerId: team2.ownerId || 'placeholder_owner',
              teamLogoUrl: team2.teamLogoUrl || 'placeholder_logo.png',
              teamAbbreviation: team2.teamAbbreviation || 'T0',
              teamUnitId: team2.teamUnitId || 'placeholder_unit',
              teamUnitName: team2.teamUnitName || 'Placeholder Unit',
              teamUnitManagersIds: team2.teamUnitManagersIds || [],
              teamUnitFlavor: team2.teamUnitFlavor || 'default',
              divisionCode: team2.divisionCode || 'D0',
              teamUnitManagers: [],
              teamUnitPlayers: [],
            },

            venue: {
              venueId: 'IdVenue',
              venueName: 'IdVenue',
              venueAddress: 'IdVenue',
              ZIPCode: 'IdVenue',
              venueCity: 'IdVenue',
              venueState: 'IdVenue',
              venueStateAbb: 'IdVenue',
              venuePhoto: 'IdVenue',
            },

            eventName: 'Generated Event',
            eventId: 'event_placeholder',
            refereeId: 'placeholder_referee',
            homeAway: true,
          };

          gameMatrix.push(game);
        }
      }
    }

    return gameMatrix;
  }

  generateGamesForPool(pool: any[]): GameModel[] {
    const gameMatrix: GameModel[] = [];

    if (pool.length < 2) {
      return gameMatrix;
    }

    for (let i = 0; i < pool.length; i++) {
      for (let j = i + 1; j < pool.length; j++) {
        const team1 = pool[i];
        const team2 = pool[j];

        const getParticipants = (team: any) =>
          [
            ...(team.participantIds || []),
            ...(team.teamUnitPlayers?.map((p: any) => p.userId) || []),
            ...(team.teamUnitManagers?.map((m: any) => m.userId) || []),
            team.teamUnitCoach?.userId,
          ].filter(Boolean);

        const game: GameModel = {
          gameId: `${team1.teamId}_vs_${team2.teamId}`,
          scheduled: true,
          active: true,
          participants: [
            ...new Set([...getParticipants(team1), ...getParticipants(team2)]),
          ],

          dateStart: new Date(),
          dateEnd: new Date(),

          teamUnit1: {
            teamId: team1.teamId,
            teamName: team1.teamName,
            ownerId: team1.ownerId || 'placeholder_owner',
            teamLogoUrl: team1.teamLogoUrl || 'placeholder_logo.png',
            teamAbbreviation: team1.teamAbbreviation || 'T0',
            teamUnitId: team1.teamUnitId || 'placeholder_unit',
            teamUnitName: team1.teamUnitName || 'Placeholder Unit',
            teamUnitManagersIds: team1.teamUnitManagersIds || [],
            teamUnitFlavor: team1.teamUnitFlavor || 'default',
            divisionCode: team1.divisionCode || 'D0',
            teamUnitManagers: [],
            teamUnitPlayers: [],
          },

          teamUnit2: {
            teamId: team2.teamId,
            teamName: team2.teamName,
            ownerId: team2.ownerId || 'placeholder_owner',
            teamLogoUrl: team2.teamLogoUrl || 'placeholder_logo.png',
            teamAbbreviation: team2.teamAbbreviation || 'T0',
            teamUnitId: team2.teamUnitId || 'placeholder_unit',
            teamUnitName: team2.teamUnitName || 'Placeholder Unit',
            teamUnitManagersIds: team2.teamUnitManagersIds || [],
            teamUnitFlavor: team2.teamUnitFlavor || 'default',
            divisionCode: team2.divisionCode || 'D0',
            teamUnitManagers: [],
            teamUnitPlayers: [],
          },

          venue: {
            venueId: 'IdVenue',
            venueName: 'IdVenue',
            venueAddress: 'IdVenue',
            ZIPCode: 'IdVenue',
            venueCity: 'IdVenue',
            venueState: 'IdVenue',
            venueStateAbb: 'IdVenue',
            venuePhoto: 'IdVenue',
          },

          eventName: 'Generated Event',
          eventId: 'event_placeholder',
          refereeId: 'placeholder_referee',
          homeAway: true,
        };

        gameMatrix.push(game);
      }
    }

    return gameMatrix;
  }

  resetPools() {
    const unlockedPools: any[][] = [];
    const updatedLockedPools: boolean[] = [];

    for (let i = 0; i < this.poolsMatrix.length - 1; i++) {
      if (this.lockedPools[i]) {
        unlockedPools.push(this.poolsMatrix[i]);
        updatedLockedPools.push(true);
      }
    }
    this.poolsMatrix = [...unlockedPools];
    this.lockedPools = [...updatedLockedPools];

    this.initializePools();
  }

  deletePool(index: number): void {
    if (this.poolsMatrix.length <= 2) {
      alert('⚠️ You must have at least one pool.');
      return;
    }

    // Si la pool NO está bloqueada, mueve sus equipos al storage antes de eliminarla
    if (!this.lockedPools[index] && this.poolsMatrix[index].length > 0) {
      this.poolsMatrix[this.poolsMatrix.length - 1].push(
        ...this.poolsMatrix[index]
      );
    }

    // Eliminar la pool y su estado en lockedPools
    this.poolsMatrix.splice(index, 1);
    this.lockedPools.splice(index, 1);

    console.log('✅ Pool eliminada correctamente.');
  }

  createPool() {
    if (this.poolsMatrix.length > this.registeredTeams.length / 2) {
      alert(
        'Not possible to create more pools (MAX: ' +
        this.registeredTeams.length / 2 +
        ')'
      );
      return;
    }
    this.poolsMatrix.splice(this.poolsMatrix.length - 1, 0, []);
    this.lockedPools.splice(this.poolsMatrix.length - 2, 0, false);
  }

  dropsPools(): void {
    if (this.poolsMatrix.length <= 1) {
      alert('❌ No hay suficientes pools para dropear.');
      return;
    }

    let teamsToMove: any[] = [];

    for (let i = 0; i < this.poolsMatrix.length - 1; i++) {
      if (!this.lockedPools[i]) {
        teamsToMove.push(...this.poolsMatrix[i]);
        this.poolsMatrix[i] = [];
      }
    }
    this.poolsMatrix = this.poolsMatrix.map((pool, index) =>
      this.lockedPools[index] ? pool : pool.length > 0 ? pool : []
    );
    if (
      this.poolsMatrix.length === 0 ||
      (this.poolsMatrix.length === 1 && this.poolsMatrix[0].length > 0)
    ) {
      this.poolsMatrix.unshift([]);
    }
    this.poolsMatrix[this.poolsMatrix.length - 1].push(...teamsToMove);
  }

  openNote(team: any, event?: MouseEvent): void {
    if (!team) return;
    this.hoveredTeam = team;

    if (event) {
      this.hoverPosition = { x: event.clientX + 10, y: event.clientY + 10 };
    }
  }

  hideTeamInfo(): void {
    this.hoveredTeam = null;
  }
  //Border colors
  getColorFromTeamId(teamId: string): string {
    let findMoreTwo = 0;
    for (let rowIndex = 0; rowIndex < this.poolsMatrix.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.poolsMatrix[rowIndex].length;
        colIndex++
      ) {
        const teamID = this.poolsMatrix[rowIndex][colIndex];
        if (teamID.teamId === teamId) {
          findMoreTwo++;
          if (findMoreTwo > 1) {
            let hash = 0;
            for (let i = 0; i < teamId.length; i++) {
              hash = teamId.charCodeAt(i) + ((hash << 5) - hash);
            }
            const hue = (Math.abs(hash) * 31) % 360;
            return `4px solid hsl(${hue}, 70%, 50%)`;
          }
        }
      }
    }

    return `5px solid hsl(black), 70%, 50%)`;
  }

  getColorFromCoach(coachId: string | undefined): string {
    if (!coachId) return '#000';

    let findMoreTwo = 0;
    for (let rowIndex = 0; rowIndex < this.poolsMatrix.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.poolsMatrix[rowIndex].length;
        colIndex++
      ) {
        const team = this.poolsMatrix[rowIndex][colIndex];
        if (team.teamUnitCoach?.userId === coachId) {
          findMoreTwo++;
          if (findMoreTwo > 1) {
            let hash = 0;
            for (let i = 0; i < coachId.length; i++) {
              hash = coachId.charCodeAt(i) + ((hash << 5) - hash);
            }
            const hue = (Math.abs(hash) * 31) % 360;
            return `hsl(${hue}, 70%, 50%)`;
          }
        }
      }
    }
    return '#000';
  }
}
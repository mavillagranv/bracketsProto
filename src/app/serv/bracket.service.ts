import { EventEmitter, Injectable } from '@angular/core';

export interface TeamUnitModel {
  teamId: string;
  teamName: string;
  teamUnitName: string;
}
@Injectable({
  providedIn: 'root'
})
export class BracketService {
  $registeredTeams = new EventEmitter<TeamUnitModel[]>();
  $intrestedTeams = new EventEmitter<TeamUnitModel[]>()
  last$intrestedTeams: TeamUnitModel[] = [{
    teamName: 'Mikes team',
    teamId: '1234',
    teamUnitName: 'Varsity'
  }]
  last$registeredTeams: TeamUnitModel[] = [{
    teamName: 'Mikes team',
    teamId: '1234',
    teamUnitName: 'Varsity'
  }]
  constructor() { }
  loadTeamUnits() {
    this.$registeredTeams.emit(this.last$registeredTeams);
    this.$intrestedTeams.emit(this.last$intrestedTeams);
  }
}

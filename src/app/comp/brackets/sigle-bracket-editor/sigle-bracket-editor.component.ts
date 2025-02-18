import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TeamUnit } from '../../../models/teamsModels';
import { BracketsService } from '../../../serv/brackets.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamLogoPipe } from '../../../team-logo.pipe';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sigle-bracket-editor',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    TeamLogoPipe,
    MatIconModule,
    CdkDrag],
  templateUrl: './sigle-bracket-editor.component.html',
  styleUrl: './sigle-bracket-editor.component.scss'
})
export class SigleBracketEditorComponent implements OnInit {
  //╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  //┇                        Miguel's logic                           ┇
  //╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛

  //╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  //┇                            Injectors                            ┇
  //╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  private bracketServ = inject(BracketsService);
  private route = inject(ActivatedRoute);
  //╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  //┇                       General variables & s                     ┇
  //╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  $registeredTeamUnits: TeamUnit[] = [];
  SUB$registeredTeamUnits = this.bracketServ.$registeredTeamUnits.subscribe(data => {
    this.$registeredTeamUnits = data;
    this.unassignedUnits = data;

  });
  constructor() {
    this.bracketServ.reloadData();
    this.bracketServ.dataLoad.eventPublicId = String(this.route.snapshot.paramMap.get('publicId'))
  }
  ngOnInit(): void {
    this.loadEventData()
  }
  eventPublicId!: string;

  loadEventData(): void {
    this.bracketServ.loadEvent(this.eventPublicId);
  }
  //╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  //┇                        Drag and Drop                            ┇
  //╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  unassignedUnits: TeamUnit[] = [];
  bracketOrder: TeamUnit[] = [];

  drop(event: CdkDragDrop<TeamUnit[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  //╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  //┇                        Edgars's logic                           ┇
  //╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  returnImage(teamUnitId: string): string {
    let index = this.$registeredTeamUnits.findIndex((x: TeamUnit) => x.teamUnitId == teamUnitId)
    let toReturn = 0
    let finish = false;
    let minus = 0;

    while (finish) {

      switch (index - minus) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5: {
          finish = true;
          toReturn = index - minus;;
          break;
        }
        default: {
          minus -= 6;
          break;
        }
      }
    }
    return `url("/assets/backgrounds/galaxy${toReturn}.jpeg")`
  }
}

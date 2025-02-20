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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sigle-bracket-editor',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    TeamLogoPipe,
    MatIconModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,
    CdkDrag],
  templateUrl: './sigle-bracket-editor.component.html',
  styleUrl: './sigle-bracket-editor.component.scss'
})
export class SigleBracketEditorComponent implements OnInit {
  //╒    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╕
  //┇                        Miguel's logic                           ┇
  //╘    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╛

  //╒    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╕
  //┇                            Injectors                            ┇
  //╘    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╛
  private bracketServ = inject(BracketsService);
  private route = inject(ActivatedRoute);
  //╒    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╕
  //┇                       General variables & s                     ┇
  //╘    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╛
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
    this.assignBackgrounds();

  }
  eventPublicId!: string;

  loadEventData(): void {
    this.bracketServ.loadEvent(this.eventPublicId);
  }
  //╒┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅╕
  //┇                        Bracket render                         ┇
  //╘┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅╛
  bracketSize = 2;
  bracketConts: any = [];
  newArray(length: number): number[] {
    return Array.from({ length: length }, (_, i) => i + 1)
  }
  changeBrackets(event: any) {
    this.bracketConts = [];
    let totalTeams = this.$registeredTeamUnits.length;
    let teamsPerGroup = event.target.value;

    let groups = totalTeams / teamsPerGroup;


    switch (teamsPerGroup) {
      case "2": {
        this.checkFor2(totalTeams)
        break;
      }
      case "3": {
        this.checkFor3(this.$registeredTeamUnits.length)
        break;
      }
      case "4": {
        this.checkFor4(6)//this.$registeredTeamUnits.length)
        break;
      }
    }
  }
  checkFor4(teamNumb: number) {
    let rem = teamNumb % 4;
    let groups = Math.floor(teamNumb / 4);
    let newNum = teamNumb - (groups * 4);
    console.log(0 / 4);
    console.log(0 % 4);
    if ((Math.floor(teamNumb / 4)) != 0) {

      if (rem === 1 || rem === 2 || rem == 3) {
        if (this.checkFor3(newNum)) {
          for (let i = 1; i <= groups; i++) {
            this.bracketConts.push(this.newArray(4))
          }
        }
      } else {
        for (let i = 0; i < teamNumb / 4; i++) {
          console.log('entramos')
          this.bracketConts.push(this.newArray(4))
        }
        console.log(this.bracketConts)
      }
    } else {
      this.err()
    }
  }
  checkFor3(teamNumb: number): boolean {
    let rem = teamNumb % 3;
    console.log(rem)
    if (rem === 1 || rem === 2) {
      let groups = Math.floor(teamNumb / 3) - 1;
      if (groups < 0) {
        this.err();
        return false;
      }
      console.log(groups)
      let newNum = teamNumb - (groups * 3);
      if (this.checkFor2(newNum)) {
        for (let i = 1; i <= groups; i++) {
          this.bracketConts.push(this.newArray(3))
        }
        return true;
      }
      else {
        this.err()
        console.error(this.checkFor2(newNum))
        return false;
      }

    } else {
      for (let i = 1; i <= teamNumb / 3; i++) {
        this.bracketConts.push(this.newArray(3))
      }
      return true;

    }
  }
  checkFor2(teamNumb: number): boolean {
    let rem = teamNumb % 2;
    if (rem === 1) {
      this.err()
      return false;
    } else {
      for (let i = 1; i <= teamNumb / 2; i++) {
        this.bracketConts.push(this.newArray(2))
      }
      console.log(this.bracketConts)
      return true;
    }
  }
  err() {
    alert('Invalid')
  }
  //╒    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╕
  //┇                        Drag and Drop                            ┇
  //╘    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╛
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
  //╒┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅╕
  //┇                         Edgars's logic                        ┇
  //╘┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅╛
  private teamBackgrounds = new Map<string, string>();

  assignBackgrounds() {
    this.$registeredTeamUnits.forEach((team, index) => {
      const backgroundIndex = (index % 6);
      this.teamBackgrounds.set(team.teamUnitId, `url("/assets/backgrounds/galaxy${backgroundIndex}.jpeg")`);
    });
  }

  returnImage(teamUnitId: string): string {
    return this.teamBackgrounds.get(teamUnitId) || 'url("/assets/backgrounds/galaxy1.jpeg")';
  }
}
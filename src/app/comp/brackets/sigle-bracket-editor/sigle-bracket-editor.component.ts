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
  tempArr2 = [1, 2];
  teampArr3 = [1, 2, 3];
  changeBrackets(event: any) {
    this.bracketConts = [];
    console.log(event.target.value);
    let groups = this.$registeredTeamUnits.length / event.target.value;

    switch (event.target.value) {
      case "2": {

        this.checkFor2(this.$registeredTeamUnits.length)
        break;
      }
      case "3": {
        this.checkFor3(11)//this.$registeredTeamUnits.length)
        break;
      }
    }
  }
  checkFor3(num: number) {
    let rem = num % 3;
    if (rem === 1) {
      let groups = Math.floor(num / 3) - 1;
      let newNum = num - (groups * 3);
      for (let i = 1; i <= groups; i++) {
        this.bracketConts.push(this.teampArr3)
      }
      this.checkFor2(newNum)

    } else {
     /*  
     for (let i = 1; i <= num / 2; i++) {
        this.bracketConts.push(this.tempArr2)
      } 
        */
    }
    console.log(this.bracketConts)
  }
  checkFor2(num: number) {
    let rem = num % 2;
    if (rem === 1) {
      this.err()
    } else {
      for (let i = 1; i <= num / 2; i++) {
        this.bracketConts.push(this.tempArr2)
      }
    }
    console.log(this.bracketConts)
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
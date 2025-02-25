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
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-sigle-bracket-editor',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    TeamLogoPipe,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CdkDrag,
  ],
  templateUrl: './sigle-bracket-editor.component.html',
  styleUrl: './sigle-bracket-editor.component.scss',
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
  SUB$registeredTeamUnits = this.bracketServ.$registeredTeamUnits.subscribe(
    (data) => {
      this.$registeredTeamUnits = data;
      this.unassignedUnits = data;
    }
  );
  constructor() {
    this.bracketServ.reloadData();
    this.bracketServ.dataLoad.eventPublicId = String(
      this.route.snapshot.paramMap.get('publicId')
    );
  }
  ngOnInit(): void {
    this.loadEventData();
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

  maxTeamsPerBracket!: number;
  numberOfTeams!: number;
  newArray(length: number): number[] {
    return Array.from({ length: length }, (_, i) => i + 1);
  }
  test(teamNumber: number, maxGroup: number) {
    this.maxTeamsPerBracket = maxGroup;
    console.log(teamNumber);
    console.log(maxGroup);
    this.checkTeams(teamNumber, maxGroup);
    let nTeams = 0;
    this.bracketConts.forEach((cont: any) => {
      nTeams += cont.length;
    });
    console.log(this.bracketConts);
    console.log(nTeams);
  }
  changeBrackets(event: any) {
    this.bracketConts = [];
    let totalTeams = this.$registeredTeamUnits.length;
    let teamsPerGroup = event.target.value;

    let groups = totalTeams / teamsPerGroup;

    switch (teamsPerGroup) {
      case '2': {
        this.checkFor2(totalTeams, true);
        break;
      }
      case '3': {
        this.checkFor3(this.$registeredTeamUnits.length, true);
        break;
      }
      case '4': {
        this.checkFor4(this.$registeredTeamUnits.length, true);
        break;
      }
      case '5': {
        this.checkFor5(this.$registeredTeamUnits.length, true);
        break;
      }
      case '6': {
        this.checkFor6(this.$registeredTeamUnits.length, true)
        break;
      }
      case '7': {
        this.checkFor7(this.maxTeamsPerBracket, true); //this.$registeredTeamUnits.length)
        break;
      }
    }
  }
  /// 15 , 8
  checkTeams(teamNumb: number, maxGroup: number, parent: boolean = maxGroup < this.maxTeamsPerBracket): boolean {

    this.bracketConts = []; // Reiniciar la lista de grupos
    let teamGroups = Math.floor(teamNumb / maxGroup); //1
    let remainder = teamNumb % maxGroup; // 7

    if (teamNumb === 0 && parent === true) {
      return true;
    }
    else if (teamNumb == 1) {
      parent ? null : this.err(169);
      return false;
    }
    else if (teamNumb < maxGroup) {
      if (parent && this.checkTeams(teamNumb, maxGroup - 1)) {
        return true;
      } else {
        parent ? null : this.err(210);
        return false;
      }
    }

    if (remainder === 0) {
      for (let i = 0; i < teamGroups; i++) {
        this.bracketConts.push(this.newArray(maxGroup));
      }
      return true;
    } else {

      if (this.checkTeams(remainder, maxGroup - 1)) {
        for (let i = 0; i < teamGroups; i++) {
          this.bracketConts.push(this.newArray(maxGroup));
        }
        return true;
      } else {
        if (teamGroups >= 2) {
          if (this.checkTeams(remainder + maxGroup, maxGroup - 1)) {
            for (let i = 0; i < teamGroups - 1; i++) {
              this.bracketConts.push(this.newArray(maxGroup));
            }
            return true;
          } else {
            parent ? null : this.err(158);
            return false;
          }
        } else {
          parent ? null : this.err(162);
          return false;
        }
      }
    }

  }
  checkFor7(teamNumb: number, parent: boolean): boolean {
    this.bracketConts = []; // Reiniciar la lista de grupos
    let groupsOf7 = Math.floor(teamNumb / 7);
    let remainder = teamNumb % 7;

    if (teamNumb === 0 && parent === true) {
      return true;
    } else if (teamNumb < 7) {
      if (parent && this.checkFor6(teamNumb, true)) {
        return true;
      } else {
        parent ? null : this.err(210);
        return false;
      }
    }

    // Si se pueden formar solo grupos de 7
    if (remainder === 0) {
      for (let i = 0; i < groupsOf7; i++) {
        this.bracketConts.push(this.newArray(7));
      }
      return true;
    }

    // Si los equipos restantes pueden formar un grupo de 6

    else {
      if (this.checkFor6(remainder, true)) {
        for (let i = 0; i < groupsOf7; i++) {
          this.bracketConts.push(this.newArray(7));
        }
        return true;
      } else {
        if (groupsOf7 >= 2) {
          if (this.checkFor6(remainder + 7, true)) {
            for (let i = 0; i < groupsOf7 - 1; i++) {
              this.bracketConts.push(this.newArray(7));
            }
            return true;
          } else {
            parent ? null : this.err(158);
            return false;
          }
        } else {
          parent ? null : this.err(162);
          return false;
        }
      }
    }

    // Si los equipos restantes no pueden agruparse en 6, error
    parent ? null : this.err(220);
    return false;
  }
  checkFor6(teamNumb: number, parent: boolean): boolean {
    this.bracketConts = [];
    let groupsOf6 = Math.floor(teamNumb / 6);
    let remainder = teamNumb % 6;

    if (teamNumb === 0 && parent === true) {
      return true;
    } else if (teamNumb < 6) {
      if (parent && this.checkFor5(teamNumb, true)) {
        return true;
      } else {
        parent ? null : this.err(134);
        return false;
      }
    }

    if (remainder === 0) {
      for (let i = 0; i < groupsOf6; i++) {
        this.bracketConts.push(this.newArray(6));
      }
      return true;
    } else {
      if (this.checkFor5(remainder, true)) {
        for (let i = 0; i < groupsOf6; i++) {
          this.bracketConts.push(this.newArray(6));
        }
        return true;
      } else {
        if (groupsOf6 >= 2) {
          if (this.checkFor5(remainder + 6, true)) {
            for (let i = 0; i < groupsOf6 - 1; i++) {
              this.bracketConts.push(this.newArray(6));
            }
            return true;
          } else {
            parent ? null : this.err(158);
            return false;
          }
        } else {
          parent ? null : this.err(162);
          return false;
        }
      }
    }
  }

  checkFor5(teamNumb: number, parent: boolean): boolean {
    this.bracketConts = []; // Reiniciar la lista de grupos
    let groupsOf5 = Math.floor(teamNumb / 5);
    let remainder = teamNumb % 5;

    if (teamNumb === 0 && parent) {
      return true;
    } else if (teamNumb < 5) {
      if (parent && this.checkFor4(teamNumb, true)) {
        return true;
      } else {
        parent ? null : this.err(128);
        return false;
      }
    }
    if (remainder === 0) {
      for (let i = 0; i < groupsOf5; i++) {
        this.bracketConts.push(this.newArray(5));
      }
      return true;
    } else {
      if (this.checkFor4(remainder, true)) {
        for (let i = 0; i < groupsOf5; i++) {
          this.bracketConts.push(this.newArray(5));
        }
        return true;
      } else {
        if (groupsOf5 >= 2) {
          if (this.checkFor4(remainder + 5, true)) {
            for (let i = 0; i < groupsOf5 - 1; i++) {
              this.bracketConts.push(this.newArray(5));
            }
            return true;
          } else {
            parent ? null : this.err(158);
            return false;
          }
        } else {
          parent ? null : this.err(166);
          return false;
        }
      }
    }
  }

  checkFor4(teamNumb: number, parent: boolean): boolean {
    this.bracketConts = []; // Reiniciar la lista de grupos
    let groupsOf4 = Math.floor(teamNumb / 4); // Grupos de 4 posibles
    if (groupsOf4 < 1 && parent === false) {
      parent ? null : this.err(113);
      console.log('183');
      return false;
    }
    let remainder = teamNumb % 4; // Equipos que sobran después de agrupar en 4
    if (remainder === 1 && groupsOf4 < 2) {
      parent ? null : this.err(118);
      console.log('189');

      return false;
    }
    // Agregar grupos de 4
    if (this.checkFor3(remainder, true)) {
      for (let i = 0; i < groupsOf4; i++) {
        this.bracketConts.push(this.newArray(4));
      }
      console.log(true);
      return true;
    } else {
      console.log(groupsOf4);
      console.log(groupsOf4 >= 2);
      if (groupsOf4 >= 2) {
        console.log(remainder + 4);
        if (this.checkFor3(remainder + 4, true)) {
          console.log('entramos');
          for (let i = 0; i < groupsOf4 - 1; i++) {
            this.bracketConts.push(this.newArray(4));
          }
          return true;
        } else {
          parent ? null : this.err(140);
          console.log('212');

          return false;
        }
      } else {
        parent ? null : this.err(145);
        console.log('218');

        return false;
      }
    }
  }

  checkFor3(teamNumb: number, parent: boolean): boolean {
    let rem = teamNumb % 3;

    if (teamNumb === 2) {
      if (this.checkFor2(teamNumb, true)) {
        return true;
      } else {
        parent ? null : this.err(161);
        return false;
      }
    } else if (teamNumb === 0) {
      return true;
    }
    if (teamNumb < 2) {
      parent ? null : this.err(169);
      return false;
    }
    let groupN = Math.floor(teamNumb / 3);
    console.log(rem);
    if (this.checkFor2(rem, true)) {
      for (let i = 1; i <= groupN; i++) {
        this.bracketConts.push(this.newArray(3));
      }
      return true;
    } else {
      parent ? null : this.err(191);
      return false;
    }
  }
  checkFor2(teamNumb: number, parent: boolean): boolean {

    let rem = teamNumb % 2;
    if (teamNumb === 0) {
      return true;
    }
    if (rem === 1) {
      parent ? null : this.err(191);
      return false;
    } else {
      for (let i = 1; i <= teamNumb / 2; i++) {
        this.bracketConts.push(this.newArray(2));
      }
      console.log(true);
      return true;
    }
  }

  err(line: number) {
    console.error('Invalid ' + line);
  }
  //╒    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╕
  //┇                        Drag and Drop                            ┇
  //╘    ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅    ╛
  unassignedUnits: TeamUnit[] = [];
  bracketOrder: TeamUnit[] = [];

  drop(event: CdkDragDrop<TeamUnit[]>) {
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
  //╒┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅╕
  //┇                         Edgars's logic                        ┇
  //╘┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅╛
  private teamBackgrounds = new Map<string, string>();

  assignBackgrounds() {
    this.$registeredTeamUnits.forEach((team, index) => {
      const backgroundIndex = index % 6;
      this.teamBackgrounds.set(
        team.teamUnitId,
        `url("/assets/backgrounds/galaxy${backgroundIndex}.jpeg")`
      );
    });
  }

  returnImage(teamUnitId: string): string {
    return (
      this.teamBackgrounds.get(teamUnitId) ||
      'url("/assets/backgrounds/galaxy1.jpeg")'
    );
  }
}

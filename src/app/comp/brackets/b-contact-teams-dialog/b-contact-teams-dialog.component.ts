import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthService } from '../../../serv/auth.service';
import { UserM } from '../../../models/userModels';
import { Team } from '../../../models/teamsModels';
@Component({
  selector: 'app-b-contact-teams-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,],
  templateUrl: './b-contact-teams-dialog.component.html',
  styleUrl: './b-contact-teams-dialog.component.scss'
})
export class BContactTeamsDialogComponent {
  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                           Miguel's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */

  compName = 'BContactTeamsDialogComponent'
  data = inject(MAT_DIALOG_DATA);

  $user!: UserM;
  $admin!: boolean;
  $developer!: boolean;
  SUB$user = this.authServ.$user.subscribe(data => {
    this.$user = data;
    this.$admin = this.authServ.$admin;
    this.$developer = this.authServ.$developer;

  })
  constructor(private authServ: AuthService) {
    authServ.reloadActiveUser(this.compName)
  }
  
  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                          Edgars's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */

  selectedTeamId: string = ''; // ID del equipo seleccionado
  filteredCoaches: any[] = []; // Lista filtrada de entrenadores
  selectedCoach: any = null; // Entrenador seleccionado

  onTeamSelect(event: any): void {
    const selectedTeamId = event.target.value;
    this.selectedTeamId = selectedTeamId;

    console.log('🏆 Equipo seleccionado:', selectedTeamId); // Borrar

    // Filtrar el equipo seleccionado
    const selectedTeam = this.data.find((team: Team) => team.teamId.toString() === selectedTeamId.toString());

    // Verificar si el equipo tiene entrenadores y asignarlos a filteredCoaches
    if (selectedTeam && selectedTeam.teamUnitCoach) {
      this.filteredCoaches = Array.isArray(selectedTeam.teamUnitCoach)
        ? selectedTeam.teamUnitCoach
        : [selectedTeam.teamUnitCoach];
    } else {
      this.filteredCoaches = []; // Si no hay entrenadores, limpiar la lista
    }

    this.selectedCoach = null; // Resetear entrenador seleccionado

    console.log('🏀 Coaches disponibles tras seleccionar equipo:', this.filteredCoaches);
  }

  onCoachSelect(coach: any): void {
    this.selectedCoach = coach;
  }
  makeCall(phoneNumber: string): void {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.error("No phone number available");
    }
  }
  sendEmail(email: string): void {
    if (email) {
      window.location.href = `mailto:${email}?subject=AstroHoopz&body=Hello%2C%20Coach!`;
    } else {
      console.error("No email address available");
    }
  }


}

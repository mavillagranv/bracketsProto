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

  pollTentative: number = 0;
  eventData: any = {};

  constructor(
    private router: Router,
    private authServ: AuthService,
    private route: ActivatedRoute,
    public bracketServ: BracketsService,
  ) {
    this.publicId = String(this.route.snapshot.paramMap.get('publicId'));
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state && navigation.extras.state['eventData']) {
      this.eventData = navigation.extras.state['eventData'];
    }

    console.log('Datos recibidos en nueva vista:', this.eventData);
  }
}

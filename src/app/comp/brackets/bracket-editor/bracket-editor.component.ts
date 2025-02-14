import { Component } from '@angular/core';
import { AuthService } from '../../../serv/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BracketsService } from '../../../serv/brackets.service';
import { UserM } from '../../../models/userModels';

@Component({
  selector: 'app-bracket-editor',
  standalone: true,
  imports: [],
  templateUrl: './bracket-editor.component.html',
  styleUrl: './bracket-editor.component.scss'
})
export class BracketEditorComponent {
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
  constructor(
    private authServ: AuthService,
    private route: ActivatedRoute,
    public bracketServ: BracketsService,
  ) {
    this.publicId = String(this.route.snapshot.paramMap.get('publicId'));
  }

  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                          Edgars's logic                        ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */
}

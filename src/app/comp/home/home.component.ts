import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router,
    private route: ActivatedRoute) {

  }
  go() {
    this.router.navigate(['brackets/12345'])
  }
  edgar(){
    this.router.navigate(['bracketEditor/12345'])

  }
}

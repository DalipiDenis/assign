import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { resetDatabase } from '../reset-database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  onGetStarted(): void {
    this.router.navigate(['/users']);
  }

  resetDatabase() {
      resetDatabase();
  }
}

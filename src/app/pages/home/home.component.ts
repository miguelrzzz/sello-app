import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalService } from '../../service/local.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLog = false;

  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.checkAuthStatus();
  }
  checkAuthStatus(): void {
    this.isLog = this.isUserLoggedIn();
  }
  isUserLoggedIn(): boolean {  // Nombre más descriptivo
    try {
      const loggedIn = this.localService.getData("isLoggedIn");
      return loggedIn !== null && loggedIn !== undefined && loggedIn !== "false";
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  }


  isLogin(): boolean {
    const loggedIn = this.localService.getData("isLoggedIn");
    return loggedIn === "true"; // Comparación estricta
  }
}
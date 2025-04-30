import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalService } from '../../service/local.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterLinkActive,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLog = false;

  constructor(private _localserivce: LocalService) {}

  ngOnInit() {
    this.isLog = this.isLogin();
  }

  isLogin(): boolean {
    return this._localserivce.getData("isLoggedIn") ? true : false;
  }
}
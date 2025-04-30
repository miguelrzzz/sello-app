import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../service/local.service';
import { CommonModule } from '@angular/common';

interface usuario{
  nombre : string;
  correo: string;
  password : string;
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  userscorrecto = 'admin@gmail.com';
  passcorrecto = 'admin';
  fullname: string = '';
  confirmPassword: string = '';

  isRegister: boolean = false;

  constructor(private router: Router, localService : LocalService ) {}

  onLogin() {
    if (this.username === this.userscorrecto && this.password === this.passcorrecto) {
      localStorage.setItem('isLoggedIn', this.username);
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
  onRegister(){
    if(this.password !== this.confirmPassword){
      alert('Las contraseñas no coinciden');
      return;
    }
  }
    // console.
  toggleForm(){
    this.isRegister = !this.isRegister;
  }
}

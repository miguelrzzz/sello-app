import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { usuarios } from '../../../models/usuarios.model';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-account',
  imports: [HttpClientModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  providers: [UsuarioService]
})
export class AccountComponent implements OnInit {
  constructor(private usuarioservice: UsuarioService) { }
  usuario: usuarios | undefined = undefined;
  usuarios: usuarios[] = [];

  cargarUsuarios() {
    this.usuarioservice.getUsuarios().subscribe(data => {
      this.usuarios = data.data;
    });
  }
  ngOnInit(): void {
    this.cargarUsuarios();
    // this.usuarios.find()
  }

}

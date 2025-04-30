import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuarios/usuario.component';
// export const routes: Routes = [
//     {path: '', redirectTo: 'home', pathMatch: 'full'},
//     {path: 'home', component:HomeComponent },
//     {path: 'plantillas', component:PlantillasComponent},
//     {path: 'login', component:LoginComponent},
//     {path: 'dashboard', component:DashboardComponent},
//     {path: 'usuarios', component: UsuarioComponent },
// ];
export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'plantillas', component: PlantillasComponent},
    {path: 'login', component: LoginComponent},
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        {path: 'usuarios', component: UsuarioComponent},
      ]
    }
  ];
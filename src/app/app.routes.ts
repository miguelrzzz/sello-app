import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PanelUsuarioComponent } from './pages/dashboard/panel-usuarios/panel-usuario.component';
import { DesignComponent } from './pages/plantillas/design/design.component';
import { PanelPlantillasComponent } from './pages/dashboard/panel-plantillas/panel-plantillas.component';
import { PanelCategoriasComponent } from './pages/dashboard/panel-categorias/panel-categorias.component';
import { PagesErrorComponent } from './shared/pages-error/pages-error.component';
import { AccountComponent } from './pages/plantillas/account/account.component';
import { CanActivateFn } from '@angular/router';
import { ConstanciasComponent } from './pages/constancias/constancias.component';

// Ejemplo de guard simple
const authGuard: CanActivateFn = () => {
  // Aquí deberías validar si el usuario está autenticado
  // Por ejemplo, revisando un servicio de autenticación
  // return authService.isLoggedIn();
  return !!sessionStorage.getItem('isLoggedIn'); // Ejemplo simple
};

export const routes: Routes = [
  { path: 'error', component: PagesErrorComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: PlantillasComponent,
    children:[

    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
      { path: 'usuarios-panel', component: PanelUsuarioComponent },
      { path: 'plantillas-panel', component: PanelPlantillasComponent },
      { path: 'categorias-panel', component: PanelCategoriasComponent },
    ]
  },
  { path: 'cuenta', component: AccountComponent, canActivate: [authGuard] },
  { path: 'plantillas/design/:idPlantilla', component: DesignComponent },
  { path: 'constancias', component: ConstanciasComponent },
  // { path: '**', redirectTo: 'error' },
];
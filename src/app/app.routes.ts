import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PanelUsuarioComponent } from './pages/dashboard/panel-usuarios/panel-usuario.component';
import { DesignComponent } from './pages/plantillas/design/design.component';
import { PanelPlantillasComponent } from './pages/dashboard/panel-plantillas/panel-plantillas.component';
import { PanelCategoriasComponent } from './pages/dashboard/panel-categorias/panel-categorias.component';
export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'plantillas', component: PlantillasComponent},
    {path: 'login', component: LoginComponent},
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        {path: 'usuarios-panel', component: PanelUsuarioComponent},
        {path: 'plantillas-panel', component: PanelPlantillasComponent},
        {path: 'categorias-panel',component:PanelCategoriasComponent },
      ]
    },
    {path: 'plantillas/design', component: DesignComponent }
    // {path: 'p'}
  ];
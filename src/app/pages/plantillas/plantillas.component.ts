import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Components
import { PdfThumbnailComponent } from '../../components/components/pdf-preview/pdf-preview.component';

// Models
import { Plantilla } from '../../models/plantilla.model';
import { usuarios } from '../../models/usuarios.model';

// Services
import { PlantillaService } from '../../service/plantillas.service';
import { LocalService } from '../../service/local.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-plantillas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    // PdfThumbnailComponent
  ],
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css'],
  providers: [PlantillaService, UsuarioService, LocalService]
})
export class PlantillasComponent implements OnInit {
  // State variables
  isDropdownOpen: boolean = false;
  isLoggedIn: boolean = false;
  sessionIsOut: boolean = false;
  isLoading: boolean = false;
  currentSlide: number = 0;

  // Data variables
  selectedPlantilla?: Plantilla;
  plantillas: Plantilla[] = [];
  searchTerm: string = '';
  usuario?: usuarios;
  usuarios: usuarios[] = [];

  constructor(
    private router: Router,
    private plantillaService: PlantillaService,
    private localService: LocalService,
    private sanitizer: DomSanitizer,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadPlantillas();

    this.cargarUsuarios().then(() => {
      const loggedInEmail = sessionStorage.getItem("isLoggedIn");
      if (loggedInEmail) {
        this.usuario = this.usuarios.find(u => u.correo === loggedInEmail);
        console.log('Usuario:', this.usuario);
        this.isLoggedIn = true;
      }
    });
  }

  async cargarUsuarios(): Promise<void> {
    try {
      const response = await this.usuarioService.getUsuarios().toPromise();
      this.usuarios = response?.data || [];
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }
  // Authentication methods
  private checkAuthentication(): void {
    this.isLoggedIn = !!this.localService.getData('isLoggedIn');
    if (this.isLoggedIn) {
      const loggedInEmail = sessionStorage.getItem("isLoggedIn");
      if (loggedInEmail) {
        this.usuario = this.usuarios.find(u => u.correo === loggedInEmail);
      }
    }
  }

  logout(): void {
    this.localService.clearData();
    this.sessionIsOut = true;
    setTimeout(() => {
      this.router.navigate(['/home']);
      this.sessionIsOut = false;
    }, 2000);
  }

  // Navigation methods
  navigateToProfile(): void {
    this.router.navigate(['/cuenta']);
  }

  selectPlantilla(plantilla: Plantilla): void {
    if (plantilla.idPlantilla) {
      this.router.navigate(['/plantillas/design', plantilla.idPlantilla]);
    }
  }

  // Data loading methods
  private loadPlantillas(): void {
    this.isLoading = true;
    this.plantillaService.getPlantillas().subscribe({
      next: (response) => {
        this.plantillas = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading plantillas:', error);
        this.isLoading = false;
      }
    });
  }

  private loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response.data || [];
      },
      error: (error) => {
        console.error('Error loading usuarios:', error);
      }
    });
  }

  // Carousel methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % 2;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + 2) % 2;
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < 2) {
      this.currentSlide = index;
    }
  }

  // Utility methods
  get filteredPlantillas(): Plantilla[] {
    if (!this.searchTerm.trim()) {
      return this.plantillas;
    }
    const term = this.searchTerm.toLowerCase();
    return this.plantillas.filter(p =>
      p.nombre?.toLowerCase().includes(term) ||
      p.descripcion?.toLowerCase().includes(term)
    );
  }

  getSafePdfUrl(id: string): SafeResourceUrl {
    const url = `https://drive.google.com/file/d/${id}/preview`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeModal(): void {
    this.selectedPlantilla = undefined;
  }
}
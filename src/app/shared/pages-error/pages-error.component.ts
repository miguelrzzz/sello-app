import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pages-error',
  imports: [],
  templateUrl: './pages-error.component.html',
  styleUrl: './pages-error.component.css'
})
export class PagesErrorComponent {
  @Input() errorMessage: string = 'Se ha producido un error. Inténtelo de nuevo más tarde.';
  @Input() errorLink: string = '/';
  @Input() errorLinkText: string = 'Go to Home';
  @Input() errorLink2: string = '/contact';
  @Input() errorLinkText2: string = 'Contact Support';
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCategoriasComponent } from './panel-categorias.component';

describe('PanelCategoriasComponent', () => {
  let component: PanelCategoriasComponent;
  let fixture: ComponentFixture<PanelCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

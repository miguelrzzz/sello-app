import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlantillasComponent } from './panel-plantillas.component';

describe('PanelPlantillasComponent', () => {
  let component: PanelPlantillasComponent;
  let fixture: ComponentFixture<PanelPlantillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPlantillasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

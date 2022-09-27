import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaListaComponent } from './experiencia-lista.component';

describe('ExperienciaListaComponent', () => {
  let component: ExperienciaListaComponent;
  let fixture: ComponentFixture<ExperienciaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

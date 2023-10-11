import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaEditaComponent } from './experiencia-edita.component';

describe('ExperienciaEditaComponent', () => {
  let component: ExperienciaEditaComponent;
  let fixture: ComponentFixture<ExperienciaEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

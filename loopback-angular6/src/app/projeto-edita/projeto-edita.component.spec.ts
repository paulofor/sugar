import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoEditaComponent } from './projeto-edita.component';

describe('ProjetoEditaComponent', () => {
  let component: ProjetoEditaComponent;
  let fixture: ComponentFixture<ProjetoEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

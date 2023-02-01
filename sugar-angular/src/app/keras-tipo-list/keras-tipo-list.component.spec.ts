import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KerasTipoListComponent } from './keras-tipo-list.component';

describe('KerasTipoListComponent', () => {
  let component: KerasTipoListComponent;
  let fixture: ComponentFixture<KerasTipoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KerasTipoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KerasTipoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

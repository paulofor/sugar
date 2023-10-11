import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespostaBabyComponent } from './resposta-baby.component';

describe('RespostaBabyComponent', () => {
  let component: RespostaBabyComponent;
  let fixture: ComponentFixture<RespostaBabyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespostaBabyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespostaBabyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

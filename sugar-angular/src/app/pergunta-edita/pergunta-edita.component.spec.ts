import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaEditaComponent } from './pergunta-edita.component';

describe('PerguntaEditaComponent', () => {
  let component: PerguntaEditaComponent;
  let fixture: ComponentFixture<PerguntaEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerguntaEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

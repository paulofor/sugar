import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaListaComponent } from './pergunta-lista.component';

describe('PerguntaListaComponent', () => {
  let component: PerguntaListaComponent;
  let fixture: ComponentFixture<PerguntaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerguntaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

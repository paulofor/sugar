import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustoListaComponent } from './item-custo-lista.component';

describe('ItemCustoListaComponent', () => {
  let component: ItemCustoListaComponent;
  let fixture: ComponentFixture<ItemCustoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCustoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

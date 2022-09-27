import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustoDetalheComponent } from './item-custo-detalhe.component';

describe('ItemCustoDetalheComponent', () => {
  let component: ItemCustoDetalheComponent;
  let fixture: ComponentFixture<ItemCustoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCustoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

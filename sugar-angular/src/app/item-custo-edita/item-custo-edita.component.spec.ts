import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustoEditaComponent } from './item-custo-edita.component';

describe('ItemCustoEditaComponent', () => {
  let component: ItemCustoEditaComponent;
  let fixture: ComponentFixture<ItemCustoEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCustoEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustoEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

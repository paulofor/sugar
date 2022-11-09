import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemItemCustoUploadComponent } from './imagem-item-custo-upload.component';

describe('ImagemItemCustoUploadComponent', () => {
  let component: ImagemItemCustoUploadComponent;
  let fixture: ComponentFixture<ImagemItemCustoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemItemCustoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemItemCustoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

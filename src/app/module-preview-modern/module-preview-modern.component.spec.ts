import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePreviewModernComponent } from './module-preview-modern.component';

describe('ModulePreviewModernComponent', () => {
  let component: ModulePreviewModernComponent;
  let fixture: ComponentFixture<ModulePreviewModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulePreviewModernComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulePreviewModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

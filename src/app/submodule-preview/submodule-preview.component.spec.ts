import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodulePreviewComponent } from './submodule-preview.component';

describe('SubmodulePreviewComponent', () => {
  let component: SubmodulePreviewComponent;
  let fixture: ComponentFixture<SubmodulePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmodulePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmodulePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

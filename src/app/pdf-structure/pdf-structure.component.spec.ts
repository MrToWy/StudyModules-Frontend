import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfStructureComponent } from './pdf-structure.component';

describe('PdfStructureComponent', () => {
  let component: PdfStructureComponent;
  let fixture: ComponentFixture<PdfStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

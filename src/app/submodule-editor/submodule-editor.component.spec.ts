import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleEditorComponent } from './submodule-editor.component';

describe('SubmoduleEditorComponent', () => {
  let component: SubmoduleEditorComponent;
  let fixture: ComponentFixture<SubmoduleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmoduleEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmoduleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

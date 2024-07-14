import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementEditorComponent } from './requirement-editor.component';

describe('RequirementEditorComponent', () => {
  let component: RequirementEditorComponent;
  let fixture: ComponentFixture<RequirementEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequirementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleEditEditorComponent } from './module-edit-editor.component';

describe('ModuleEditEditorComponent', () => {
  let component: ModuleEditEditorComponent;
  let fixture: ComponentFixture<ModuleEditEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleEditEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleEditEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleEditorComponent } from './module-editor.component';

describe('ModuleEditEditorComponent', () => {
  let component: ModuleEditorComponent;
  let fixture: ComponentFixture<ModuleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

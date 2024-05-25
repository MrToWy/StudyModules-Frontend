import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTranslatorComponent } from './module-translator.component';

describe('ModuleTranslatorComponent', () => {
  let component: ModuleTranslatorComponent;
  let fixture: ComponentFixture<ModuleTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleTranslatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

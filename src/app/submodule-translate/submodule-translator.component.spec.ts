import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleTranslatorComponent } from './submodule-translator.component';

describe('SubmoduleTranslateComponent', () => {
  let component: SubmoduleTranslatorComponent;
  let fixture: ComponentFixture<SubmoduleTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmoduleTranslatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmoduleTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

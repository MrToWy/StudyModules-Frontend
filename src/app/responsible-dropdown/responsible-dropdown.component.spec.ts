import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleDropdownComponent } from './responsible-dropdown.component';

describe('ResponsibleDropdownComponent', () => {
  let component: ResponsibleDropdownComponent;
  let fixture: ComponentFixture<ResponsibleDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementDetailComponent } from './requirement-detail.component';

describe('RequirementDetailComponent', () => {
  let component: RequirementDetailComponent;
  let fixture: ComponentFixture<RequirementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequirementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

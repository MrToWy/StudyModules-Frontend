import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleDetailComponent } from './submodule-detail.component';

describe('SubmoduleDetailComponent', () => {
  let component: SubmoduleDetailComponent;
  let fixture: ComponentFixture<SubmoduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmoduleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmoduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

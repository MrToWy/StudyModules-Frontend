import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleAvatarComponent } from './responsible-avatar.component';

describe('ResponsibleAvatarComponent', () => {
  let component: ResponsibleAvatarComponent;
  let fixture: ComponentFixture<ResponsibleAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitTextCardComponent } from './split-text-card.component';

describe('SplitTextCardComponent', () => {
  let component: SplitTextCardComponent;
  let fixture: ComponentFixture<SplitTextCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitTextCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SplitTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

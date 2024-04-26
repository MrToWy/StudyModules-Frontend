import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGridComponent } from './module-grid.component';

describe('ModuleGridComponent', () => {
  let component: ModuleGridComponent;
  let fixture: ComponentFixture<ModuleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleChangelogComponent } from './module-changelog.component';

describe('ModuleChangelogComponent', () => {
  let component: ModuleChangelogComponent;
  let fixture: ComponentFixture<ModuleChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleChangelogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

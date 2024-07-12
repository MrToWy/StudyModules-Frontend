import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleEditComponent } from './submodule-edit.component';

describe('SubmoduleEditComponent', () => {
  let component: SubmoduleEditComponent;
  let fixture: ComponentFixture<SubmoduleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmoduleEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmoduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

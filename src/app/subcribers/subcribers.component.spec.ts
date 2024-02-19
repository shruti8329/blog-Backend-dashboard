import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcribersComponent } from './subcribers.component';

describe('SubcribersComponent', () => {
  let component: SubcribersComponent;
  let fixture: ComponentFixture<SubcribersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcribersComponent]
    });
    fixture = TestBed.createComponent(SubcribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

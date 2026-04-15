import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobDetailComponent } from './view-job-detail.component';

describe('ViewJobDetailComponent', () => {
  let component: ViewJobDetailComponent;
  let fixture: ComponentFixture<ViewJobDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJobDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

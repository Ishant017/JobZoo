import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerLayoutComponent } from './jobseeker-layout.component';

describe('JobseekerLayoutComponent', () => {
  let component: JobseekerLayoutComponent;
  let fixture: ComponentFixture<JobseekerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpddateJobComponent } from './upddate-job.component';

describe('UpddateJobComponent', () => {
  let component: UpddateJobComponent;
  let fixture: ComponentFixture<UpddateJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpddateJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpddateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

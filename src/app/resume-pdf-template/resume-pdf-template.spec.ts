import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePdfTemplate } from './resume-pdf-template';

describe('ResumePdfTemplate', () => {
  let component: ResumePdfTemplate;
  let fixture: ComponentFixture<ResumePdfTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePdfTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumePdfTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

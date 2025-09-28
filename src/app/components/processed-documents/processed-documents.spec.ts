import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedDocuments } from './processed-documents';

describe('ProcessedDocuments', () => {
  let component: ProcessedDocuments;
  let fixture: ComponentFixture<ProcessedDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessedDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessedDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

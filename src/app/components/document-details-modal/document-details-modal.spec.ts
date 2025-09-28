import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailsModal } from './document-details-modal';

describe('DocumentDetailsModal', () => {
  let component: DocumentDetailsModal;
  let fixture: ComponentFixture<DocumentDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDetailsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

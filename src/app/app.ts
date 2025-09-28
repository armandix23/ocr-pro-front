import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation';
import { UploadDocumentComponent } from './components/upload-document/upload-document';
import { ProcessedDocumentsComponent } from './components/processed-documents/processed-documents';
import { DocumentDetailsModalComponent } from './components/document-details-modal/document-details-modal';
import { OcrService } from './services/ocr.service';
import { Documento } from './models/documento.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    UploadDocumentComponent,
    ProcessedDocumentsComponent,
    DocumentDetailsModalComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  activeSection = 'upload';
  documentos: Documento[] = [];
  selectedDocumento: Documento | null = null;
  showModal = false;

  constructor(private ocrService: OcrService) {}

  ngOnInit(): void {
    this.ocrService.documentos$.subscribe(documentos => {
      this.documentos = documentos;
    });
  }

  onSectionChange(section: string): void {
    this.activeSection = section;
  }

  onDocumentUploaded(documento: Documento): void {
    // Document is already added to the list by the service
    // Switch to documents section to show the new document
    this.activeSection = 'documents';
  }

  onExampleDataLoaded(documento: Documento): void {
    // Add mock document to the list
    this.documentos = [documento, ...this.documentos];
    // Switch to documents section
    this.activeSection = 'documents';
  }

  onViewDocumentDetails(documento: Documento): void {
    this.selectedDocumento = documento;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDocumento = null;
  }
}
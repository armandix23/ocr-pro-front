import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrService } from '../../services/ocr.service';
import { Documento } from '../../models/documento.model';

@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-document.html',
  styleUrls: ['./upload-document.scss']
})
export class UploadDocumentComponent {
  @Output() documentUploaded = new EventEmitter<Documento>();
  @Output() exampleDataLoaded = new EventEmitter<Documento>();

  selectedFile: File | null = null;
  dragOver = false;
  uploading = false;
  uploadProgress = 0;

  constructor(private ocrService: OcrService) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.validateFile();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.validateFile();
    }
  }

  validateFile(): void {
    if (!this.selectedFile) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(this.selectedFile.type)) {
      alert('Tipo de archivo no válido. Solo se permiten PDF, JPG y PNG.');
      this.selectedFile = null;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.uploadProgress = 0;

    this.ocrService.uploadFile(this.selectedFile).subscribe({
      next: (result) => {
        this.uploadProgress = result.progress;
        if (result.documento) {
          this.uploading = false;
          this.selectedFile = null;
          this.uploadProgress = 0;
          this.documentUploaded.emit(result.documento);
        }
      },
      error: (error) => {
        this.uploading = false;
        this.uploadProgress = 0;
        console.error('Error uploading file:', error);
        alert('Error al procesar el archivo: ' + error.message);
      }
    });
  }

  loadExampleData(): void {
    const mockDocumento = this.ocrService.getMockDocumento();
    this.exampleDataLoaded.emit(mockDocumento);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
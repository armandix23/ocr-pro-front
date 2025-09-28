import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Documento, DocumentType } from '../../models/documento.model';

@Component({
  selector: 'app-processed-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processed-documents.html',
  styleUrls: ['./processed-documents.scss']
})
export class ProcessedDocumentsComponent implements OnInit {
  @Input() documentos: Documento[] = [];
  @Output() viewDocumentDetails = new EventEmitter<Documento>();

  activeTab: string = 'FACTURA';
  
  documentTypes: DocumentType[] = [
    { value: 'FACTURA', label: 'Facturas', icon: '🧾', color: '#6600FF' },
    { value: 'RECIBO', label: 'Recibos', icon: '✅', color: '#00FFFF' },
    { value: 'MULTA', label: 'Multas', icon: '⚠️', color: '#FF0080' },
    { value: 'CONTRATO', label: 'Contratos', icon: '📋', color: '#FF6B35' },
    { value: 'OTROS', label: 'Otros', icon: '📄', color: '#8B5CF6' }
  ];

  ngOnInit(): void {
    // Set active tab to the first tab that has documents
    for (const type of this.documentTypes) {
      if (this.getDocumentCount(type.value) > 0) {
        this.activeTab = type.value;
        break;
      }
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getDocumentCount(type: string): number {
    return this.documentos.filter(doc => doc.tipo === type).length;
  }

  getFilteredDocuments(): Documento[] {
    return this.documentos.filter(doc => doc.tipo === this.activeTab);
  }

  viewDetails(documento: Documento): void {
    this.viewDocumentDetails.emit(documento);
  }

  downloadJSON(documento: Documento): void {
    const dataStr = JSON.stringify(documento.resultado, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${documento.nombre}_resultado.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatConfidence(confidence: number): string {
    return (confidence * 100).toFixed(1) + '%';
  }

  getConfidenceClass(confidence: number): string {
    if (confidence >= 0.9) return 'high';
    if (confidence >= 0.7) return 'medium';
    return 'low';
  }

  getDocumentTypeColor(type: string): string {
    const docType = this.documentTypes.find(dt => dt.value === type);
    return docType ? docType.color : '#8B5CF6';
  }
}
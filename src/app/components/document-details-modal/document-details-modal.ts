import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Documento } from '../../models/documento.model';

@Component({
  selector: 'app-document-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-details-modal.html',
  styleUrls: ['./document-details-modal.scss']
})
export class DocumentDetailsModalComponent {
  @Input() documento: Documento | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  downloadJSON(): void {
    if (!this.documento) return;

    const dataStr = JSON.stringify(this.documento.resultado, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${this.documento.nombre}_resultado.json`;
    
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

  formatCurrency(amount: string): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(parseFloat(amount));
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
    const colors: { [key: string]: string } = {
      'FACTURA': '#6600FF',
      'RECIBO': '#00FFFF',
      'MULTA': '#FF0080',
      'CONTRATO': '#FF6B35',
      'OTROS': '#8B5CF6'
    };
    return colors[type] || '#8B5CF6';
  }
}
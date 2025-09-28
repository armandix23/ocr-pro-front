import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Documento, UploadResponse } from '../models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private readonly API_URL = 'http://localhost:8000';
  private documentosSubject = new BehaviorSubject<Documento[]>([]);
  public documentos$ = this.documentosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadDocumentos();
  }

  uploadFile(file: File): Observable<{ progress: number; documento?: Documento }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Documento>(`${this.API_URL}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<Documento>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          return { progress };
        } else if (event.type === HttpEventType.Response) {
          const documento = event.body!;
          this.addDocumento(documento);
          return { progress: 100, documento };
        }
        return { progress: 0 };
      }),
      catchError(error => {
        console.error('Error uploading file:', error);
        throw error;
      })
    );
  }

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.API_URL}/documentos`).pipe(
      map(documentos => {
        this.documentosSubject.next(documentos);
        return documentos;
      }),
      catchError(error => {
        console.error('Error loading documentos:', error);
        return [];
      })
    );
  }

  deleteDocumento(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/documentos/${id}`).pipe(
      map(() => {
        const currentDocumentos = this.documentosSubject.value;
        const updatedDocumentos = currentDocumentos.filter(doc => doc.id !== id);
        this.documentosSubject.next(updatedDocumentos);
        return true;
      }),
      catchError(error => {
        console.error('Error deleting documento:', error);
        throw error;
      })
    );
  }

  private loadDocumentos(): void {
    this.getDocumentos().subscribe();
  }

  private addDocumento(documento: Documento): void {
    const currentDocumentos = this.documentosSubject.value;
    this.documentosSubject.next([documento, ...currentDocumentos]);
  }

  // Método para simular datos cuando el backend no esté disponible
  getMockDocumento(): Documento {
    return {
      id: 'mock-1',
      nombre: 'factura_ejemplo.pdf',
      tipo: 'FACTURA',
      fechaProcesamiento: new Date().toISOString(),
      confianzaFinal: 0.89,
      archivoOriginal: 'factura_ejemplo.pdf',
      resultado: {
        cabecera: {
          nif_emisor: '12345678A',
          fecha_emision: '2024-01-15',
          razon_social_emisora: 'Empresa Ejemplo S.L.',
          nif_receptor: '87654321B',
          razon_social_receptor: 'Cliente Ejemplo S.A.',
          numero_documento: 'FAC-2024-001',
          tipo_documento: 'Factura'
        },
        lineas: [
          {
            numero_linea: 1,
            descripcion: 'Producto A - Servicio de consultoría',
            cantidad: '2.00',
            precio_unitario: '25.00',
            importe_linea: '50.00',
            accion: 'Venta',
            confianza: 0.95
          },
          {
            numero_linea: 2,
            descripcion: 'Producto B - Licencia de software',
            cantidad: '1.00',
            precio_unitario: '15.50',
            importe_linea: '15.50',
            accion: 'Venta',
            confianza: 0.88
          }
        ],
        totales: {
          base_imponible: '65.50',
          iva: {
            '21': '13.76',
            '10': '0.00'
          },
          total: '79.26',
          moneda: 'EUR'
        },
        metadatos: {
          archivo_original: 'factura_ejemplo.pdf',
          confianza_ocr: 0.92,
          confianza_final: 0.89,
          requiere_revision: false,
          timestamp_procesamiento: '2024-01-15T10:30:00Z'
        }
      }
    };
  }
}
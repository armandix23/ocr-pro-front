export interface Documento {
  cabecera: {
    nif_emisor: string;
    fecha_emision: string;
    razon_social_emisora: string;
    nif_receptor: string | null;
    razon_social_receptor: string | null;
    numero_documento: string;
    tipo_documento: string;
  };
  lineas: {
    numero_linea: number;
    descripcion: string;
    cantidad: string;
    precio_unitario: string;
    importe_linea: string;
    accion: string;
    confianza: number;
  }[];
  totales: {
    base_imponible: string;
    iva: { [key: string]: string };
    total: string;
    moneda: string;
  };
  metadatos: {
    archivo_original: string;
    confianza_ocr: number;
    confianza_final: number;
    requiere_revision: boolean;
    timestamp_procesamiento: string;
  };
}

export interface UploadResponse {
  success: boolean;
  message: string;
  documento?: Documento;
}

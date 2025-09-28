# 🚀 OCR Pro - Aplicación Angular Moderna

![OCR Pro Interface](https://via.placeholder.com/800x400/000000/6600FF?text=OCR+Pro+Interface)

Una aplicación Angular moderna y profesional con diseño futurista inspirado en Solana para el procesamiento de documentos OCR. La aplicación permite subir documentos (PDF, JPG, PNG) y procesarlos mediante OCR para extraer información estructurada como facturas, recibos, contratos, etc.

## ✨ Características Principales

- 🎨 **Diseño Futurista**: Paleta de colores inspirada en Solana con gradientes y efectos de vidrio
- 📱 **Totalmente Responsive**: Funciona perfectamente en móviles, tablets y escritorios
- 🖱️ **Drag & Drop**: Subida intuitiva de archivos con arrastrar y soltar
- 📊 **Clasificación Automática**: Documentos organizados por tipo (FACTURA, RECIBO, MULTA, CONTRATO, OTROS)
- 🔍 **Modal de Detalles**: Visualización completa de resultados OCR en tres bloques claros
- 💾 **Descarga JSON**: Exportación de resultados estructurados
- 🐳 **Docker Ready**: Configuración completa para Docker y Okteto

## 🎯 Cómo Funciona

1. **Subida de Documentos**: Arrastra o selecciona archivos PDF, JPG o PNG
2. **Procesamiento OCR**: El backend procesa el documento y extrae información estructurada
3. **Clasificación**: Los documentos se organizan automáticamente por tipo
4. **Visualización**: Cada documento muestra:
   - 📄 **Cabecera**: NIF emisor, fecha emisión, empresa
   - 📋 **Líneas**: Productos/conceptos con cantidad, descripción, importe
   - 💰 **Totales**: Base imponible, IVA desglosado, total
5. **Exportación**: Descarga los resultados en formato JSON

## 🛠️ Instalación y Ejecución

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Angular CLI** (se instala automáticamente)
- **Backend FastAPI** ejecutándose en `http://localhost:8000`

### Windows

1. **Instalar Node.js**
   ```bash
   # Descargar desde https://nodejs.org/
   # O usar Chocolatey
   choco install nodejs
   ```

2. **Clonar el repositorio**
   ```bash
   git clone https://github.com/armandix23/ocr-pro-front.git
   cd ocr-pro
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Ejecutar en desarrollo**
   ```bash
   ng serve
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

### macOS

1. **Instalar Node.js**
   ```bash
   # Usando Homebrew
   brew install node
   
   # O descargar desde https://nodejs.org/
   ```

2. **Clonar el repositorio**
   ```bash
   git clone https://github.com/armandix23/ocr-pro-front.git
   cd ocr-pro
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Ejecutar en desarrollo**
   ```bash
   ng serve
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

### Comandos Útiles

```bash
# Desarrollo
ng serve                    # Servidor de desarrollo
ng serve --port 4201       # Puerto personalizado

# Construcción
ng build                   # Construcción de desarrollo
ng build --prod           # Construcción de producción

# Testing
ng test                   # Tests unitarios
ng e2e                    # Tests end-to-end

# Linting
ng lint                   # Verificar código
```

## 🐳 Docker

### Construir y Ejecutar

```bash
# Construir la imagen
docker build -t ocr-pro-frontend .

# Ejecutar el contenedor
docker run -p 80:80 ocr-pro-frontend
```

### Docker Compose

```bash
# Ejecutar con backend incluido
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

## 🚀 Despliegue en Okteto

1. **Instalar Okteto CLI**
   ```bash
   # Windows
   curl -sSL https://get.okteto.com | sh
   
   # macOS
   brew install okteto
   ```

2. **Iniciar sesión**
   ```bash
   okteto login
   ```

3. **Desplegar**
   ```bash
   okteto deploy
   ```

## 🎨 Diseño y Tecnologías

### Paleta de Colores
- **Negro**: `#000000` (fondo principal)
- **Morado**: `#6600FF` (color primario)
- **Azul Cian**: `#00FFFF` (color secundario)
- **Rosa**: `#FF0080` (color de acento)

### Stack Tecnológico
- **Frontend**: Angular 17+ con standalone components
- **UI**: Angular Material + CSS personalizado
- **Tipografía**: Inter (Google Fonts)
- **Backend**: FastAPI (Python)
- **Containerización**: Docker + Nginx
- **Despliegue**: Okteto

### Características de Diseño
- Gradientes suaves y efectos de vidrio
- Animaciones sutiles al pasar el ratón
- Diseño responsive con breakpoints optimizados
- Efectos de glow y sombras
- Transiciones fluidas

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navigation/           # Barra de navegación
│   │   ├── upload-document/      # Componente de subida
│   │   ├── processed-documents/  # Lista de documentos
│   │   └── document-details-modal/ # Modal de detalles
│   ├── models/
│   │   └── documento.model.ts    # Interfaces de datos
│   ├── services/
│   │   └── ocr.service.ts        # Servicio para backend
│   ├── app.html                  # Template principal
│   ├── app.ts                    # Componente principal
│   └── app.scss                  # Estilos principales
├── styles.scss                   # Estilos globales
└── main.ts                       # Punto de entrada
```

## 🔧 Configuración del Backend

La aplicación se comunica con un backend FastAPI. Asegúrate de que esté ejecutándose en `http://localhost:8000` con los siguientes endpoints:

- `POST /upload` - Subir y procesar documentos
- `GET /documentos` - Obtener lista de documentos
- `DELETE /documentos/{id}` - Eliminar documento

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🧪 Testing

```bash
# Tests unitarios
ng test

# Tests end-to-end
ng e2e

# Coverage
ng test --code-coverage
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles
4. Contacta al equipo de desarrollo

## 🎉 Agradecimientos

- Angular Team por el framework
- Solana por la inspiración de diseño
- Google Fonts por la tipografía Inter
- Comunidad open source

---

**OCR Pro** - Procesamiento de documentos con estilo futurista 🚀

![GitHub stars](https://img.shields.io/github/stars/armandix23/ocr-pro-front?style=social)
![GitHub forks](https://img.shields.io/github/forks/armandix23/ocr-pro-front?style=social)
![GitHub issues](https://img.shields.io/github/issues/armandix23/ocr-pro-front)
![GitHub license](https://img.shields.io/github/license/armandix23/ocr-pro-front)
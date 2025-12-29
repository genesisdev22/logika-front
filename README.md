# Prueba Técnica Frontend - Logika

Solución para la prueba técnica, implementando un dashboard administrativo para gestión de acciones (adaptado visualmente como "Categorías").

## Setup

1.  **Instalar dependencias**:

    ```bash
    pnpm install
    ```

2.  **Variables de entorno**:
    Copiar el archivo de ejemplo:

    ```bash
    cp .env.example .env
    ```

    _(Ya tiene las URLs base configuradas)_.

3.  **Correr el proyecto**:
    ```bash
    pnpm start
    ```
    Abre en `http://localhost:3000`.

## Stack

- **React + TypeScript**: Base del proyecto.
- **Redux Toolkit**: Para el manejo del estado global (auth y data).
- **React Router**: Gestión de rutas públicas y privadas.
- **Axios**: Comunicación HTTP e interceptores.
- **Zod + React Hook Form**: Validación robusta de formularios.
- **CSS Modules**: Estilos organizados por componente/funcionalidad.

## Notas de Implementación y descubrimiento

Durante el desarrollo tomé algunas decisiones para cumplir con los requerimientos y el diseño:

1.  **Adapción Visual**:
    Aunque el API maneja "Acciones" (`/actions`), la UI se construyó pensando en "Categorías" para ser fiel al diseño de Figma. Internamente, el servicio mapea los datos correctamente.

2.  **Manejo de Archivos**:
    Para la creación, noté que el endpoint acepta `multipart/form-data`. Implementé la subida del `icon` (archivo) y el `color` (hex) respetando este formato, aunque el backend valida principalmente que el archivo exista.

3.  **Arquitectura**:
    Separé el proyecto en `features` (lógica de negocio) y `components/ui` (presentacionales) para mantenerlo ordenado y escalable. Los estilos ahora viven en `src/styles` para no ensuciar los componentes.

## ✅ Tests Funcionales

Dejé un checklist con las pruebas principales en `QA_CHECKLIST.md` que cubren el login, listado, paginación y creación.

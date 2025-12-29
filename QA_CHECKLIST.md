# QA Checklist - Frontend

Lista de verificación funcional para asegurar que flujos críticos operen correctamente.

## Login

1. [x] **Carga inicial**: Entrar a `/login` muestra el formulario correctamente.
2. [x] **Validación de vacíos**: Botón "Ingresar" bloqueado o muestra error si username/password están vacíos.
3. [x] **Validación de email**: Muestra error si el usuario no tiene formato de correo.
4. [x] **Credenciales incorrectas**: Muestra alerta roja si el API retorna 401.
5. [x] **Login exitoso**: Redirige a `/categories` al recibir token 200 OK.
6. [x] **Persistencia**: Recargar la página mantiene la sesión activa.
7. [x] **Rutas protegidas**: Intentar entrar a `/categories` sin token redirige al login.

## Dashboard (Categorías)

8. [x] **Listado**: Carga la tabla consumiendo el endpoint `/admin-list`.
9. [x] **Paginación**: Botones anterior/siguiente funcionan y actualizan la tabla.
10. [x] **Buscador**: Filtra resultados (con _debounce_ de 500ms y fallback local).
11. [x] **Ordenamiento**: Clic en cabeceras (Nombre, Estado, Fecha) ordena la tabla.

## Crear Categoría

12. [x] **Modal**: Botón "Crear tipo" abre el modal limpio.
13. [x] **Inputs**:
    - [x] Nombre y descripción requeridos.
    - [x] Switch de estado funciona.
    - [x] Selección de color se sincroniza con el input hex.
    - [x] Input de archivo acepta imágenes (JPG, PNG, WEBP).
14. [x] **Envío**: Guardar cierra el modal, muestra alerta de éxito y refresca la tabla.

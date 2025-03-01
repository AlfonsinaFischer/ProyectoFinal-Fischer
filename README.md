Información de Usuarios

A continuación, se detallan los usuarios predefinidos en el sistema, junto con sus credenciales de acceso y roles correspondientes:

Usuarios Predefinidos

[
  {
    "id": "1",
    "name": "CharlesXavier",
    "email": "charlesxavier@email.com",
    "password": "12378",
    "role": "ADMIN",
    "accessToken": "token_admin_123"
  },
  {
    "id": "2",
    "name": "ScottSummers",
    "email": "ScottSummers@email.com",
    "password": "profesor123",
    "role": "TEACHER",
    "accessToken": "token_teacher_456"
  }
]

Roles de Usuarios

ADMIN: Tiene acceso completo a la administración del sistema, incluyendo la gestión de usuarios, cursos y estudiantes.

TEACHER: Puede gestionar cursos y estudiantes asociados a sus clases.

Información de Estudiantes

El sistema también almacena información sobre los estudiantes inscritos en los cursos. Los datos incluyen:

ID del estudiante

Nombre completo

Email de contacto

Cursos en los que está inscrito

La información de los estudiantes se almacena en una estructura similar a la siguiente:

[
  {
    "id": "101",
    "name": "JeanGrey",
    "email": "jeangrey@email.com",
    "courses": ["Matemáticas", "Física"]
  },
  {
    "id": "102",
    "name": "OroroMunroe",
    "email": "ororomunroe@email.com",
    "courses": ["Química", "Biología"]
  }
]

Uso del Sistema

Iniciar sesión con un usuario válido utilizando el email y la contraseña proporcionados.

Dependiendo del rol, se mostrarán diferentes opciones en el menú lateral.

Los administradores pueden gestionar usuarios, cursos y alumnos.

Los profesores pueden administrar sus cursos y estudiantes asignados.

Notas Importantes

La autenticación se maneja a través de accessToken asignados a cada usuario.

La información de usuarios y estudiantes se puede modificar en la base de datos o archivos de configuración según sea necesario.

Asegurar que los datos sean tratados de manera segura en un entorno de producción.


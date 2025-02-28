import { Course } from '../../courses/models';
import { Student } from '../../students/models';

/**
 * 📌 Representa una inscripción de un estudiante en un curso.
 */
export interface Enrollment {
  id: string;           // Identificador único de la inscripción
  studentId: string;    // ID del estudiante inscrito
  courseId: string;     // ID del curso en el que se inscribió

  // Opcionales: pueden ser útiles al recuperar datos completos en una consulta
  course?: Course;      // Datos completos del curso (opcional)
  student?: Student;    // Datos completos del estudiante (opcional)
}

import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';

@Pipe({
  name: 'fullName',
  standalone: false,
})
export class FullNamePipe implements PipeTransform {
  transform(value: Student | null | undefined): string {
    
    if (!value || !value.name || !value.lastName) {
      return 'Nombre desconocido';
    }
    
    return `${value.lastName.toUpperCase()}, ${value.name}`;
  }
}
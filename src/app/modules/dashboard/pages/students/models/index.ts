export interface IStudent {
  id: string;
  firstName: string;  
  lastName: string;
  fullName: string;  
  age?: number;       
  course?: string;    
  enrollmentDate?: Date; 
  isActive: boolean; 
}

export class Student implements IStudent {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public fullName: string,
    public age?: number,
    public course?: string,
    public enrollmentDate?: Date,
    public isActive: boolean = true 
  ) {}

  
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }


  getFormattedEnrollmentDate(): string {
    if (!this.enrollmentDate) return 'No disponible';
    return this.enrollmentDate.toLocaleDateString();
  }
}
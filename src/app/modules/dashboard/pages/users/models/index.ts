export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
  role: 'admin' | 'student' | 'teacher';
  permissions: string[]; 
}
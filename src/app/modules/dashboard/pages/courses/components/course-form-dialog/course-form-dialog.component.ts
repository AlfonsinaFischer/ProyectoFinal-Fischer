import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

interface CourseFormDialogData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss',
})
export class CourseFormDialogComponent {
  courseForm: FormGroup<{ name: FormControl<string> }>;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: CourseFormDialogData 
  ) {
    this.courseForm = this.fb.group({
      name: new FormControl(this.data?.editingCourse?.name ?? '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9\s]+$/), 
        ],
      }),
    });
  }

  get nameControl() {
    return this.courseForm.controls.name;
  }

  onConfirm(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    this.matDialogRef.close(this.courseForm.value);
  }

  onCancel(): void {
    this.matDialogRef.close(null);
  }
}

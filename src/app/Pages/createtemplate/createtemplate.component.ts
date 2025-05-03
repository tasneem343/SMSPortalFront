import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TemplatesService } from '../../Services/templates.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createtemplate',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './createtemplate.component.html',
  styleUrl: './createtemplate.component.css'
})
export class CreatetemplateComponent {
  CreateForm!: FormGroup;
  constructor(
    private snackbar:MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private _templateservice: TemplatesService
  ) {
    this.CreateForm = this.fb.group({
     title: ['',[ Validators.required, Validators.pattern('^[a-zA-Z ]{2,20}$')]],
     content: ['', [Validators.required]],
    });
  }


  userId:string = localStorage.getItem('userId')||''





  submit(): void {
    if (this.CreateForm.valid) {
      const formValue = this.CreateForm.value;

      const formData = new FormData();
      formData.append('title', formValue.title);
      formData.append('content', formValue.content);
      formData.append('createdbyuserId', this.userId);

      this._templateservice.AddTemplate(formData).subscribe({
        next: (response) => {
          this.snackbar.open('Template created Sucessfully !', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'end', // Horizontal position
            verticalPosition: 'top', // Vertical position
            panelClass: ['snackbar-success'], // Custom class for styling
          });
          console.log('template created:', response);
          this.router.navigate(['/templates']);
        },
        error: (err) => {
          console.error('Error creating template:', err);
        }
      });
    } else {
      this.CreateForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

}

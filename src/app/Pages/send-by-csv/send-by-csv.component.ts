import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TemplatesService } from '../../Services/templates.service';
import { ITemplate } from '../../Interfaces/ITemplate';
import { Router } from '@angular/router';
import { SendmessageService } from '../../Services/sendmessage.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-by-csv',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './send-by-csv.component.html',
  styleUrl: './send-by-csv.component.css'
})
export class SendByCSVComponent implements OnInit {
  ngOnInit(): void {
    this.GetALLTemplates();
  }

  SendForm!: FormGroup;
  templates!: ITemplate[];
  selectedFile: File | null = null;

  constructor(
    private snackbar:MatSnackBar,
    private _templateService: TemplatesService,
    private _sendmessage: SendmessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.SendForm = this.fb.group({
      file: [null, [Validators.required, this.csvFileValidator]],
      messageContent: ['', [Validators.required]],
      selectedTemplateId: ['']
    });
  }

  GetALLTemplates() {
    this._templateService.GetAllTemplates().subscribe({
      next: (response) => {
        this.templates = response;
        console.log(this.templates);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onTemplateSelected() {
    const selectedId = this.SendForm.get('selectedTemplateId')?.value;
    const selectedTemplate = this.templates.find(t => t.id === selectedId);

    if (selectedTemplate) {
      this.SendForm.patchValue({
        messageContent: selectedTemplate.content
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.SendForm.patchValue({
        file: file
      });
      this.SendForm.get('file')?.updateValueAndValidity();
    }
  }

  csvFileValidator(control: any) {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension !== 'csv') {
        return { invalidExtension: true };
      }
    }
    return null;
  }

  submit(): void {
    if (this.SendForm.valid && this.selectedFile) {
      const formValue = this.SendForm.value;
      const formData = new FormData();
      const userId = localStorage.getItem('userId') ?? '';

      formData.append('csvFile', this.selectedFile);
      formData.append('messageContent', formValue.messageContent);
      formData.append('senderUserId', userId);

      this._sendmessage.AddMessageCsv(formData).subscribe({
        next: (response) => {
            this.snackbar.open('Message Send Sucessfully !', 'Close', {
              duration: 3000, // Duration in milliseconds
              horizontalPosition: 'end', // Horizontal position
              verticalPosition: 'top', // Vertical position
              panelClass: ['snackbar-success'], // Custom class for styling
            });
          console.log('Message created:', response);
        },
        error: (err) => {
          console.error('Error creating message:', err);
        }
      });
    } else {
      this.SendForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}

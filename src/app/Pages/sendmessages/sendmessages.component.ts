import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../Services/templates.service';
import { Router } from '@angular/router';
import { ITemplate } from '../../Interfaces/ITemplate';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendmessageService } from '../../Services/sendmessage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sendmessages',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sendmessages.component.html',
  styleUrl: './sendmessages.component.css'
})
export class SendmessagesComponent implements OnInit{
ngOnInit(): void {
this.GetALLTemplates();
}
SendForm!: FormGroup;

templates!:ITemplate[]
constructor(private _templateService: TemplatesService,
  private snackBar:MatSnackBar,private _sendmessage:SendmessageService , private fb: FormBuilder,
  private router:Router) {
    this.SendForm = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^(010|011|015|012)\d{8}$/)
      ]],
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
  })}
  onTemplateSelected() {
    const selectedId = this.SendForm.get('selectedTemplateId')?.value;
    const selectedTemplate = this.templates.find(t => t.id === selectedId);

    if (selectedTemplate) {
      this.SendForm.patchValue({
        messageContent: selectedTemplate.content
      });
    }
  }
  submit(): void {
    if (this.SendForm.valid) {
      const formValue = this.SendForm.value;
      const formData = new FormData();
  const userId=localStorage.getItem('userId')??'';

  formData.append('phoneNumber','+2'+ formValue.phoneNumber.toString());
formData.append('messageContent', formValue.messageContent);

      formData.append('senderUserId', userId);

      this._sendmessage.AddMessage(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Message Send Sucessfully !', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'end', // Horizontal position
            verticalPosition: 'top', // Vertical position
            panelClass: ['snackbar-success'], // Custom class for styling
          });
          console.log('message created:', response);
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

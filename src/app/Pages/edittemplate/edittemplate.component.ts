import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITemplate } from '../../Interfaces/ITemplate';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TemplatesService } from '../../Services/templates.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edittemplate',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edittemplate.component.html',
  styleUrl: './edittemplate.component.css'
})
export class EdittemplateComponent implements OnInit {

userId=localStorage.getItem('userId')??''
template!:ITemplate
  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const templatedata = params['template'];
    if (templatedata) {
      try {
        this.template = JSON.parse(decodeURIComponent(templatedata));
      } catch (error) {
        console.error('Error parsing template data:', error);
      }
    }
  });
}
UpdateForm!: FormGroup;
  constructor(private route:ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _templateservice: TemplatesService
  ) {
    this.UpdateForm = this.fb.group({
     title: ['',[ Validators.required, Validators.pattern('^[a-zA-Z ]{2,20}$')]],
     content: ['', [Validators.required]],
    });
  }

  submit(): void {
    if (this.UpdateForm.valid) {
      const formValue = this.UpdateForm.value;


      const updatedTemplate: ITemplate = {
        id: this.template.id,
        title: formValue.title,
        content: formValue.content,
        updatedby:this.userId

      };

      this._templateservice.UpdateTemplate(updatedTemplate).subscribe({
        next: (response) => {
          console.log('template Updates:', response);
          this.router.navigate(['/templates']);
        },
        error: (err) => {
          console.error('Error Updating template:', err);
        }
      });
    } else {
      this.UpdateForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

}

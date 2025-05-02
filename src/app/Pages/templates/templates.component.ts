import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../Services/templates.service';
import { ITemplate } from '../../Interfaces/ITemplate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  imports: [],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})
export class TemplatesComponent implements OnInit {
  templates: ITemplate[] = [];
ngOnInit(): void {
this.GetALLTemplates();
}
constructor(private _templateService: TemplatesService,private router:Router) {  }
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

gotoedit(template:ITemplate){
  const templatedata = encodeURIComponent(JSON.stringify(template));
  this.router.navigate(['/edittemplate'], {
    queryParams: { template: templatedata }
  });
}

userId=localStorage.getItem('userId')??''
Deletetemplate(ID: number,) {
const deletedTemplate:ITemplate= {
id:ID,
deletedby:this.userId

}
  this._templateService.DeleteTemplate(deletedTemplate).subscribe({
    next: (response) => {
      console.log(response);
      this.GetALLTemplates();
    },
    error: (error) => {
      console.error(error);
    }
  });
}



}


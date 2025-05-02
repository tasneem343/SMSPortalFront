import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Services/report.service';
import { ILogs } from '../../Interfaces/ILogs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{

constructor(private _reportservice:ReportService) {
  
  
}
Logs!:ILogs[]
  ngOnInit(): void {
    this.GetAllActions();
  }
  GetAllActions() {
    this._reportservice.GetAllActions().subscribe({
      next: (response) => {
        this.Logs = response;
        console.log(this.Logs);
      },
      error: (error) => {
        console.error(error);
      }
    })}
  
  }


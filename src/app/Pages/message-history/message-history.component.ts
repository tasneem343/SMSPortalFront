import { Component, OnInit } from '@angular/core';
import { IMessageHistory } from '../../Interfaces/IMessageHistory';
import { MessageHistoryService } from '../../Services/message-history.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-history',
  imports: [DatePipe],
  templateUrl: './message-history.component.html',
  styleUrl: './message-history.component.css'
})
export class MessageHistoryComponent implements OnInit{
  Messages!:IMessageHistory[];
  
  constructor(private _messageHistoryService:MessageHistoryService ) {
    
  }
  ngOnInit(): void {
    this.GetAllMessages();
  }
  GetAllMessages() {
    this._messageHistoryService.GetAllMessages().subscribe({
      next: (response) => {
        this.Messages = response;
        console.log(this.Messages);
      },
      error: (error) => {
        console.error(error);
      }
    })}
  
  }


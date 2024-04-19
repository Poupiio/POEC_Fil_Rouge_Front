import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  template: `
   <div>
  <p *ngIf = "loggedInUser">welcome,{{loggedInUser}} </p>
  <app-button [title]="'Logout'"  (click)="logout()" ></app-button>
  </div>
   <div class="row">
  <div class="col-xs-6 col-6 col-md-5 col-lg-3">
    <bs-sortable
      [(ngModel)]="itemStringsLeft"
      itemClass="sortable-item"
      itemActiveClass="sortable-item-active"
      placeholderItem="Drag here"
      placeholderClass="placeholderStyle text-center"
      wrapperClass="sortable-wrapper"
    ></bs-sortable>
  </div>
  <div class="col-xs-6 col-6 col-md-5 col-lg-3">
    <bs-sortable
      [(ngModel)]="itemStringsRight"
      itemClass="sortable-item"
      itemActiveClass="sortable-item-active"
      placeholderItem="Drag here"
      placeholderClass="placeholderStyle text-center"
      wrapperClass="sortable-wrapper"
    ></bs-sortable>
  </div>
</div>
 
<div class='row'>
  <div class="col-xs-6 col-6 col-md-5 col-lg-3">
    <pre class="code-preview">model: {{ itemStringsLeft | json }}</pre>
  </div>
 
  <div class="col-xs-6 col-6 col-md-5 col-lg-3">
    <pre class="code-preview">model: {{ itemStringsRight | json }}</pre>
  </div>
</div>
  `,
  styles: [
  ]
})
export class TasksComponent implements OnInit {
  loggedInUser: string = "Ivan";
  itemStringsLeft: string[] = ['Item 1','Item 2', 'Item 3'];
  itemStringsRight: string[] = ['Item 4', 'Item 5'];


  constructor() { }

  ngOnInit(): void {
  }

  logout():void{
    this.loggedInUser = "";
   
  }

}

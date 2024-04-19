import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <div>
    <button type="button" class="btn btn-primary" (click)="onClickMe()" >
      {{title}}
    </button>
    <div class = "loader" *ngIf = "loading">
      <p>loading</p>

    </div>
  `,
  styles: [`
  
    .btn:hover {
      background-color: #6bdc24;
    }
    /* HTML: <div class="loader"></div> */
    .loader {
      margin-left: 10px;
      float: right;
      width: 25px;
      aspect-ratio: 1;
      display: grid;
      border: 3px solid #0000;
      border-radius: 50%;
      border-right-color: #101b0e;
      animation: l15 1s infinite linear;
    }
    .loader::before,
    .loader::after {    
      content: "";
      grid-area: 1/1;
      margin: 2px;
      border: inherit;
      border-radius: 50%;
      animation: l15 2s infinite;
    }
    .loader::after {
      margin: 8px;
      animation-duration: 3s;
    }
    @keyframes l15{ 
      100%{transform: rotate(1turn)}
    }`
  ]
})
export class ButtonComponent implements OnInit {
  @Output() onclick = new EventEmitter<void>();
  @Input() title : string = "";
  @Input() loading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onClickMe():void {
    this.onclick.emit();
  }

}

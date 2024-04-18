import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <div>
    <button type="button" class="btn btn-primary" (click)="onClickMe()" >
      {{title}}
    </button>
    </div>
  `,
  styles: [
  ]
})
export class ButtonComponent implements OnInit {
  @Output() onclick = new EventEmitter<void>();
  @Input() title : string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onClickMe():void {
    this.onclick.emit();
  }

}

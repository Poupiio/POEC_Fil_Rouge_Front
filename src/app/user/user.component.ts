import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-user',
  templateUrl: "./user.component.html",
  styleUrls: [ "./user.component.scss"
  ]
})
export class UserComponent implements OnInit {

  constructor(
    private authGuard: AuthGuard) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: "./user.component.html",
  styleUrls: [ "./user.component.scss"
  ]
})
export class UserComponent implements OnInit {

  userName: string = "";
  email: string = "";
  password: string = "";

  constructor(
    private authGuard: AuthGuard,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}

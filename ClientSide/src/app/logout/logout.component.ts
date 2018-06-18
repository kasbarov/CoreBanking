import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
    <p>
      logout works!
    </p>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(authService: AuthenticationService, private router: Router) {
    authService.logout();
    this.router.navigateByUrl('login');
   }

  ngOnInit() {
  }

}

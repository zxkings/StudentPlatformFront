import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() username!: string;
  @Output() usernameChange = new EventEmitter<String>();

  @Input() password!: string;
  @Output() passwordChange = new EventEmitter<String>();

  @Input()
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        console.log(this.errorMessage);
      }
    );
  }
  
  ChangePassword(value : string){
    this.password = value;
    this.passwordChange.emit(this.password);
  }
  ChangeUsername(value : string){
    this.username = value;
    this.usernameChange.emit(this.username); 
  }
  
}

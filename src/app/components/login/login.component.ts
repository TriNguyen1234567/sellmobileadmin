import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkserviceService } from '../../services/networkservice.service';
import { AuthService } from '../../services/auth.service';
import { notEmpty } from '../../utils/data.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: any[] = [];
  errormes: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private networkserviceService: NetworkserviceService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/';

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const username = this.f.username.value.toString();
    const password = this.f.password.value.toString();
    const user = this.authService.login(username, password);
    if (notEmpty(user)) {
      this.router.navigate([this.returnUrl]);
      localStorage.setItem('auth', 'sucessful');
      const {username, role} = user;
      localStorage.setItem('user', JSON.stringify({username, role}));
    } else {
      this.errormes = "Username or Password is invalid"
    }


  }
}

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

    const user = this.authService.login(this.f.username.value, this.f.password.value);
    if (notEmpty(user)) {
      this.router.navigate([this.returnUrl]);
      localStorage.setItem('auth', 'sucessful');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.errormes = "Username or Password is invalid"
    }


  }
}

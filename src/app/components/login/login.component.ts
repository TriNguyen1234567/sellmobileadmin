import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkserviceService } from '../../services/networkservice.service';

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
    get f() { return this.loginForm.controls; }

    onSubmit() {

   
            if (this.f.username.value === 'admin' && this.f.password.value === '123456') {
                console.log("ok")
                this.router.navigate([this.returnUrl]);
                localStorage.setItem('auth','sucessful')
            }
            else {
                this.errormes = "Username or Password is invalid"
            }
        

    }
}

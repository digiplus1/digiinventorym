import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../Service/LoginService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submittedRegister = false;
  is_loading = false;
  login: string = "";
  password: string = "";
  isTypePassword: boolean = true;

  constructor(public router: Router, public formBuilder: FormBuilder, public loginService: LoginService) {
  }

  ngOnInit() {
    this.initregister();
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  get g() {
    return this.registerForm.controls;
  }

  initregister() {
    this.registerForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }
    );
  }

  onRegister() {
    this.submittedRegister = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.is_loading = true;
    this.loginService.login(this.registerForm.value).subscribe(
      data => {
        this.is_loading = false;
        this.loginService.userLogin = data;
        localStorage.setItem('userLogin', JSON.stringify(this.loginService.userLogin));
        this.loginService.toastMessage("succes","toastsuccess")
        if (this.loginService.userLogin.type_utilisateur=='operateur'){
          this.router.navigateByUrl("menuoperateur/acceuil")
        }
      }, error => {
        this.is_loading = false;
        this.loginService.toastMessage(error.error.indication,"toasterror")
      }
    )
  }

  goToRegister() {
    this.router.navigateByUrl("/home/register")
  }
}

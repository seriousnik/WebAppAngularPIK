import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

export interface LoginValidate {
  Errors: string[];
  Success: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  form: FormGroup;
  loginMaxLength: number = 10;
  nameMaxLength: number = 15;
  LoginValidate: LoginValidate = new class implements LoginValidate {
    Errors: string[];
    Success: string;
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(`^[A-Za-z0-9]{0,${this.loginMaxLength-1}}[A-Za-z0-9]$`), 
          Validators.maxLength(this.loginMaxLength)
        ]
      ),
      firstName: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(`^[А-Я][а-я]{0,${this.nameMaxLength-1}}[а-я]$`),
          Validators.maxLength(this.nameMaxLength)
        ]
      ),
      lastName: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(`^[А-Я][а-я]{0,${this.nameMaxLength-1}}[а-я]$`),
          Validators.maxLength(this.nameMaxLength)
        ]
      )
      })
  }
  submit() {
    let login = this.form.get('login').value;
    this.http.get<LoginValidate>(`/api/IsLoginCorrect/${login}`) 
      .subscribe(response => {
        {
          this.LoginValidate = response;
          if (this.LoginValidate.Success != null)
            this.form.reset();
        }
      })
  }
}





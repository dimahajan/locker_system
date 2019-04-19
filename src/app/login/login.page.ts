import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../global-variable.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    email:string;
    pass:string;

    constructor(private router: Router, private http: Http,public gv : GlobalVariableService, public toastController: ToastController) { }


    ngOnInit() {
    }

    async FormReg(msg){
        let toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'top',
        });
        return await toast.present();
    }

    signIn(){
        let par = {email: this.email, password: this.pass};
        let headers = new Headers({
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        let options = {headers:headers};
        this.http.post("http://127.0.0.1/user_lgin.py", 'email='+ this.email +"&password="+this.pass, options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    this.gv.user = data;
                    this.FormReg('Login Successfully');
                    this.router.navigateByUrl('/locker');
                } else {
                        this.FormReg('Invalid credentials for Login');
                }
            },(e)=>{
                this.FormReg('Invalid credentials for Login');
            });
        }
}

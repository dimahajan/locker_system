import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GlobalVariableService {

    url = "http://localhost/";
    student_locker_info : any = [];
    locker_info : any = [];
    active_students_data : any = [] ;
    cubured_info_data : any = [];
    cupboard_info_data:any = [];
    expired_locker_data : any =[];
    user : any = null;
    lk_id_ls : any = null;
    cb_data : any = null;
    student_info_data : any= [];
    no_of_locker : number = 0;
    no_of_student_assign_locker: number = 0;
    no_of_student_not_assign_locker: number = 0;
    assign_locker_data : any;
    cb_ids : any = [];
    headers = new Headers({
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
    });

    options = {headers:this.headers};
    constructor(private router: Router, private http: Http, public toastController: ToastController) { }

    async FormReg(msg){
        let toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'top',
        });
        return await toast.present();
    }

    getActiveStudents(){
        this.http.get(this.url + "active_students_not_assign_locker.py" , this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    this.active_students_data = data;
                }
            },(e)=>{
                this.FormReg('Some Error');
            });
    }

    assignLocker(cb_id, lk_id, roll_no, from, upto){
        this.http.post(this.url + "assign_locker.py ", 'cb_id=' + cb_id + '&lk_id=' + lk_id + '&roll_no=' + roll_no + '&from_date=' + from + '&upto_date=' + upto, this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    this.assign_locker_data = data;
                    this.getCuburdInfo();
                }
            },(e)=>{
                this.FormReg('Some Error');
            });
    }

    getLockerByCupbord(cb_id, std){
        this.http.post(this.url + "locker_info.py", "cb_id="+ cb_id+"&std="+std , this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    if(std=='N'){
                        this.lk_id_ls = [];
                        this.locker_info = data;
                        this.locker_info.forEach(d => d.assigned ? d : this.lk_id_ls.push(d.lk_id));
                    } else {
                        this.cupboard_info_data = data;
                    }
                }
            },(e)=>{
                this.FormReg('Some Error');
            });
    }

    getCbIds(){
        this.cb_ids = [];
        this.cubured_info_data.forEach(d => {
            if(d.no_of_student_assign != d.no_of_locker){
               this.cb_ids.push(d.cb_id);
            }
        });
    }

    getCuburdInfo(){
        this.http.get(this.url + "cuburd_info.py",  this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){

                    this.cubured_info_data = data;
                    this.getCbIds();
                    this.no_of_locker  = 0;
                    this.no_of_student_assign_locker = 0;
                    this.no_of_student_not_assign_locker = 0;
                    data.forEach(d => {
                        this.no_of_locker += d.no_of_locker;
                        this.no_of_student_assign_locker += d.no_of_student_assign;
                    });
                    this.getStudentInfo();
                }
            },(e)=>{
                this.FormReg('Some Error');
            });
    }

   getExpiredDataInfo(){
        this.http.post(this.url + "expired_locker.py", 'day='+ 15 , this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    this.expired_locker_data = data;
                }
            },(e)=>{
                this.FormReg('Some Error');
            });
    }

    getStudentInfo(){
        this.http.post(this.url + "student_info.py", "for=all" , this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    this.student_info_data = data;
                    this.no_of_student_not_assign_locker = data.length - this.no_of_student_assign_locker;
                }
            },(e)=>{
                this.FormReg('Some Error');
            });

    }

    getStudentLockerInfo(roll_no){
        this.http.post(this.url + "get_cb_lk_by_student.py", "roll_no=" + roll_no , this.options)
            .map(res=> res.json())
            .subscribe(data=>{
                if(data){
                    this.student_locker_info = data;
                }
            },(e)=>{
                this.FormReg('Some Error');
            });
    }


}

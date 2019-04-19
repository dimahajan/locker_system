import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../global-variable.service';
import * as moment from 'moment';

@Component({
    selector: 'app-assign',
    templateUrl: './assign.page.html',
    styleUrls: ['./assign.page.scss'],
})
export class AssignPage implements OnInit {
    cb_ids = [];
    cb_id:any = null;
    lk_id:number;
    imgPath = "./img/adam.jpg";
    from_date:any;
    upto_date:any;
    yesterday = new Date();
    roll_no:any;
    constructor(private router: Router, private http: Http, public gv : GlobalVariableService, public toastController: ToastController) {
    }

    ngOnInit() {
        if(!this.gv.user){
            this.router.navigateByUrl('/login');
        }else{
            if(!this.gv.cubured_info_data.length){
                this.gv.getCuburdInfo();
            }
            if(this.gv.cb_data){
                this.cb_id = this.gv.cb_data['cb_id'];
                this.updateCbId();
                this.gv.cb_data = null;
            }
            if(!this.gv.active_students_data.length){
                this.gv.getActiveStudents();
            }
        }
    }

    nullAll(){
        this.lk_id = null;
        this.roll_no = null;
        this.from_date = null;
        this.upto_date = null;
    }

    updateCbId(){
        this.gv.getLockerByCupbord(this.cb_id,'N');
        this.nullAll();
    }

    updateLkId(){
    }

    updateRollNo(){
        this.gv.active_students_data.forEach(std => {
            if(std.roll_no == this.roll_no){
                this.imgPath= std.img;
            }
        });
        console.log(this.roll_no, this.gv.active_students_data);
        this.imgPath = this.gv.url + this.imgPath;
    }

    assign(){
        let from = moment(this.from_date).format('YYYY-MM-DD');
        let upto = moment(this.upto_date).format('YYYY-MM-DD');
        this.gv.assignLocker(this.cb_id, this.lk_id, this.roll_no, from, upto);
        this.nullAll();
        this.cb_id = null;
    }
}

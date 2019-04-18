import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../global-variable.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

    cb_id:any = null;
    roll_no:any = null;
    constructor(private router: Router, public gv : GlobalVariableService) { }

    ngOnInit() {
      if(!this.gv.user){
          this.router.navigateByUrl('/login');
      } else {
          if(!this.gv.student_info_data)
              this.gv.getStudentInfo();
      }
    }

    getCupboardData(){
        this.gv.getLockerByCupbord(this.cb_id, 'Y');
    }

    getStudentLockerData(){
        this.gv.getStudentLockerInfo(this.roll_no);
    }
}

import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../global-variable.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-locker',
    templateUrl: './locker.page.html',
    styleUrls: ['./locker.page.scss'],
})
export class LockerPage implements OnInit {

    yesterday = new Date();
    from_date:any = null;
    upto_date:any = null;
    MANY_ITEMS = 'MANY_ITEMS';
    edit = 'enable';

    subs = new Subscription();
    cb_id:any;
    constructor(private dragulaService: DragulaService, private router: Router, private http: Http, public gv : GlobalVariableService, public toastController: ToastController) {

        this.subs.add(dragulaService.dropModel(this.MANY_ITEMS)
                      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {


                          if(item['lk_id']){
                              el.outerHTML='';
                              sourceModel[0] = {'lk_id': item['lk_id'], 'roll_no':0};
                              targetModel.forEach(d => {
                                  if(d['lk_id'] && d['roll_no']){
                                      if(d['from_date']){
                                          this.deleteLocker(d);
                                          delete d['from_date'];
                                          delete d['upto_date'];
                                      }
                                      delete d['lk_id'];
                                  } else if(!d['roll_no']){
                                      if(targetModel[0]['name']){
                                          targetModel[0]['lk_id'] = d['lk_id'];
                                      } else {
                                          targetModel[1]['lk_id'] = d['lk_id'];
                                          targetModel[0] = targetModel[1];
                                          targetModel = [targetModel[0]];
                                      }
                                  }
                              });
                          } else if(targetModel[1]['lk_id']){
                              item['lk_id'] = targetModel[1]['lk_id'];
                              targetModel = [item];
                          } else if(targetModel[0]['lk_id']) {
                              item['lk_id'] = targetModel[0]['lk_id'];
                              targetModel[0] = item;
                              targetModel = [item];
                          }
                      })
                     );
    }

    deleteLocker(loc){
        let from = moment(loc.from_date).format('YYYY-MM-DD');
        let upto = moment(loc.upto_date).format('YYYY-MM-DD');
        this.gv.deleteLocker(this.cb_id, loc.lk_id, loc.roll_no, from, upto);
    }

    dateChange(loc){
        loc[0]['edit'] = true;
    }



    edit1(loc){
        let from = moment(loc.from_date).format('YYYY-MM-DD');
        let upto = moment(loc.upto_date).format('YYYY-MM-DD');
        this.gv.editLocker(this.cb_id, loc.lk_id, loc.roll_no, from, upto);
        loc['edit'] = false;
    }

    assign(data){
        let from = moment(this.from_date).format('YYYY-MM-DD');
        let upto = moment(this.upto_date).format('YYYY-MM-DD');
        data['from_date'] = this.from_date;
        data['upto_date'] = this.upto_date;
        this.gv.assignLocker(this.cb_id, data.lk_id, data.roll_no, from, upto);
        this.from_date = null;
        this.upto_date = null;
    }

    ngOnInit() {
        if(!this.gv.user){
            this.router.navigateByUrl('/login');
        } else {
            this.gv.getActiveStudents();
            this.gv.getCuburdInfo();
            this.gv.getExpiredDataInfo();
        }
    }

    updateCbId(){
        this.gv.getLockerByCupbord(this.cb_id,'Y');
    }

    ngOnDestroy() {
        this.dragulaService.destroy('COLUMNS');
    }

    assignCupboard(cb_data){
        this.gv.cb_data = cb_data;
        this.router.navigateByUrl('/assign');
    }
}

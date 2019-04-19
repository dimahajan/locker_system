import MySQLdb
import  sys,time, os
import json
from config_path import data
import datetime
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
        now_date =  datetime.datetime.now()
        day = int(req.form['day'])
        expire_date = str(now_date + datetime.timedelta(days=day))
	cursor = db.cursor()
        s = "select a.roll_no, upto_date, cb_id, lk_id, name from (select roll_no, upto_date, cb_id, lk_id from locker_issues where upto_date >'%s' and upto_date < '%s') as a JOIN (select name,roll_no from student where roll_no in (select roll_no from locker_issues where upto_date >'%s' and upto_date < '%s')) as b ON a.roll_no = b.roll_no" %(str(now_date), expire_date,str(now_date), expire_date);
	cursor.execute(s);

	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))
        return  json.dumps(json_data, indent=4, default=str)

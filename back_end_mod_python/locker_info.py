import MySQLdb
import json
from config_path import data
import datetime

def add(self, key, val):
        self[key] = val

def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        s = "select lk_id from locker where cb_id=%s;"%(req.form['cb_id']);
	cursor.execute(s);

	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rvs = cursor.fetchall()
        json_data=[]
        for result in rvs:
                json_data.append(dict(zip(row_headers,result)))
  
        s = "select lk_id from locker_issues where cb_id=%s and upto_date > '%s';"%(req.form['cb_id'], str(datetime.datetime.now()));
	cursor.execute(s);
        rv = cursor.fetchall()
        rv = [i[0] for i in rv]
        [add(data1,'assigned', True) if int(data1['lk_id']) in rv else add(data1,'assigned', False) for data1 in json_data]

        if(req.form['std']=='Y'):
                s = "select lk_id, a.roll_no, name, from_date, upto_date from (select name, roll_no from student where roll_no in (select roll_no from locker_issues where cb_id=%s and upto_date > '%s')) as a JOIN (select roll_no, lk_id, from_date, upto_date from locker_issues where cb_id=%s and upto_date > '%s') as b ON a.roll_no = b.roll_no;"%(req.form['cb_id'], str(datetime.datetime.now()), req.form['cb_id'], str(datetime.datetime.now()));
	        cursor.execute(s);

	        row_headers=[x[0] for x in cursor.description] #this will extract row headers
                rv = cursor.fetchall()
                json_data1=[]
                for result in rv:
                        json_data1.append(dict(zip(row_headers,result)))
                ids = [dt['lk_id'] for dt in json_data1]
                rvs = [i[0] for i in rvs]
                ls = []
                for rs in rvs:
                        for jd in json_data1:
                                if(rs == jd['lk_id']):
                                       ls.append(jd)
                                       break
                        if(rs not in ids):
                                ls.append({'lk_id': rs, 'roll_no': 0})
                json_data = ls
        return  json.dumps(json_data, indent=4, sort_keys=True, default=str)

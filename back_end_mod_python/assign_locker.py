import MySQLdb
import json
from config_path import data
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        s = "insert into locker_issues(cb_id, lk_id, roll_no,from_date, upto_date) values(%s,%s,%s,'%s','%s');" % (req.form['cb_id'], req.form['lk_id'], req.form['roll_no'], req.form['from_date'], req.form['upto_date']);
	cursor.execute(s);
        db.commit();
        s = "select * from locker_issues order by lk_issues_id desc limit 1;"
        cursor.execute(s);
        
	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))
        return  json.dumps(json_data[0], indent=4, sort_keys=True, default=str)

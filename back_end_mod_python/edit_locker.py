import MySQLdb
import json
from config_path import data
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        s = "update locker_issues set from_date= '%s' , upto_date = '%s' where roll_no=%s;" % ( req.form['from_date'], req.form['upto_date'], req.form['roll_no'])
	cursor.execute(s);
        db.commit();
        s = "select * from locker_issues where roll_no=%s;"%(req.form['roll_no'])
        cursor.execute(s);
        
	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))
        return  json.dumps(json_data[0], indent=4, sort_keys=True, default=str)

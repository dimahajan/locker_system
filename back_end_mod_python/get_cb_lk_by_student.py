import MySQLdb
import json
from config_path import data
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        s = "select cb_id, lk_id, from_date, upto_date from locker_issues where roll_no = %s;"%(req.form['roll_no']);
	cursor.execute(s);

	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))
        return  json.dumps(json_data, indent=4, sort_keys=True, default=str)

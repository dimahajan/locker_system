import MySQLdb
import json
from config_path import data
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        s = "select roll_no, name, img from student, imgpath where status_id = (select status_id from status where status_name = 'active') and roll_no not in (select roll_no from locker_issues) and student.roll_no = imgpath.rollno;";
	cursor.execute(s);

	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))
        return  json.dumps(json_data, indent=4, sort_keys=True, default=str)

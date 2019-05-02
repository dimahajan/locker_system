import MySQLdb
import json
from config_path import data
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        s = "delete from locker_issues where roll_no = %s;" % (req.form['roll_no']);
	cursor.execute(s);
        db.commit();
        return  json.dumps([], indent=4, sort_keys=True, default=str)

import MySQLdb
import  sys,time
import json
from config_path import data
def index(req):
        
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()
        if(req.form['for'] == 'all'):
                cursor.execute("select roll_no,name from student where status_id = (select status_id from status where status_name='active') ;")
        else:
                cursor.execute("select roll_no,name from student where roll_no in %s;" % (str(req.form['roll_nos'])))
	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result))) 
        return  json.dumps(json_data, indent=4, sort_keys=True, default=str)

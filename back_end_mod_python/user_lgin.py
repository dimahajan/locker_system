import MySQLdb
import  sys,time, mod_python
import json
from config_path import data

def index(req):
        db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
        cursor = db.cursor()
        s = """select * from user where email='%s' and password='%s'""" % (req.form['email'],req.form['password'])
        cursor.execute(s);
        row_headers=[x[0] for x in cursor.description] #this will extract row headers
	rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                 json_data.append(dict(zip(row_headers,result)))
        return  json.dumps(json_data[0], indent=4)

import MySQLdb
import json
from config_path import data
import datetime

def add(self,key,val):
        self[key]= val
def index(req):
	db = MySQLdb.connect("localhost",data.mysql_user,data.mysql_pswd,data.database)
	cursor = db.cursor()

        s = "select cb_id,count(*) as no_of_locker, sum(max_shared) as no_of_student from locker group by cb_id;";
        cursor.execute(s);
        
	row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
                json_data.append(dict(zip(row_headers,result)))

        s = "select cb_id,count(*) as no_of_student_assign from locker_issues where upto_date > '%s' group by cb_id;"%(str(datetime.datetime.now()));
        cursor.execute(s);
        
        row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data1=[]
        for result in rv:
                json_data1.append(dict(zip(row_headers,result)))

        for data2 in json_data:
                flag = True;
                for data1 in json_data1:
                        if(data2['cb_id']==data1['cb_id']):
                                add(data2,'no_of_student_assign',data1['no_of_student_assign'])
                                flag = False
                                break;
                if(flag):
                        add(data2,'no_of_student_assign',0)
        return  json.dumps(json_data , indent=4, sort_keys=True, default=str)

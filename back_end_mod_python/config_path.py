import MySQLdb
import datetime;
import imp

f = open('/var/www/html/config.txt')
global data
data = imp.load_source('data', '', f)
print data

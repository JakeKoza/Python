import pymssql

class LoadService:

    def __init__(self):
        self.user='winserv16\Administrator'
        self.password =''
        self.database = 'Thesis'
        self.server='192.168.0.104'

        try{
            self.conn - pymssql.connect(self.sever, self.user, self.password, self.database)
        }except Exception as e{
            print e
        }
        self.cursor = self.conn

    def load_data(self, **kwargs):
        self.PagePath = kwarg['url']
        self.ISOWeek = kwarg['isoweek']
        self.Year = kwarg['year']
        self.PageViews = kwarg['views']

        self.conn.execute("INSERT INTO PageViews(PagePath, ISOWeek, Year, PageViews) VALUES ('{}',{},'{}',{})".format(self.PagePath, self.ISOWeek, self.Year, Self.PageViews))

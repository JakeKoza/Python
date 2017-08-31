import re
from pymongo import MongoClient;

class QueryController:
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client.Thesis
    
    def getData(self, week):
        #yield self.db[week].find()
        for i in self.db[week].find():
            yield i
            #print i['url'] + " " + str(i['pageviews']);
    
    def stripData(self, data):
        pass
    
    def main(self):
        self.current = self.getData("04");
        self.previous = self.getData("03");
        self._next = self.getData("05")
        for i in self.current:
            if (i['url']
        #for i in self.current:
            #print i['url']

if __name__ == '__main__':
    cont = QueryController()
    cont.main()
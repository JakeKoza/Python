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
        self.current = self.getData("04")
        self._next = self.getData("05")
        curr_list = []
        for i in self.current:
            curr_list.append(i['url'])
        print curr_list
if __name__ == '__main__':
    cont = QueryController()
    cont.main()
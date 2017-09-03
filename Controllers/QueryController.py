import re
from pymongo import MongoClient

class QueryController:
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client.Thesis
    
    def GetData(self, week):
        #yield self.db[week].find()
        for i in self.db[week].find().sort([("pageviews", -1)]):
            yield i
            #print i['url'] + " " + str(i['pageviews']);
    
    def StripData(self, dataToStrip):
        dataToStrip = str(dataToStrip)
        strippedData = dataToStrip.split("/")
        print strippedData[1:2]
    
    def main(self):
        #testing = str("\\admissions\\default.aspx\\")
        #print testing
        #self.StripData(testing)
        #testing = testing.split("\\")
        #print testing[1:2]
        self.current = self.GetData("04")
        self._next = self.GetData("05")
        curr_list = []
        next_list = []
        only_in_next = []
        in_both = []
        for i in self.current:
            #print i['url']
            #print type(str(i['url']))
            #data = str(i['url'])
            #self.StripData(data)
            curr_list.append(i['url'])
        for i in self._next:
            next_list.append(i['url'])
        only_in_next = list(set(next_list) - set(curr_list))
        in_both = list(set(curr_list) & set(next_list))
        #for i in only_in_next:
        #   print i
        for i in in_both:
            print i
        

if __name__ == '__main__':
    cont = QueryController()
    cont.main()
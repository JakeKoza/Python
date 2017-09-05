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
        return "".join(str(e) for e in strippedData[1:2])
        #return str(strippedData[1:2])

    def ItemsInBoth(self, currWeek, nextWeek):
        in_both = list(set(currWeek) & set(nextWeek))
        return in_both[0:4]

    def ItemsInNextWeek(self, currWeek, nextWeek):
        only_in_next = list(set(nextWeek) - set(currWeek))
        return only_in_next[0:3]
    
    def main(self):
        
        self.current = self.GetData("05")
        self._next = self.GetData("06")
        curr_list = []
        next_list = []
        only_in_next = []
        in_both = []
        for i in self.current:
            curr_list.append(i['url'])

        for i in self._next:
            next_list.append(i['url'])
       
        print "Items in Next"
        only_in_next_json = []
        only_in_next = self.ItemsInNextWeek(curr_list, next_list)
        for i in only_in_next:
            i = self.StripData(i)
            print i
            only_in_next_json.append({"next": i})
        print only_in_next_json
        
        print "Items in Both"
        in_both_json = []
        in_both = self.ItemsInBoth(curr_list, next_list)
        for i in in_both:
            i = self.StripData(i)
            in_both_json.append({"both": i})
            print i
        print in_both_json
        
        

if __name__ == '__main__':
    cont = QueryController()
    cont.main()
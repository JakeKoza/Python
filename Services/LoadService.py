import argparse
import sys
import logging

from apiclient.errors import HttpError
from apiclient.discovery import build
from appengine.api import memcache, urlfetch
from oauth2client.client import AccessTokenRefreshError
from oauth2client.appengine import AppAssertionCredentials
from httplib2 import Http
from datetime import date, timedelta, datetime

api_key = ""
cache_time = timedelta(days=5)
query_range = timedelta(days=14)
maxRankingURLs = 30

class LoadService:
    def __init__(self, table, date = None):
        if date is not None:
            self.today = date
        else:
            self.today = datetime.today()

        urlfetch.set_default_fetch_deadline(60)

        global api_key
        if api_key == "":
            with open () as keyfile:
                api_key=keyfile.read().replace('\n','')

        # Set query range
        self.startdate = self.today - query_range
        self.expdate = self.today - cache_time

        credentials = AppAssertionCredentials(scope='https://www.googleapis.com/auth/analytics.readonly')
        http_auth = credentials.authorize(Http(memcache))
        self.service = build('analytics', 'v3', http=http_auth, developerKey=api_key)
        self.table_id = table

    def get_popular_pages(selfself, url):
        

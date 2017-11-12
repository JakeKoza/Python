"""Hello Analytics Reporting API V4."""

import argparse

from apiclient.discovery import build
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools
#import pymssql
import re
from pymongo import MongoClient
#import LoadService

SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
DISCOVERY_URI = ('https://analyticsreporting.googleapis.com/$discovery/rest')
CLIENT_SECRETS_PATH = 'client_secrets.json' # Path to client_secrets.json file.
VIEW_ID = '991324'


def initialize_analyticsreporting():
  """Initializes the analyticsreporting service object.

  Returns:
    analytics an authorized analyticsreporting service object.
  """
  # Parse command-line arguments.
  parser = argparse.ArgumentParser(
      formatter_class=argparse.RawDescriptionHelpFormatter,
      parents=[tools.argparser])
  flags = parser.parse_args([])

  # Set up a Flow object to be used if we need to authenticate.
  flow = client.flow_from_clientsecrets(
      CLIENT_SECRETS_PATH, scope=SCOPES,
      message=tools.message_if_missing(CLIENT_SECRETS_PATH))

  # Prepare credentials, and authorize HTTP object with them.
  # If the credentials don't exist or are invalid run through the native client
  # flow. The Storage object will ensure that if successful the good
  # credentials will get written back to a file.
  storage = file.Storage('analyticsreporting.dat')
  credentials = storage.get()
  if credentials is None or credentials.invalid:
    credentials = tools.run_flow(flow, storage, flags)
  http = credentials.authorize(http=httplib2.Http())

  # Build the service object.
  analytics = build('analytics', 'v4', http=http, discoveryServiceUrl=DISCOVERY_URI)

  return analytics

def get_report(analytics):
  # Use the Analytics Service Object to query the Analytics Reporting API V4.
  return analytics.reports().batchGet(
      body={
        'reportRequests': [
        {
          'viewId': VIEW_ID,
          'dateRanges': [
			{'startDate': '2016-01-01', 
			'endDate': '2016-12-31'}
			],
          'metrics': [
			{'expression': 'ga:pageviews'}
			],
          'dimensions': [
			{'name':'ga:pagePath'},
			{'name': 'ga:week'}
			],
          'orderBys': [{'fieldName': 'ga:pageviews',
                        'sortOrder': 'DESCENDING' }],
          'pageSize': 10000 
		  #'dimensionFilterClauses': [
			#{"operator": "AND",
			#'filters': [
			#	{'dimensionName': 'ga:pageviews', 
			#	'operator': "NUMERIC_GREATER_THAN", 
			#	'expressions': ["10"]}
			#	]}
			#]'''
        }]
      }
  ).execute()


def print_response(response):
  """Parses and prints the Analytics Reporting API V4 response"""

  for report in response.get('reports', []):
    columnHeader = report.get('columnHeader', {})
    dimensionHeaders = columnHeader.get('dimensions', [])
    metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])
    rows = report.get('data', {}).get('rows', [])

    for row in rows:
      dimensions = row.get('dimensions', [])
      dateRangeValues = row.get('metrics', [])

      for header, dimension in zip(dimensionHeaders, dimensions):
        print header + ': ' + dimension

      for i, values in enumerate(dateRangeValues):
        #print 'Date range (' + str(i) + ')'
        for metricHeader, value in zip(metricHeaders, values.get('values')):
          print metricHeader.get('name') + ': ' + value

def print_query(response, week):
	for report in response.get('reports', []):
		columnHeader = report.get('columnHeader', {})
		dimensionHeaders = columnHeader.get('dimensions', [])
		metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])
		rows = report.get('data', {}).get('rows', [])

		for row in rows:
			url, isoweek = row.get('dimensions', [])
			dateRangeValues = row.get('metrics', [])
			
			for i, values in enumerate(dateRangeValues):
				#print 'Date range (' + str(i) + ')'
				for metricHeader, value in zip(metricHeaders, values.get('values')):
					#if(week == int(float(isoweek))):
						if(int(value) > 100):
							print "URL: " + url + ' Views: ' + value + " ISOWeek: " + isoweek
					#if(bool(re.match(r"default*", url))):
						#print "URL: " + url + ' Views: ' + value + " ISOWeek: " + isoweek


def add_to_dict(response):
	client = MongoClient("mongodb://localhost:27017")
	db = client.Thesis
	for report in response.get('reports', []):
		columnHeader = report.get('columnHeader', {})
		dimensionHeaders = columnHeader.get('dimensions', [])
		metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])
		rows = report.get('data', {}).get('rows', [])

		for row in rows:
			url, isoweek = row.get('dimensions', [])
			dateRangeValues = row.get('metrics', [])

			for i, values in enumerate(dateRangeValues):
				#print 'Date range (' + str(i) + ')'
				for metricHeader, value in zip(metricHeaders, values.get('values')):
				        #db = client["Week"+isoweek+"Year2016"]
					db[isoweek].insert_one({"url": url, "pageviews" : int(value), "isoweek": isoweek})
					#print "URL: " + url + ' Views: ' + value + " ISOWeek: " + isoweek
                    			#LoadService.load_data(url = url, isoweek = isoweek, views = views, year = '2016')

def main():

  analytics = initialize_analyticsreporting()
  response = get_report(analytics)
  #print_response(response)
  add_to_dict(response)
  #print_query(response, 35)
  #print(response)

if __name__ == '__main__':
	main()

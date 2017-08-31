var array = '[{"selector": "prev", "url": "/president/"},{"selector": "prev", "url": "/student-affairs/"},{"selector": "next", "url": "/housing/"},{"selector": "next", "url": "/onestop/"},{"selector": "both", "url": "/brooks/"},{"selector": "both", "url": "/info/"}]';
var array2 = '[{"selector": "next", "url": "default.aspx"}]';
JSON.parse(array);
updateLinks(array);
updateLinks(JSON.parse(array));

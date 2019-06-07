# hashtag_tracker
Google Apps Script connected to spreadsheet that follows trending hashtags / hashtags we use on Instagram and Twitter

# Twitter Location Trends API

This API uses OAuth1 to generate the access keys and give access to the API. For the complete documentation on this library, <a href="https://github.com/gsuitedevs/apps-script-oauth1">click here</a>. Add the library key while in your Apps Script editor by going to Resources > Libraries and add the following:
```1CXDCY5sqT9ph64fFwSzVtXnbjpSfWdRymafDrtIZ7Z_hwysTY7IIhi7s```
Once this is added, you can begin to build out the OAuth1 flow -- for this, reference the documentation already mentioned as well as the ```twitterOAuth1.gs``` file in this repo.

Be sure to set up the callback URL as well in both your script as well as in your <a href="https://developer.twitter.com/en/dashboard">app's dashboard on Twitter</a>.

Digging into the Script
-
For this specific Twitter API, you will need a WOEID, which <a href="http://woeid.rosselliot.co.nz/lookup/minneapolis%20%20mn">you can find here</a>. The WOEID number you receive for your desired location will be added to the end of the API endpoint:

```var url = "https://api.twitter.com/1.1/trends/place.json?id=<YOUR WOEID HERE>```

In this script, I have set up a basic if/else function that references the spreadsheet to work with a few different locations based on a cell's value:

```function makeRequest() {
    var twitterService = getTwitterService();
  
    var base =  'https://api.twitter.com/1.1/trends/place.json?id=';

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Trending: Twitter Hashtags by Location');
    var range = sheet.getRange(4, 1, 2)
  
    // '2427032'WOEID for Indianapolis, IN
    if (range.activate().getValue() === 'Minneapolis, MN') {
      var woeid = '2452078';
    } else if (range.activate().getValue() === 'Indianapolis, IN') {
      var woeid = '2427032';
    } else if (range.activate().getValue() === 'Chicago, IL') {
      var woeid = '2379574';
    };
  
    var url = base + woeid;
    Logger.log(url);```

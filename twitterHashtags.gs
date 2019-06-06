function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Import Social Data')
    .addItem('Twitter: Location-Based Trending #s', 'showSidebar')
    .addToUi();
}

function makeRequest() {
  var twitterService = getTwitterService();
  
  var base =  'https://api.twitter.com/1.1/trends/place.json?id=';

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Trending: Twitter Hashtags by Location');
  var range = sheet.getRange(4, 1, 2)
  
  if (range.activate().getValue() === 'Minneapolis, MN') {
    var woeid = '2452078';
  } else if (range.activate().getValue() === 'Indianapolis, IN') {
    var woeid = '2427032';
  } else if (range.activate().getValue() === 'Chicago, IL') {
    var woeid = '2379574';
  };
  
  var url = base + woeid;
  Logger.log(url);
  
  var response = twitterService.fetch(url);
  //Logger.log(response);
  
  var data = JSON.parse(response.getContentText());
  //Logger.log(JSON.stringify(data[0].trends[0].name));
  
  toSheet(data);
}

function toSheet(data) {
  var row = [];
  var date = Utilities.formatDate(new Date(), "CDT", "MMMM dd, YYYY' T'HH:mm:ss'Z'");
  
  for (var key in data[0].trends) {
    var hash = data[0].trends[key].name;
    var hashURL = data[0].trends[key].url;
    var volume = data[0].trends[key].tweet_volume;
   // var hashPromo = data[0].trends[key].promoted_content;
    Logger.log(key, hash, hashURL, volume)
    
    row.push([date, hash, hashURL, volume]);
  }
  
  Logger.log(row);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Trending: Twitter Hashtags by Location');
  sheet.getRange("A7:E61").clearContent(); // remove old hashtags to be replaced w/new ones
  
  var newRange = sheet.getRange(7,1, row.length, row[0].length).setValues(row);
  
  sheet.appendRow(row[0]);
}

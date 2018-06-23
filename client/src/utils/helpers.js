exports.buildQueryURL = function(searchTerm, startYear, endYear) {
  var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

  //api key
  queryURL += '?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931';
  //search term
  if (searchTerm) queryURL += '&q=' + searchTerm;
  //start year
  if (startYear && parseInt(startYear))
    queryURL += '&begin_date=' + startYear + '0101';
  //end year
  if (endYear && parseInt(endYear)) queryURL += '&end_date=' + endYear + '0101';

  return queryURL;
};

exports.parseArticles = function(response) {
  const docs = response.data.response.docs;
  const articles = [];
  docs.forEach(d => {
    articles.push({
      title: d.headline.main,
      date: d.pub_date,
      url: d.web_url,
    });
  });
  return articles;
};

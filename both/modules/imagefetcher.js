/*
 * Method to return only the urls of the images
 *
 * @param {Channel} the channel to grab the query from
 * @param {page} the page you want to return
 * @return {String[]} an array of urls
 */
let urlsOnly = (channel, page) => {
  // Grabs the necessary packages
  var GoogleImages = Meteor.npmRequire('google-images');
  var Future = Meteor.npmRequire('fibers/future');

  // We need to make a Future object because the search async call needs to be synchronous
  var fut = new Future();
  var options = new Object();
  options.callback = function(err, images) {
    if (err) return console.log(err);
    var urls = images.map(function(image) { return image.url; });
 
    fut.return(urls);
  };
  if (page)
    options.page = page;
  GoogleImages.search(channel.get('query'), options);
  return fut.wait();

};

Modules.both.getUrls = urlsOnly;

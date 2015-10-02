describe('image fetcher', function() {
  /*
   * Set up some fake user credentials and spies to simulate logging in
   */
  beforeEach(function() {
    this.fakeUser = {
      _id: '12345',
      username: 'Fakey'
    };
    this.userIdSpy = spyOn(Meteor, 'userId').and.returnValue(this.fakeUser._id);
  });

  afterEach(function() {
    // Remove any channels we've created
    Channel.remove({});
  });

  it('should return 64 urls from the channel query', function() {
    let channel = new Channel({
      title: 'My Test Channel',
      query: 'little flower ponies'
    });
    channel.save();
    spyOn(Modules.server.GoogleImageSearcher, 'search').and.callFake(function(query, options) {
      options.callback(null, [ 
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' }
      ]);
    });
    urls = Meteor.call('/channels/getUrls', channel);
    expect(urls.length).toEqual(64);
    for (i = 0; i < urls.length; i++) {
      expect(urls[i]).not.toEqual('');
    }

    // Clean up 
    channel.remove();
  });

  it('Should return an error', function() {
    let channel = new Channel({
      title: 'My Test Channel',
      query: 'little flower ponies'
    });
    channel.save();
    spyOn(Modules.server.GoogleImageSearcher, 'search').and.callFake(function(query, options) {
      options.callback('Error: This is a fake Error', [ 
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' }
      ]);
    });
    urls = Meteor.call('/channels/getUrls', channel);
    expect(urls[0]).toEqual('Error: This is a fake Error'); 
    // Clean up 
    channel.remove();

  });
});
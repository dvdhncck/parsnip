describe("Finder", function() {

  var finder = require('../main/Finder.js');

  beforeEach(function() {
  });

  it("should invoke query and process results", function() {

    var fakeConnection = {};
    var fakeResponse = {};

    // when query is called, invoke the given callback with fake params....
    fakeConnection.query = jasmine
        .createSpy("query() spy")
        .and
        .callFake(function(query, callback){
          var fakeRows = [{"Path":"path1"}, {"Path":"path2"}];
          callback(undefined, fakeRows, undefined);
        });

    // spy up the response
    fakeResponse.setHeader = jasmine.createSpy("setHeader() spy");
    fakeResponse.status = jasmine.createSpy("status() spy");
    fakeResponse.send = jasmine.createSpy("send() spy");

    // when
    finder.getItemsForPath(fakeConnection, "foo", fakeResponse);

    // then
    expect(fakeResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(fakeResponse.status).toHaveBeenCalledWith(200);
    expect(fakeResponse.send).toHaveBeenCalledWith('{"paths":["path1","path2"]}');
  });

});

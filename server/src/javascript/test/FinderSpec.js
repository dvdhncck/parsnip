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

    // soak up the response
    fakeResponse.write = jasmine.createSpy("write() spy");
    fakeResponse.end = jasmine.createSpy("end() spy");

    finder.getItemsForPath(fakeConnection, "foo", fakeResponse);

    // check that the response is sane
    expect(fakeResponse.write.calls.count()).toEqual(2);
    expect(fakeResponse.end).toHaveBeenCalled();
  });

});

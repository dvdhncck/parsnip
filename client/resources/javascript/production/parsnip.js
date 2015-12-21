
function buildCarousel(imagePaths)
{
  var list=$('div#scrolling ul');
  list.empty();
  $.each(imagePaths.paths, function(index, path) {
    //var image = $('img').attr({src:"photos/'" + path + "'", width:"50%"});
    //var imagePane = $('li');
    //imagePane.append(image)
    //list.append(imagePane);
    var realPath = '/photos/' + path;
    list.append('<li><img src="' + realPath + '" width="400"></li>');
  });

  initCarousel();
}

function initCarousel()
{
  carousel = $("ul");
  carousel.itemslide();
}

$(function(){

  var searchPath='2009/2009-04-16-luftwaffenmuseum';

  $.ajax({
    url: 'path/' + searchPath,
    data: '',
    success: buildCarousel,
    dataType: 'json'
  });

})


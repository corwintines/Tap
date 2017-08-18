var API_ROOT = ''; // ADD SERVER ROUTE URL HERE

var KOLSCH = '#F0D860';
var LAGER = '#FAC937';
var PILSNER = '#F0C000';
var ALE = '#F09000';
var IPA = '#D86000';
var BROWN_ALE = '#783030';
var PORTER = '#483030';
var STOUT = '#001818';

function getRoute(route, callback) {
  return $.get(API_ROOT + route, callback);
}

function refreshData(data) {
  console.log(data);
  for (i=0;i<data.length;i++) {
    var backgroundcolor = colourr(data[i].beertype);
    $("#mug"+data[i]._id).empty();
    $("<div></div>").attr('id', 'mug-fill'+data[i]._id).appendTo('#mug'+data[i]._id);
    $('#mug-fill'+data[i]._id).css({
      height: data[i].amountleft+'%',
      bottom: 0,
      position: 'absolute',
      width: '100%',
      'border-radius': '0 0 5px 5px',
      background: backgroundcolor
    });
    $("<div></div>").attr('class', 'info').attr('id', 'info'+data[i]._id).appendTo('#mug'+data[i]._id);
    $("<p>"+data[i].beername+"</p>").appendTo('#info'+data[i]._id);
    $("<p>"+data[i].brewery+"</p>").appendTo('#info'+data[i]._id);
    $("<p>"+data[i].beertype+"</p>").appendTo('#info'+data[i]._id);
    $("<p>"+data[i].alchoholpercent+"%</p>").appendTo('#info'+data[i]._id);
    $("<p>"+data[i].amountleft+"% left</p>").appendTo('#info'+data[i]._id);
  }
}

function colourr (colorpassed) {
  var output;
  var color = colorpassed.toLowerCase();
  if (color === 'kolsch') {
    output = KOLSCH;
  }
  if (color === 'lager') {
    output = LAGER;
  }
  if (color === 'pilsner') {
    output = PILSNER;
  }
  if (color === 'ale') {
    output = ALE;
  }
  if (color === 'ipa') {
    output = IPA;
  }
  if (color === 'brown ale') {
    output === BROWN_ALE;
  }
  if (color === 'porter') {
    output = PORTER;
  }
  if (color === 'stout') {
    output = STOUT;
  }
  return output;
}

$(document).ready(function() {
  getRoute('/', function(data) {
    kegData = data;
    for(i=0; i<kegData.length; i++) {
      var backgroundcolor = colourr(kegData[i].beertype);

      $("<div></div>").attr('class','tap').attr('id', kegData[i]._id).appendTo('.main');
      $("<div></div>").attr('class', 'taphead').appendTo("#"+kegData[i]._id);
      $("<div></div>").attr('class', 'glass').attr('id', 'glassfor'+kegData[i]._id).appendTo("#"+kegData[i]._id);
      $("<div></div>").attr('class', 'mug').attr('id', 'mug'+kegData[i]._id).appendTo("#glassfor"+kegData[i]._id);
      $("<div></div>").attr('id', 'mug-fill'+kegData[i]._id).appendTo('#mug'+kegData[i]._id);
      $('#mug-fill'+kegData[i]._id).css({
        height: kegData[i].amountleft+'%',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        'border-radius': '0 0 5px 5px',
        background: backgroundcolor
      });
      $("<div></div>").attr('class', 'info').attr('id', 'info'+kegData[i]._id).appendTo('#mug'+kegData[i]._id);
      $("<p>"+kegData[i].beername+"</p>").appendTo('#info'+kegData[i]._id);
      $("<p>"+kegData[i].brewery+"</p>").appendTo('#info'+kegData[i]._id);
      $("<p>"+kegData[i].beertype+"</p>").appendTo('#info'+kegData[i]._id);
      $("<p>"+kegData[i].alchoholpercent+"%</p>").appendTo('#info'+kegData[i]._id);
      $("<p>"+kegData[i].amountleft+"% left</p>").appendTo('#info'+kegData[i]._id);
    }
  });
});

setInterval(function() {
  getRoute('/', function(data) {
    refreshData(data);
  });
},20000);

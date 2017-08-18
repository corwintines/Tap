var API_ROOT = ''; // ADD SERVER ROUTE URL HERE

// ROUTES
function getRoute(route, callback) {
  return $.get(API_ROOT + route, callback);
}

function postRoute(route, datas, callback){
  $.post(API_ROOT+route, datas, function(res) {
    $("#hookup"+res._id).remove();
    $("<div></div>").attr('class', 'keg-image').attr('id', "image"+res._id).appendTo("#widget"+res._id);
    $("<div></div").attr('class', 'keg-info').attr('id', 'info'+res._id).appendTo('#widget'+res._id);
    $("<p>"+res._id+"</p>").appendTo('#info'+res._id);
    $("<p>Beer: "+res.beername+"</p>").appendTo("#info"+res._id);
    $("<p>Brewery: "+res.brewery+"</p>").appendTo("#info"+res._id);
    $("<p>KegSize: "+String(res.kegsize/1000.0)+"L</p>").appendTo("#info"+res._id);
    $("<p>Glasses Poured: "+String(res.glassespoured)+"</p>").appendTo("#info"+res._id);
    $("<p>Amount Poured: "+String(res.amountpoured/1000.0)+"L</p>").appendTo("#info"+res._id);
    $("<p>Amount Wasted: "+String(res.waste/1000.0)+"L</p>").appendTo('#info'+res._id);
    $("<p>Amount Left: "+String(res.amountleft/1000.0)+"L</p>").appendTo("#info"+res._id);
    $('<button type="button" id="buttonunhook_'+res._id+'" class="button_unhook" onclick="buttonClick(id)">Detach Keg</button>').appendTo("#info"+res._id);
  });
}

function deleteRoute(route, id, callback) {
  $.ajax({
   url: API_ROOT+route+"/"+id,
   type: 'DELETE',
   item:id
  });
}

// Functions
function hookupClassCreate(id) {
  console.log(id);
  $("#image"+id).remove();
  $('#info'+id).remove();
  $("<div></div>").attr('class', 'hookupbutton').attr('id', 'hookup'+id).appendTo("#widget"+id);
  $('<button type="button" id="buttonhook_'+id+'" class="button_hook" onclick="hookupPress(id)">Hookup Keg</button>').appendTo("#hookup"+id);
}

function createForm(id){
  var split = id.split("_");
  var formID = '#hook'+split[1];
  var formStart = '<form id="hook'+split[1]+'">';
  var beer = '<input type="text" id="beer'+split[1]+'" name="beerName" value="Beer Name"><br>';
  var brewery = '<input type="text" id="brewery'+split[1]+'" name="brewery" value="Brewery"><br>';
  var type = '<input type="text" id="type'+split[1]+'" name="beertype" value="Beer Type"><br>';
  var alcoholPercent = '<input type="text" id="percent'+split[1]+'" name="alcoholpercent" value="Alcohol Percent"><br>';
  var description = '<input type="text" id="description'+split[1]+'" name="description" value="Description"><br>';
  var kegsize = '<input type="text" value="Keg Size" id="size'+split[1]+'" name="kegsize"><br>';
  var formEnd = '</form>';
  var button = '<button type="button" id="submission_'+split[1]+'" class="button_unhook" onclick="submitForm(id)">Submit</button>';
  $("#"+id).remove();
  $(formStart+beer+brewery+type+alcoholPercent+description+kegsize+formEnd).appendTo("#hookup"+split[1]);
  $(button).appendTo("#hook"+split[1]);
}

function submitForm(formID) {
  var split = formID.split('_');
  var beer = $('#beer'+split[1]).val();
  var brewery = $('#brewery'+split[1]).val();
  var type = $('#type'+split[1]).val();
  var alchoholPercent = $('#percent'+split[1]).val();
  var description = $('#description'+split[1]).val();
  var kegsize = $('#size'+split[1]).val();

  var data = {
    id:split[1],
    beername:beer,
    brewery:brewery,
    kegsize:Number(kegsize),
    type:type,
    alcoholPercent:Number(alchoholPercent),
    description:description
  };
  postRoute('/kegs/post', data);
}

function refreshData(data) {
  for (i=0;i<data.length;i++) {
    $("#info"+data[i]._id).empty();
    var id = "<p>"+data[i]._id+"</p>";
    var beer = "<p>Beer: "+data[i].beername+"</p>";
    var brewery = "<p>Brewery: "+data[i].brewery+"</p>";
    var kegsize = "<p>KegSize: "+String(data[i].kegsize/1000.0)+"L</p>";
    var glasses = "<p>Glasses Poured: "+String(data[i].glassespoured)+"</p>";
    var poured = "<p>Amount Poured: "+String(data[i].amountpoured/1000.0)+"L</p>";
    var wasted = "<p>Amount Wasted: "+String(data[i].waste/1000.0)+"L</p>";
    var left = "<p>Amount Left: "+String(data[i].amountleft/1000.0)+"L</p>";
    var button = '<button type="button" id="buttonunhook_'+data[i]._id+'" class="button_unhook" onclick="buttonClick(id)">Detach Keg</button>';
    $("#info"+data[i]._id).html(id+beer+brewery+kegsize+glasses+poured+wasted+left+button);
  }
}

// Document load
$(document).ready(function() {
  getRoute('/kegs', function(data) {
    kegData = data;
    for(i=0; i<kegData.length; i++) {
      $("<div></div>").attr('class', 'keg-widget').attr('id',"widget"+kegData[i]._id).appendTo('.kegbody');
      $("<div></div>").attr('class', 'keg-image').attr('id', "image"+kegData[i]._id).appendTo("#widget"+kegData[i]._id);
      $("<div></div").attr('class', 'keg-info').attr('id', 'info'+kegData[i]._id).appendTo('#widget'+kegData[i]._id);
      $("<p>"+kegData[i]._id+"</p>").appendTo('#info'+kegData[i]._id);
      $("<p>Beer: "+kegData[i].beername+"</p>").appendTo("#info"+kegData[i]._id);
      $("<p>Brewery: "+kegData[i].brewery+"</p>").appendTo("#info"+kegData[i]._id);
      $("<p>KegSize: "+String(kegData[i].kegsize/1000.0)+"L</p>").appendTo("#info"+kegData[i]._id);
      $("<p>Glasses Poured: "+String(kegData[i].glassespoured)+"</p>").appendTo("#info"+kegData[i]._id);
      $("<p>Amount Poured: "+String(kegData[i].amountpoured/1000.0)+"L</p>").appendTo("#info"+kegData[i]._id);
      $("<p>Amount Wasted: "+String(kegData[i].waste/1000.0)+"L</p>").appendTo('#info'+kegData[i]._id);
      $("<p>Amount Left: "+String(kegData[i].amountleft/1000.0)+"L</p>").appendTo("#info"+kegData[i]._id);
      $('<button type="button" id="buttonunhook_'+kegData[i]._id+'" class="button_unhook" onclick="buttonClick(id)">Detach Keg</button>').appendTo("#info"+kegData[i]._id);
    }
  });
});

setInterval(function() {
  getRoute('/kegs', function(data) {
    refreshData(data);
  });
},10000);

// Button Clicks
function buttonClick(id) {
  var string = id.split("_");
  deleteRoute('/kegs/delete', string[1]);
  hookupClassCreate(String(string[1]));
}

function hookupPress(id) {
  createForm(id);
}

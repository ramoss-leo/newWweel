function setForm(Stick)
{
  document.showForm.elements["calendar"].value = Stick.pike.format('YYYY-MM-DD');
  document.showForm.elements["clock"].value = Stick.pike.format('HH:mm');
  document.showForm.elements["nameGPS"].value = Stick.ground.name;
  document.showForm.elements["latitude"].value = Stick.ground.lat;
  document.showForm.elements["longitude"].value = Stick.ground.lng;
  document.stickForm.elements["alias"].value = Stick.alias;
}

// **************************************************************************************************

function stopAuto()
{
  nowButtonOn = false;
  $('img.Button.Green').removeClass('focus');
  document.stickForm.elements["alias"].value = '';
}

// **************************************************************************************************

var getForm = function()
{
   var gps = {};
   var data = document.showForm.elements["calendar"].value;
   var time = document.showForm.elements["clock"].value;
   var name = document.showForm.elements["nameGPS"].value;
   getGPS(name);
   var lat = document.showForm.elements["latitude"].value;
   var lng = document.showForm.elements["longitude"].value;
   var alias = document.stickForm.elements["alias"].value;
   gps.lat = lat; gps.lng = lng; gps.name = name;
   var str = String(data + ' ' + time);
   var Spike = moment(str);
   trackStick(Spike, gps, alias);
}

// **************************************************************************************************

function getGPS(name)
{
  var Num = null;
  GPS.forEach(function(gps, i)
   {if (gps.name === name) {Num = i};});
  if (Num !== null)
  { document.showForm.elements["latitude"].value = GPS[Num].lat.toFixed(3);
    document.showForm.elements["longitude"].value = GPS[Num].lng.toFixed(3);}
}

// **************************************************************************************************

function getColor(color) {alert('Edit in next version');}

function saveStick() {alert("Edit in next version!");}

function deleteStick() {alert("Edit in next version!");}

// **************************************************************************************************

// function pushStick(mom)
// {
//   Sticks.push(p);
//   console.log("New moment in Array!");
//   Sticks.forEach(function(stick, i)
//   {
//     console.log("moment #"+ i + " name: " + stick.name);
//     console.log("moment #"+ i + " data: " + stick.data);
//     console.log("moment #"+ i + " time: " + stick.time);
//   });
//   addList();
// }

// var addList = function()
// {
//   $(".stickList option").remove();
//   Sticks.forEach(function(stick)
//   {
//    $(".stickList").append("<option>" + stick.name + "</option>");
//   });
// }
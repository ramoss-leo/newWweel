function setForm(Stick)
{
  document.showForm.elements["calendar"].value = Stick.pike.format('YYYY-MM-DD');
  document.showForm.elements["clock"].value = Stick.pike.format('HH:mm');
  document.showForm.elements["nameGPS"].value = Stick.ground.name;
  document.showForm.elements["latitude"].value = Stick.ground.lat;
  document.showForm.elements["longitude"].value = Stick.ground.lng;
  document.stickForm.elements["alias"].value = Stick.alias;
  document.stickForm.elements["star"].value = Stick.astro;
}

// ***********************************************************************************************

function stopAuto()
{
  var star = document.stickForm.elements["star"].value;
  if (nowButtonOn === false) {saveNow = false}
    else {saveNow = true; nowButtonOn = false};
  if (star === '0') 
    {document.stickForm.elements["star"].value = '5';}
  document.stickForm.elements["alias"].value = '';
}

// ***********************************************************************************************

var trackForm = function()
{
   var Stick = {};
   var gps = {};
   var data = document.showForm.elements["calendar"].value;
   var time = document.showForm.elements["clock"].value;
   var name = document.showForm.elements["nameGPS"].value;
   getGPS(name); saveGPS();
   var lat = document.showForm.elements["latitude"].value;
   var lng = document.showForm.elements["longitude"].value;
   Stick.alias = document.stickForm.elements["alias"].value;
   gps.lat = lat; gps.lng = lng; gps.name = name;
   var str = String(data + ' ' + time);
   Stick.Id = 'Staff';
   Stick.pike = moment(str);
   Stick.ground = gps;
   var astro = document.stickForm.elements["star"].value;
   if (astro === '5') {astro = '0'};
   Stick.astro = astro;
   trackStick(Stick);
}
// *****************************************************************************************

function saveGPS()
{
  var exitFlag = false;
  var gpsKey;
  var userGPS = {};
  var name = document.showForm.elements["nameGPS"].value;
  GPS.forEach(function(gps, i)
  {if(gps.name === name) {exitFlag = true; return;} });
  if (exitFlag) return;
  gpsCount = loadData('gpsCount');
  if (gpsCount === null) gpsCount = 0;
  for (var i = 0; i < gpsCount; i++) 
  {
    gpsKey = 'gps' + i;
    userGPS = loadData(gpsKey);
    if (name === userGPS.name) return;
  }
  userGPS.name = name;
  userGPS.lat = document.showForm.elements["latitude"].value;
  userGPS.lng = document.showForm.elements["longitude"].value;
  saveData('gps', userGPS);
  userList('gps', userGPS.name);
}

// *********************************************************************************************

function getGPS(name)
{
  var Num = null;
  GPS.forEach(function(gps, i)
   {if (gps.name === name) {Num = i};});
  if (Num !== null)
  { 
    document.showForm.elements["latitude"].value = GPS[Num].lat.toFixed(3);
    document.showForm.elements["longitude"].value = GPS[Num].lng.toFixed(3);
    return;
  }
  gpsCount = loadData('gpsCount');
  if ((gpsCount === 0)||(gpsCount === null)) return;
  for (var i = 0; i < gpsCount; i++)
  {
    key = 'gps' + i;
    userGPS = loadData(key);
    if (userGPS.name === name)
      {
        document.showForm.elements["latitude"].value = userGPS.lat;//.toFixed(3);
        document.showForm.elements["longitude"].value = userGPS.lng;//.toFixed(3);
        return;     
      };
  };
}

// ******************************************************************************************

function saveAlert(color, comm)
{
  $saveTip = $('<div class = wheelTip>').hide();
  $alertTip = $("<div class = 'titleTip " + color + "'>")
                  .text('Save alert:');
  $commTip = $('<div class = commTip>').text(comm);
  $saveTip.append($alertTip).append($commTip);
       $(".MoonBox").append($saveTip);
  $('.wheelTip').fadeTo(1000, 1);
  setTimeout(function(){$('.wheelTip').fadeTo(1000, 0, function(){$(this).remove();});},3000); 
}

function saveStick()
{
  console.log(document.stickForm.elements["star"].value);
  var star = document.stickForm.elements["star"].value;
  var comm = 'Edit in next version!';
  console.log(star);
  if ((star === '0')||(star === '5'))
    {comm = 'Please, change another color for Save!'; saveAlert('Red', comm); return;}
  else {saveAlert('Red', comm);};
}

// *********************************************************************************************

function deleteStick() {saveAlert('Red', 'Edit in next version!');}

// *********************************************************************************************

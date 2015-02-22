function formAlert(color, comm)
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

// **********************************************************************************************

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
  if (currButtons[0] === false) {saveNow = false}
    else {saveNow = true; currButtons[0] = false};
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
   getGPS(name);
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

// *********************************************************************************************

function getGPS(name)
{
  var Num = null;
  var userGPS;
  var gpsKey;
  GPS.forEach(function(gps, i)
   {if (gps.name === name) {Num = i};});
  if (Num === null)
    {
      gpsCount = loadData('gpsCount');
      if (gpsCount === null) gpsCount = 0;
      for (var i = 0; i < gpsCount; i++) 
      {
        gpsKey = 'gps' + i;
        userGPS = loadData(gpsKey);
        if (name === userGPS.name)
        {
          document.showForm.elements["latitude"].value = userGPS.lat;
          document.showForm.elements["longitude"].value = userGPS.lng;
          return true;
        }
      };
       return false;
    }
  if (Num !== null)
  { document.showForm.elements["latitude"].value = GPS[Num].lat.toFixed(3);
    document.showForm.elements["longitude"].value = GPS[Num].lng.toFixed(3); return true}
}

// **********************************************************************************************

function getStick(alias)
{
  var Stick;
  var key;
  stickCount = loadData('stickCount');
  if (stickCount === null) stickCount = 0;
  for (var i = 0; i < stickCount; i++)
  {
    key = 'stick' + i;
    Stick = loadData(key);
    if (Stick !== null)
      if (Stick.alias === alias) 
        {
          Stick.pike = moment(Stick.pike);
          setForm(Stick); trackStick(Stick);
          return;
        }
  };
}

// **********************************************************************************************

function saveStick()
{
  var saveGPS = false;
  var star = document.stickForm.elements["star"].value;
  if ((star === '0')||(star === '5'))
    {comm = 'Please, change another color for Save!'; formAlert('Red', comm); return;}
  else 
    {
      var Stick = {};
      var gps = {};
      var data = document.showForm.elements["calendar"].value;
      var time = document.showForm.elements["clock"].value;
      var nameGPS = document.showForm.elements["nameGPS"].value;
      saveGPS = !(getGPS(nameGPS));
      var lat = document.showForm.elements["latitude"].value;
      var lng = document.showForm.elements["longitude"].value;
      Stick.alias = document.stickForm.elements["alias"].value;
      if ((Stick.alias === '') || (Stick.alias === Alias[0]) || 
        (Stick.alias === Alias[1]) || (Stick.alias === Alias[2]))
        {comm = 'Please, input name for Save!'; formAlert('Red', comm); return;}
      gps.lat = lat; gps.lng = lng; gps.name = nameGPS;
      var str = String(data + ' ' + time);
      stickCount = loadData('stickCount');
      if (stickCount === null) stickCount = 0;
      Stick.Id = 'stick' + stickCount;
      Stick.pike = moment(str);
      Stick.ground = gps;
      Stick.astro = star;
      if (saveGPS) 
        {
         saveData('gps', gps);
         userList('gps', gps.name);
        };
      comm = 'Saved: ' + Stick.alias;
      saveData('stick', Stick);
      userList('stick', Stick.alias);
      formAlert('Red', comm);
    };
}

// *********************************************************************************************

function deleteStick() 
{
  var x = null;
  var Stick;
  var key;
  var gps;
  var nameGPS = document.showForm.elements["nameGPS"].value;
  var alias = document.stickForm.elements["alias"].value;
  stickCount = loadData('stickCount');
  if (stickCount === null) stickCount = 0;
  if ((alias === '') || (alias === Alias[0]) ||
    (alias === Alias[1]) || (alias === Alias[2])) 
    {formAlert('Red', 'Invalid data!'); return;}
  for (var i = 0; i < stickCount; i++)
  {
    key = 'stick' + i;
    Stick = loadData(key);
    if (Stick.alias === alias)
      {
        deleteData('stick', i);
        stickCount = loadData('stickCount');
      }
  };
  GPS.forEach(function(gps, i) 
    {if (gps.name === nameGPS) x = i;});
  if (x === null) 
   {
     x = 0;
     stickCount = loadData('stickCount');
     if (stickCount === null) stickCount = 0;
     for (var i = 0; i < stickCount; i++)
     {
       key = 'stick' + i;
       Stick = loadData(key);
       if (Stick.ground.name === nameGPS) x++;
     };
     if (x === 0)
     {
      gpsCount = loadData('gpsCount');
      if (gpsCount === null) gpsCount = 0;
      for (var i = 0; i < gpsCount; i++)
      {
        key = 'gps' + i;
        gps = loadData(key);
        if (gps.name === nameGPS) deleteData('gps', i);
      };
     }
   }
  reloadLists();
  formAlert('Red', 'Delete complete!');
}

// *********************************************************************************************
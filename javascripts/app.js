function saveData(id, data)
{
  if ((id === 'currGPS') || (id === 'currButtons'))
    {localStorage[id] = JSON.stringify(data); return;}
  var keyCount = id + 'Count';
  var Count = loadData(keyCount);
  var key = id + Count;
	localStorage[key] = JSON.stringify(data);
  localStorage[keyCount] = ++Count;
}

// ***********************************************************************************

function deleteData(id, num)
{
  var data;
  var keyCount = id + 'Count';
  var Count = loadData(keyCount);
  var key = id + num;
  data = loadData(key);
  if (data !== null)
  {
   localStorage.removeItem(key);
   for (var i = num + 1; i < Count; i++) 
   {
    key = id + i; data = loadData(key);
    key = id + (i - 1);
    if (id === 'stick') data.Id = key;
    localStorage[key] = JSON.stringify(data);
   };
   key = id + (--Count);
   localStorage.removeItem(key);
   localStorage[keyCount] = Count;
  }
}

// ***********************************************************************************

function loadData(key)
{
  var data;
  data = JSON.parse(localStorage.getItem(key));
  return data;
}

// ***********************************************************************************

function loadUser()
{
  currGPS = loadData('currGPS');
  if (currGPS === null)
  {currGPS = GPS[0];localStorage['currGPS'] = JSON.stringify(currGPS);}
  currButtons = loadData('currButtons');
  if (currButtons === null)
  {currButtons = []; currButtons[0] = true;
   localStorage['currButtons'] = JSON.stringify(currButtons);};
  currButtons[0] = true;
  stickCount = loadData('stickCount');
  if (stickCount === null) 
  {stickCount = 0; localStorage['stickCount'] = JSON.stringify(stickCount);}
  gpsCount = loadData('gpsCount');
  if (gpsCount === null) 
  {gpsCount = 0; localStorage['gpsCount'] = JSON.stringify(gpsCount);}
}

// ***********************************************************************************
// ************************************   BEGIN   ************************************
// ***********************************************************************************

function main()
{
  "use script";
  loadUser();
  Creator(Design.EN);
  trackMasks();
  trackButtons();
  trackTips();
  autoStaff();
  // showDemo();
}
$(document).ready(main);
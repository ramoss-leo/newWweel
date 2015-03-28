function saveData(id, data)
{
	if ((id === 'currGPS') || (id === 'currButtons'))
    {localStorage[id] = JSON.stringify(data); return;}
  var keyCount = id + 'Count';
  var Count = loadData(keyCount);
  if (Count === null) Count = 0;
  var key = id + Count;
  localStorage[key] = JSON.stringify(data);
  localStorage[keyCount] = ++Count;
}

function loadData(key)
{
	var data;
	data = JSON.parse(localStorage.getItem(key));
	return data;
}
// ***********************************************************************************
// ************************************   BEGIN   ************************************
// ***********************************************************************************

function main()
{
  "use script";
  currGPS = loadData('currGPS');
  if (currGPS === null) currGPS = GPS[0];
  Creator(Design.EN);
  trackMasks();
  trackNowButton();
  trackTips();
  autoStaff();
}
$(document).ready(main);
function saveData(key, data)
{
	console.log('Hello in Save!');
	localStorage[key] = JSON.stringify(data);
}

function loadData(key)
{
	var data;
	console.log('Hello in Load!');
	data = JSON.parse(localStorage.getItem(key));
	return data;
}
// ***********************************************************************************
// ************************************   BEGIN   ************************************
// ***********************************************************************************

function main()
{
  "use script";
  // localStorage.clear();
  // currGPS = GPS[5];
  // saveData('currGPS', currGPS);
  currGPS = loadData('currGPS');
  if (currGPS === null) currGPS = GPS[0];
  Creator(Design.EN);
  trackMasks();
  trackNowButton();
  trackTips();
  autoStaff();
  // showDemo();
}
$(document).ready(main);
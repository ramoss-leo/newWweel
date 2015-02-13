// ***********************************************************************************

function astroNum(strName) // get int Id of astro
{
  var strNum = strName.substring(5); // cut 'astro-'
  return (parseInt(strNum));
};

// ***********************************************************************************
// ************************************   BEGIN   ************************************
// ***********************************************************************************

function main()
{
  "use script";
  currGPS = GPS[1];
  Creator(Design.EN);
  trackMasks();
  trackStaff();
  showStick(Staff);
  trackTips();
  trackNowButton();
  // console.log('MAIN: end');
}
$(document).ready(main);
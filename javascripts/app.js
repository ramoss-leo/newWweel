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
  Creator(Design.EN);
  trackMasks();
  // showSky();
  // trackAstros();
  trackStaff();
  showStick(Staff);
  trackTips();
}
$(document).ready(main);
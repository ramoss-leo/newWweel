var createApp = function (appDesign) // create all aplication in chosen design
{
  createShell(appDesign);
  createBoard(appDesign);
  createHomeController(appDesign);
  createSky();
};

// ***********************************************************************************

var createShell = function(shellDesign) // create shell in chosen design
{
  $("h1").text(shellDesign.Top);
  $("h3").text(shellDesign.Down);
};

// ***********************************************************************************

var PXstyle = function (point) // get absolute position style
{
  return ("position: absolute; left: " + point.X + "px; top: " + point.Y + "px;");
};   

// *************************************************************************************


var getPointPX = function(alfa, radius) //get px position around
{
  var point = {};
  point.X = wheelCenter.X + Math.cos(radian(alfa))*radius;
  point.Y = wheelCenter.Y - Math.sin(radian(alfa))*radius;
  return (point);
};

// ************************************************************************************

var radian = function(grad) //convert grad in radian
{
  var PI = 3.14159;
  return ((grad*PI)/180);
};


// ***********************************************************************************

var astroNum = function (strName) // get int Id of astro
{
  var strNum = strName.substring(5);
  return (parseInt(strNum));
};

// ***********************************************************************************
// ************************************   BEGIN   ************************************
// ***********************************************************************************

var main = function ()
{
  "use script";
  createApp(Design.EN);
  maskClicker();
  astroClicker();
};
$(document).ready(main);
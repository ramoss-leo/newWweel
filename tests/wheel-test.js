var testMom = function() 
{
	"use strict";
  var testM = moment();
  var lt = 53.53, lg = 27.34; // Minsk
  for (var i = 0; i < 1; i++) 
   {
     // *********************  SUN WHEEL ****************************************
     testM.utc();
     $("body").append("<h2>TEST MOMENT: " + testM.format('YYYY MM DD HH:mm:ss Z') + "</h2>");
     $("body").append("<h3>SUN WHEEL UTC:</h3>");
     var sunWheel = getSunWheel(testM);
     sunWheel.forEach(function(spoke, i)
     {
     	spoke.utc();
     	$("body").append("<li>sun"+ Spokes[i].name + ": ------------ " 
      		                      + spoke.format('DD MMMM (HH:mm) dddd')+ "</li>");
     });

     testM.local();
     $("body").append("<h3>SUN WHEEL LOCAL:</h3>");
     var sunCross = getSunCross(testM);
     var sunWheel = getWheel(sunCross);
     sunWheel.forEach(function(spoke, i)
     {
     	spoke.local();
     	$("body").append("<li>sun"+ Spokes[i].name + ": ------------ " 
      		                      + spoke.format('DD MMMM (HH:mm) dddd')+ "</li>");
     });

     //**********************     MOON WHEEEL         ******************************
     testM.utc();
     $("body").append("<h3>MOON WHEEL UTC:</h3>");
     var moonWheel = getMoonWheel(testM);
     moonWheel.forEach(function(spoke, j)
     {
      spoke.utc();
      $("body").append("<li>moon"+ Spokes[j].name + ": ------------ " 
                                + spoke.format('DD MMMM (HH:mm) dddd')+ "</li>");
     });

     testM.local();
     $("body").append("<h3>MOON WHEEL LOCAL:</h3>");
     var moonWheel = getMoonWheel(testM);
     moonWheel.forEach(function(spoke, j)
     {
      spoke.local();
      $("body").append("<li>moon"+ Spokes[j].name + ": ------------ " 
                                + spoke.format('DD MMMM (HH:mm) dddd')+ "</li>");
     });
    
     //********************     EARTH WHEEEL         ******************************
     testM.utc();
     $("body").append("<h3>EARTH WHEEL UTC:</h3>");
     var earthWheel = getEarthWheel(testM, lt, lg);
     earthWheel.forEach(function(spoke, j)
     {
      earthWheel[j].utc();
      $("body").append("<li>earth"+ Spokes[j].name + ": ------------ " 
                                + earthWheel[j].format('DD MMMM (HH:mm) dddd')+ "</li>");
     });

     testM.local();
     $("body").append("<h3>EARTH WHEEL LOCAL:</h3>");
     var earthWheel = getEarthWheel(testM, lt, lg);
     earthWheel.forEach(function(spoke, j)
     {
      earthWheel[j].local();
      $("body").append("<li>earth"+ Spokes[j].name + ": ------------ " 
                                + earthWheel[j].format('DD MMMM (HH:mm) dddd')+ "</li>");
     });
   };
}
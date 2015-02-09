//  ***************************   all about HomeControl    ***************************

var createHomeController = function(controlDesign) //
{
  for (var Id = 0; Id < Cycle.length; Id++)
   {createPanel(Id, "White", Cycle[Id] + " Home")};
};

// ***********************************************************************************

var createPanel = function(Id, color, text)
{
  var $homePanel = $("<div class = 'homePanel " + Cycle[Id] + "Panel'>");
  $(".homeController").append($homePanel);
  var $prevHome = $("<div class = 'prevHome " + color + "'>prev</div>");
  $homePanel.append($prevHome);
  var $Home = $("<div class = 'Home " + color + "'>" + text + "</div>");
  $homePanel.append($Home);
  var $nextHome = $("<div class = 'nextHome " + color + "'>next</div>");
  $homePanel.append($nextHome);
}

// ***********************************************************************************

var activeHome = function(astro)
{
  astro.alfa.forEach(function(alfa, Id)
  {
    var numHouse = 0;
    var alfaMin  = 360;
    for (var i = 0; i < Masks.length; i++)
    {
      var alfaMask = Masks[i].alfa;
      if (Math.abs(alfaMask - alfa) < alfaMin)
       {
        alfaMin = Math.abs(alfaMask - alfa);
        numHouse = i; 
       };
    };
    var mask = Masks[numHouse];
    activeMask(Id, mask);
    activeHomePanel(Id, mask);
  }); 
};

// ***********************************************************************************

var activeHomePanel = function(Id, mask)
{
  var txt = Cycle[Id] + " " + mask.name;
  var color = mask.color;
  $("." + Cycle[Id]+ "Panel").remove();
  createPanel(Id, color, txt);
};
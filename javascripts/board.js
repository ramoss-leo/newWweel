// ******************************* all functions about "Board" ******************************

var createBoard = function(boardDesign) // create main board in chosen design
{ 
  for (var Id = 0; Id < Cycle.length; Id++)
    {createWheel(Id, boardDesign.wheel[Id]);};
  createButtons();
};

//***********************************************************************************

var createButtons = function()
   {
     Buttons.forEach(function(button)
     {
       var $button = ("<img style='" + PXstyle(button) + 
                     "' class='Button " + button.name + "' src='" + button.link + "'>");
       $("." + button.box).append($button);
     });
     $(".Button").addClass("sleep");
   };

// *************************************************************************************

var createWheel = function(Id, imgLink)
{
  var $wheelBox = $("<div class = 'wheelBox " + Cycle[Id] + "Box'>");
  $wheelBox.append($("<img src='" + imgLink + "'>"));
  $(".Board").append($wheelBox);
  createMasks(Id);
};

// ***********************************************************************************

var createMasks = function(Id)
{
   var radius = wheelArea[0].radius;
   for (var i = 0; i < Masks.length; i++)
     {
       var alfa = Masks[i].alfa;
       var point = getPointPX(alfa, radius);
           point.X = point.X - 4;
           point.Y = point.Y - 2;
       var name = Masks[i].name;
       var link = Masks[i].link;
       createAstro(Id, point, name, link);
       $("." + name).addClass("Mask");
       $("." + name).addClass(Color[(i%4)]);
     };
  $(".Mask").addClass("sleep");
};

// ************************************************************************************

var createAstro = function(Id, point, name, link)
{ // create any img in px point of Box
  var $Astro = 
  $("<img style='" + PXstyle(point) + "' class='" + name + "' src='" + link + "'>");
  $("." + Cycle[Id] + "Box").append($Astro);
};

// ************************************************************************************

var createRing = function(Id, ring, link)
{ 
  for (var i = 0; i*ring.step < 360; i++)
    { 
      var Name = "astro astro" + astroNumber;
      var point = getPointPX(i*ring.step, ring.radius);
      createAstro(Id, point, Name, link);
      astroNumber++;
    };
};

// **********************************************************************************

var createSky = function() // create all astras from Atlas
{
  Atlas.forEach(function(astro)
    {
      var radius = wheelArea[1].radius;
      for (var Id = 0; Id < Cycle.length; Id++)
       {
         var point = getPointPX(astro.alfa[Id], radius);
         var name = "astro astro" + astroNumber;
         var link = Astro[astro.type].link;
         createAstro(Id, point, name, link);
       };
       astroNumber++;
    });
  $(".astro").addClass("sleep");
};

// **********************************************************************************
// **********************************************************************************

var maskClicker = function() // create masks clickers
{
  for (var i = 0; i < Masks.length; i++)
    {for (var Id = 0; Id < Cycle.length; Id++)
              {focusMask(Id, Masks[i]);};
    };
};

// ***********************************************************************************

var activeMask = function(Id, mask)
{
  if ($("." + Cycle[Id] + "Box ." + mask.name).hasClass("active")) return;
  $("." + Cycle[Id] + "Box .Mask").removeClass("active");
  $("." + Cycle[Id] + "Box ." + mask.name).addClass("active");
};

// ***********************************************************************************

var focusMask = function(Id, msk) // focus Mask
{
  $("." + Cycle[Id] + "Box ." + msk.name).on("click", function()
     {  
        if ($("." + Cycle[Id] + "Box ." + msk.name).hasClass("focus")) return;
        $("." + Cycle[Id] + "Box .Mask").removeClass("focus");
        $("." + Cycle[Id] + "Box ." + msk.name).addClass("focus");
     });
};

// ***********************************************************************************

var astroClicker = function()
{
  for (var i = 0; i < astroNumber; i++)
  {
    var Name = "astro" + i;
    astroChosen(Name);
  };
};

// ***********************************************************************************

var astroChosen = function(Name)
{
  $("." + Name).on("click", function()
   {
     if ($("." + Name).hasClass("focusAstro")) return;
     $(".astro").removeClass("focusAstro");
     $(".astro").addClass("sleep");
     $("." + Name).removeClass("sleep");
     $("." + Name).addClass("focusAstro");
     var astro = Atlas[astroNum(Name)];
     activeHome (astro);
   });
};
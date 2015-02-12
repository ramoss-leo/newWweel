// **********************************************************************************

function showStick(Stick)
{
  var area = {};
  area.radius = 127;
  Stick.angles.forEach(function(angle, i)
  {
    area.angle = angle;
    showAstro(Cycles[i], Stick.astro, Stick.Id, area);
  });
  activeLair(Stick.lairs);
}

// ************************************************************************************

function showAstro(cycle, astro, Id, area)
{ // show any astro
  var link = Astros[astro].link;
  var $Astro = 
  $("<img style='" + PXstyle(area) + "' class='" + Id + " ' src='" + link + "'>");
  $("." + cycle + "Box").append($Astro);
}

// **********************************************************************************

var activeLair = function(lairs)
{
  lairs.forEach(function(num, Id)
  {
    var mask = Spokes[num];
    activeMask(Id, mask);
    activeHomePanel(Id, mask);
  });
};

// ***********************************************************************************

var PXstyle = function (area) // get absolute position style
{
  var point = PointPX(area.angle, area.radius);
  return ("position: absolute; left: " + point.X + "px; top: " + point.Y + "px;");
};

// **********************************************************************************

function showSky() // show all astras from Atlas
{
  Atlas.forEach(function(astro)
    {
      var radius = wheelArea[1].radius;
      for (var Id = 0; Id < Cycles.length; Id++)
       {
         var point = PointPX(astro.angle[Id], radius);
         var name = "astro astro" + astroNumber;
         var link = Astros[astro.type].link;
         showAstro(Id, point, name, link);
       };
       astroNumber++;
    });
  $(".astro").addClass("sleep");
}

// ************************************************************************************

function showRing(Id, ring, link)
{ 
  for (var i = 0; i*ring.step < 360; i++)
    { 
      var Name = "astro astro" + astroNumber;
      var point = PointPX(i*ring.step, ring.radius);
      showAstro(Id, point, Name, link);
      astroNumber++;
    };
}

// ***********************************************************************************

function activeMask(Id, mask)
{
  if ($("." + Cycles[Id] + "Box ." + mask.name).hasClass("active")) return;
  $("." + Cycles[Id] + "Box .Mask").removeClass("active");
  $("." + Cycles[Id] + "Box ." + mask.name).addClass("active");
}

// ***********************************************************************************

function focusMask(cycle, name)
{
  console.log('SHOW: ~focusMask~');
  console.log('SHOW: ' + cycle + ' ' + name);
  if ($("." + cycle + "Box ." + name).hasClass("focus")) return;
  $("." + cycle + "Box .Mask").removeClass("focus");
  $("." + cycle + "Box ." + name).addClass("focus");
}

// ***********************************************************************************

function focusAstro(Name)
{
  if ($("." + Name).hasClass("focusAstro")) return;
  $(".astro").removeClass("focusAstro");
  $(".astro").addClass("sleep");
  $("." + Name).removeClass("sleep");
  $("." + Name).addClass("focusAstro");
}

// ***********************************************************************************

var activeHomePanel = function(Id, mask)
{
  var txt = Cycles[Id] + " " + mask.name;
  var color = mask.color;
  $("." + Cycles[Id]+ "Panel").remove();
  createPanel(Id, color, txt);
};

// ***********************************************************************************

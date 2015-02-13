// ************************************************************************************

function showStick(Stick)
{
  var area = {};
  area.radius = 127;
  removeStick(Stick);
  Stick.angles.forEach(function(angle, i)
  {
    area.angle = angle;
    showAstro(Cycles[i], Stick.astro, Stick.Id, area);
  });
  focusAstro(Stick);
  activeLair(Stick.lairs);
  focusSpoke();
  focusNowButton();
}

// ************************************************************************************

function removeStick(Stick)
{
  var Id = Stick.Id;
  $('.' + Id).remove();
}

// **********************************************************************************

function focusNowButton()
{
   var dur = (Math.abs(Staff.pike.diff(moment())));
   $('img.Button.Green').removeClass('focus');
   if (dur < 300000) {$('img.Button.Green').addClass('focus')};
}

// **********************************************************************************

function focusAstro(Stick)
{
  $(".Staff").removeClass("focus");
  $('.' + Stick.Id).addClass('focus');
}

// ***********************************************************************************

function showAstro(cycle, astro, Id, area)
{ // show any astro
  var link = Astros[astro].link;
  var $Astro = 
  $("<img style='" + PXstyle(area) + "' class='" + Id + " ' src='" + link + "'>");
  $("." + cycle + "Box").append($Astro);
  $Astro.addClass('sleep');
}

// **********************************************************************************

var PXstyle = function (area) // get absolute position style
{
  var point = PointPX(area.angle, area.radius);
  return ("position: absolute; left: " + point.X + "px; top: " + point.Y + "px;");
};

// **********************************************************************************

function radian(grad) {var PI = 3.14159; return ((grad*PI)/180);};

function PointPX(angle, radius)
{
  var point = {};
  point.X = wheelCenter.X + Math.cos(radian(angle))*radius;
  point.Y = wheelCenter.Y - Math.sin(radian(angle))*radius;
  return point;
}

// ***********************************************************************************

var activeLair = function(lairs)
{
  function activeMask(Id, mask)
  { if ($("." + Cycles[Id] + "Box ." + mask.name).hasClass("active")) return;
    $("." + Cycles[Id] + "Box .Mask").removeClass("active");
    $("." + Cycles[Id] + "Box ." + mask.name).addClass("active"); }
  lairs.forEach(function(num, Id)
  { var mask = Spokes[num];
    activeMask(Id, mask);
    activeHomePanel(Id, mask);});
};

// ***********************************************************************************

function focusSpoke()
{
  // console.log('SHOW: ~focusSpoke~');
  $(".Mask").removeClass("focus");
  $(".Home").removeClass("focus");
  Staff.lairs.forEach(function(lair, i)
  { var dur = (Math.abs(Staff.pike.diff(Gate[i][lair])));
    if (dur < durTime)
      {$("." + Cycles[i] + "Box ." + Spokes[lair].name).addClass("focus");
       $('.' + Cycles[i] + 'Panel .Home').addClass('focus');
      };
  });
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
// **********************************************************************************

function cleanStaff()
{
  Staff = { pike: moment(), 
              alias: '', 
              Id: 'Staff', 
              astro: 0,
              ground: currGPS, 
              lairs: [], 
              angles: []
             };
}

// **********************************************************************************

function showStick(Stick)
{
  var area = {};
  area.radius = 127;
  // console.log('SHOW: ~showStick~ : lairs: ', Stick.lairs);
  removeStick(Stick);
  Stick.angles.forEach(function(angle, i)
  {
    area.angle = angle;
    // test(Stick.astro, 'Stick.astro');
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
  // test(astro, 'astro');
  var link = Astros[astro].link;
  // test(link, 'link');
  // $('img.' + Id).remove();
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
  {
    if ($("." + Cycles[Id] + "Box ." + mask.name).hasClass("active")) return;
    $("." + Cycles[Id] + "Box .Mask").removeClass("active");
    $("." + Cycles[Id] + "Box ." + mask.name).addClass("active");
  }
  // console.log('SHOW: ~activeLair~ : lairs: ', lairs);
  lairs.forEach(function(num, Id)
  {
    // console.log('SHOW: ~activeLair~ ' + Cycles[Id] + ' ' + Spokes[num].name);
    var mask = Spokes[num];
    activeMask(Id, mask);
    activeHomePanel(Id, mask);
  });
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
       // test($('.' + Cycles[i] + 'Panel .Home'), 'Panel.Home');
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

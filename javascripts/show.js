var showArea = [];

// ************************************************************************************

function showStick(Stick)
{
  var area = {};
  area.radius = wheelArea[1].radius;
  removeStick(Stick);
  Stick.angles.forEach(function(angle, i)
  {
    area.angle = angle;
    showAstro(Cycles[i], Stick.astro, Stick.Id, area);
  });
  setForm(Stick); 
  focusAstro(Stick);
  activeLair(Stick.lairs);
  focusSpoke();
  focusNowButton();
}

// ************************************************************************************

function showNabers()
{
  $('.Stick').remove();
  showArea = new Array();
  showArea[0] = new Array();
  showArea[1] = new Array();
  showArea[2] = new Array();
  // test(showArea, 'showArea in begin');
  showArea[0][Staff.lairs[0]] = 1;
  showArea[1][Staff.lairs[1]] = 1;
  showArea[2][Staff.lairs[2]] = 1;
  // test(showArea, 'showArea with Staff');
  Nabers.forEach(function(wheelNabers, Num)
  {
    // test(showArea, 'showArea in ' + Cycles[Num] + ' cycle');
    for (var i = 0; i < wheelNabers.length; i++) {
      var area = {};
      var Stick = wheelNabers[i];
      var astro = Stick.astro;
      var Id = 'Stick ' + Stick.Id;
      var cycle = Cycles[Num];
      var stickArea = showArea[Num][Stick.lair];
      if (stickArea === undefined) 
      {
        area.radius = wheelArea[1].radius;
        showArea[Num][Stick.lair] = 1;
      }
      else
      {
        showArea[Num][Stick.lair] = ++stickArea;
        area.radius = wheelArea[stickArea].radius;
      }
      area.angle = Stick.angle;
      showAstro(cycle, astro, Id, area);
    };
  });
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
   if ((dur < 300000) && (nowButtonOn)) {$('img.Button.Green').addClass('focus')};
}

// **********************************************************************************

function focusAstro(Stick)
{
  // $(".Staff").removeClass("focus");
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

function showDemo()
{
  var elem;
  var title;
  var text;
  var comm;
  elem = '.EarthBox';
  title = 'Demo title';
  text = 'This is demo text';
  comm = 'comment';
  showTip(title, text, comm, elem);
}

function showTip(title, text, comm, elem)
{
    var color = 'demoColor';
    var $demoTip = $('<div class = wheelTip>').hide();
    var $titleTip = $("<div class = 'titleTip "+ color +"'>")
                  .text(title);
    var $textTip = $("<div class = timeTip>")
                  .text(text);
    var $commTip = $('<div class = commTip>').text(comm);
    $demoTip.append($titleTip).append($textTip).append($commTip);
    $(".MoonBox").append($demoTip);
    $('.wheelTip').fadeTo(600, 1);
    $(elem).addClass('show');
    setTimeout(function(){
      $(elem).removeClass('show');
      $('.wheelTip').remove();
    }, 5000);
}
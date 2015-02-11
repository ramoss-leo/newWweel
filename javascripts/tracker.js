// ***********************************************************************************

function trackStaff() 
{
  Staff = {alias: 'Here and Now Staff!', pike: moment(), ground: GPS[0]};
  openGate(Staff);
  // showGateInConsole();
  Staff.lairs = trackLairs(Staff.pike);
  Staff.angles = trackAngles(Staff);
  Staff.astro = 0;
  // showStickInConsole(Staff);
}

// ***********************************************************************************

function trackAngles(Stick)
{
  var lairAngle  = 11.25;
  var Angles = []; // result - three angles of three lairs

  Stick.lairs.forEach(function(lair, i)
    {
     if (Stick.pike.isBefore(Gate[i][lair]))
       {lairScope = trackScope(Gate[i][lair-1], Gate[i][lair])}
     else if (Stick.pike.isAfter(Gate[i][lair]))
       {lairScope = trackScope(Gate[i][lair], Gate[i][lair+1])}
     else if (Stick.pike.isSame(Gate[i][lair]))
       { console.log('Stik pike is same spoke - ' + i + ' ' + lair);
         var lairScope = trackScope(Gate[i][lair], Gate[i][lair+1]);      }
     else {console.log('UNKNOWN ERRROR!'); return null;}
     var spikeDur   = Stick.pike.diff(Gate[i][lair]);
     var spikeAngle = lairAngle*spikeDur/lairScope;
     var ripeAngle  = Spokes[lair].angle + spikeAngle;
     Angles.push(ripeAngle);
    });
  return Angles;
}

// ***********************************************************************************

function trackScope(spokeA, spokeB) {return (parseInt(Math.abs(spokeA.diff(spokeB))/2));}
function radian(grad) {var PI = 3.14159; return ((grad*PI)/180);};

// ***********************************************************************************

function PointPX(angle, radius)
{
  var point = {};
  point.X = wheelCenter.X + Math.cos(radian(angle))*radius;
  point.Y = wheelCenter.Y - Math.sin(radian(angle))*radius;
  return point;
}

// ***********************************************************************************

function trackLairs(Spike)
{
  var Lairs = []; // result - three numbers of lairs
  Gate.forEach(function(Wheel, i)
  { var minDur = Math.abs(Spike.diff(Wheel[0])); var Num = 0;
    Wheel.forEach(function(Spoke, j) 
    { var Dur = Math.abs(Spike.diff(Spoke));
      if (Dur < minDur) {minDur = Dur; Num = j}; });
    Lairs.push(Num); });
  return Lairs;
}

// **********************************************************************************

function trackMasks() // run masks clickers
{
  function clickMask(cycle, name) // cliker of any msk
  {
    $("." + cycle + "Box ." + name).on("click", function()
     {  console.log('TRACKER: ' + cycle + " " + name + ' is click!');
        focusMask(cycle, name); });
  }
  console.log('TRACKER: ~maskTracker~ is run!');
  for (var i = 0; i < (Spokes.length - 1); i++)
    {for (var Id = 0; Id < Cycles.length; Id++)
      {clickMask(Cycles[Id], Spokes[i].name);};
    };
}

// ***********************************************************************************

function trackAstros()
{
  function clickAstro(Name)
  {
    $("." + Name).on("click", function()
     {
       var astro = Atlas[astroNum(Name)];
       focusAstro(Name);
       activeLair(astro);
     });
  }
  for (var i = 0; i < astroNumber; i++)
  {
    var Name = "astro" + i;
    clickAstro(Name);
  };
}

// ***********************************************************************************
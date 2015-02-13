// ***********************************************************************************

function trackStaff() 
{
  // console.log('TRACKER: ~trackStaff~:');
  // removeStick(Staff);
  // test(Staff, 'clean Staff');
  // test(Gate, 'old Gate');
  Staff = {alias: 'Here and Now!', pike: moment(), ground: currGPS};
  openGate(Staff);
  // test(Gate, 'new Gate');
  // Staff.lairs = trackLairs(Staff.pike);  
  // Staff.angles = trackAngles(Staff);
  trackArea(Staff);
  Staff.astro = 0;
  Staff.Id = 'Staff';
  // test(Staff, 'new Staff');
  // console.log('TRACKER: ~trackStaff~ }');
}

// ***********************************************************************************

function trackStick(newSpike, newGPS, newAlias)
{
  // console.log('TRACKER: ~trackStick~:');
  cleanStaff();
  // test(Staff, 'clean Staff');
  Staff.alias = newAlias;
  Staff.pike = newSpike;
  Staff.ground = newGPS;
  openGate(Staff);
  trackArea();
  // test(Staff, 'new Staff');
  showStick(Staff);
  stickTip(Staff);
  // console.log('TRACKER: ~trackStick~ }');
}

// ***********************************************************************************

function trackArea()
{
  // console.log('TRACKER: ~trackArea~:');
  Staff.lairs = trackLairs(Staff.pike);
  Staff.angles = trackAngles(Staff);
  // console.log('TRACKER: ~trackArea~ end!');
}

// ***********************************************************************************

function trackLairs(Spike)
{
  // console.log('TRACKER: ~trackLairs~ :');
  var Lairs = new Array();// result - three numbers of lairs
  // test(Lairs, 'clean array Lairs');
  Gate.forEach(function(Wheel, i)
  { var minDur = Math.abs(Spike.diff(Wheel[0])); var Num = 0;
    Wheel.forEach(function(Spoke, j) 
    { var Dur = Math.abs(Spike.diff(Spoke));
      if (Dur < minDur) {minDur = Dur; Num = j}; });
    Lairs.push(Num); });
  // test(Lairs, 'new array Lairs');
  // console.log('TRACKER: ~trackLairs~ }');
  return Lairs;
}

// **********************************************************************************

function trackAngles(Stick)
{
  var lairAngle  = 11.25;
  var Angles = []; // result - three angles of three lairs

  // console.log('TRACKER: ~trackAngles~:');
  Stick.lairs.forEach(function(lair, i)
    {
      // test(Gate[i][lair], 'Gate[i][lair]');
     if (Stick.pike.isBefore(Gate[i][lair]))
       {lairScope = trackScope(Gate[i][lair-1], Gate[i][lair])}
     else if (Stick.pike.isAfter(Gate[i][lair]))
       {lairScope = trackScope(Gate[i][lair], Gate[i][lair+1])}
     else if (Stick.pike.isSame(Gate[i][lair]))
       { //console.log('Stick pike is same spoke - ' + i + ' ' + lair);
         var lairScope = trackScope(Gate[i][lair], Gate[i][lair+1]);      }
     else {console.log('UNKNOWN ERRROR!'); return null;}
     var spikeDur   = Stick.pike.diff(Gate[i][lair]);
     var spikeAngle = lairAngle*spikeDur/lairScope;
     var ripeAngle  = Spokes[lair].angle + spikeAngle;
     Angles.push(ripeAngle);
    });
  // test(Angles, 'new Angles');
  return Angles;
}

// ***********************************************************************************

function trackScope(spokeA, spokeB) {return (parseInt(Math.abs(spokeA.diff(spokeB))/2));}
function radian(grad) {var PI = 3.14159; return ((grad*PI)/180);};

// ***********************************************************************************

function trackNowButton()
{
  $('img.Button.Green').on('click', function()
  {
    // console.log('TRACKER: ~trackNowButton~ click!!!');
    // test(Staff);
    // removeStick(Staff);
    // test(Staff);
    $(this).addClass('focus');
    trackStaff();
    showStick(Staff);
    stickTip(Staff);
  });
  // console.log('TRACKER: ~trackNowButton~ run!');
}

// **********************************************************************************

function trackHomeControl()
{
  Cycles.forEach(function(cycle, i)
  {
    // console.log('TRACKER: ~trackHomeControl~: ' + cycle + 'Panel run!');
    $('.' + cycle + 'Panel .Home').on('click', function()
      {var newSpike = moment(Gate[i][Staff.lairs[i]]);
       var newAlias = cycle + ' ' + Spokes[Staff.lairs[i]].name;
       trackStick(newSpike, currGPS, newAlias);});
//--------------------------------------------------------------------
    $('.' + cycle + 'Panel .prevHome').on('click', function()
      {
        // console.log(cycle + 'Panel prevHome click!');
        var newSpike = moment(Gate[i][Staff.lairs[i]]);
        var newAlias = 'search stick';
        // test(newSpike.format('YYYY MM DD HH:mm:ss'), 'newSpike before subtract');
        // test(newAlias, 'newAlias');
        // test(Staff.lairs[i], 'Staff.lairs[i]');
        switch (true) {
          case (Staff.lairs[i] < 8): 
            switch (i) { 
              case 0: newSpike.subtract(5, 'months'); break;
              case 1: newSpike.subtract(13, 'days'); break;
              case 2: newSpike.subtract(11, 'hours'); break;
                        } break;
          case (Staff.lairs[i] > 7): 
            switch (i) { 
              case 0: newSpike.subtract(11, 'months'); break;
              case 1: newSpike.subtract(27, 'days'); break;
              case 2: newSpike.subtract(23, 'hours'); break;
                        } break;
                      };
        // test(newSpike.format('YYYY MM DD HH:mm:ss'), 'newSpike after subtract');
        var lair = Staff.lairs[i];
        trackStick(newSpike, currGPS, newAlias);
        newSpike = Gate[i][lair];
        newAlias = Cycles[i] + ' ' + Spokes[lair].name;
        trackStick(newSpike, currGPS, newAlias);
      });
//--------------------------------------------------------------------
    $('.' + cycle + 'Panel .nextHome').on('click', function()
      {
        // console.log(cycle + 'Panel nextHome click!');
        var newSpike = moment(Gate[i][Staff.lairs[i]]);
        var newAlias = 'search stick';
        // test(newSpike.format('YYYY MM DD HH:mm:ss'), 'newSpike before addition');
        // test(newAlias, 'newAlias');
        // test(Staff.lairs[i], 'Staff.lairs[i]');
        switch (true) {
          case (Staff.lairs[i] < 8): 
            switch (i) { 
              case 0: newSpike.add(17, 'months'); break;
              case 1: newSpike.add(38, 'days'); break;
              case 2: newSpike.add(33, 'hours'); break;
                        } break;
          case (Staff.lairs[i] > 7): 
            switch (i) { 
              case 0: newSpike.add(7, 'months'); break;
              case 1: newSpike.add(25, 'days'); break;
              case 2: newSpike.add(16, 'hours'); break;
                        } break;
                      };
        // test(newSpike.format('YYYY MM DD HH:mm:ss'), 'newSpike after addition');
        var lair = Staff.lairs[i];
        trackStick(newSpike, currGPS, newAlias);
        newSpike = Gate[i][lair];
        newAlias = Cycles[i] + ' ' + Spokes[lair].name;
        trackStick(newSpike, currGPS, newAlias);
      });
//--------------------------------------------------------------------
  }); // end Cycles.forEach
}

// **********************************************************************************

function trackMasks() // run masks clickers
{
  function clickMask(I) // cliker of any msk
  {
    Spokes.forEach(function(spoke, J){
    $("." + Cycles[I] + "Box ." + Spokes[J].name).on("click", function()
     {  //console.log('TRACKER: ~clickMask~: ' + Cycles[I] + " " + Spokes[J].name);
        var newSpike = Gate[I][J];
        var newAlias = Cycles[I] + ' ' + Spokes[J].name;
        trackStick(newSpike, currGPS, newAlias);
     });
    });
  }
  // for (var i = 0; i < (Spokes.length - 1); i++)
  //   {for (var Id = 0; Id < Cycles.length; Id++)
      Cycles.forEach(function(cycle, I) {
        // Spokes.forEach(function(spoke, J){
          clickMask(I);   
        // });
      });
      // {clickMask(Id, i);
    //   };
    // };
  // console.log('TRACKER: ~trackMasks~ is run!');
}

// ***********************************************************************************
// ***********************************************************************************

function trackTips()
{
  Cycles.forEach(function(cycle, c) {spokesTip(c);});
  stickTip(Staff);
}
// ***********************************************************************************

function trackStickComment(Spike, Spoke, i)
{
  var comment = 'somewhere in ';
  var dur = Math.abs(Spike.diff(Spoke));
  if (dur < (durTime/5)) {comment = 'pike of '; return comment};
  var minDur = durTime*3 + (2 - i)*(2 - i)*(2 - i)*durTime*50;
  if (dur < minDur) {comment = 'depth of '; return comment;};
  if (Spike.isBefore(Spoke)) {comment = 'before '} else
   {if (Spike.isAfter(Spoke)) {comment = 'after '}};
  return comment;
}

// ***********************************************************************************

function stickTip(Stick)
{
  var type = Astros[Stick.astro].type;
  Stick.lairs.forEach(function(lair, i)
  {
    $("." + Cycles[i] + "Box ." + Stick.Id)
    .mouseover(function() {
     var comment = trackStickComment(Stick.pike, Gate[i][lair], i);
     $stickTip = $('<div class = wheelTip>').hide();
     $aliasTip = $("<div class = 'titleTip "+ type +"'>")
                 .text(Stick.alias);
     $commTip = $('<div class = commTip>').text(comment + Times[i][lair]);
     $dateTip = $("<div class = dateTip>")
                 .text(Stick.pike.format('DD MMMM, YYYY'));
     $timeTip = $("<div class = timeTip>")
                 .text(Stick.pike.format('HH:mm:ss (dddd)'));
     $stickTip.append($aliasTip).append($commTip).append($dateTip).append($timeTip);
     $("." + Cycles[i] + "Box").append($stickTip);
     $('.wheelTip').fadeTo(600, 1);
    })
    .mouseout(function()
    {$('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
  });
}

// ***********************************************************************************

function spokesTip(j)
{
  Spokes.forEach(function(spoke, i)
  {  
    $("." + Cycles[j] + "Box ." + spoke.name)
    .mouseover(function(){
       $maskTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[j] + ' ' + spoke.name);
       $commTip = $('<div class = commTip>').text(Times[j][i]);
       $dateTip = $("<div class = dateTip>")
                  .text(Gate[j][i].format('DD MMMM, YYYY'));
       $timeTip = $("<div class = timeTip>")
                  .text(Gate[j][i].format('HH:mm:ss   (dddd)'));
       $maskTip.append($spokeTip).append($commTip).append($dateTip).append($timeTip);
       $("." + Cycles[j] + "Box").append($maskTip);
       $('.wheelTip').fadeTo(600, 1);
      })    
    .mouseout(function()
    {$('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
  });
}

// ***********************************************************************************
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
// ***********************************************************************************

function autoStaff()
{ if(nowButtonOn)
  { console.log('SHOW: ~autoStaff~ is active!');
    trackStaff();
    setTimeout(function(){setTimeout(function(){autoStaff();},1000);},1000);
  }
}

// **********************************************************************************

function trackStaff() 
{
  // console.log('TRACKER: ~trackStaff~:');
  cleanStaff();
  Staff = {alias: 'Here and Now!', pike: moment(), ground: currGPS};
  openGate(Staff);
  trackArea(Staff);
  Staff.astro = 0;
  Staff.Id = 'Staff';
  showStick(Staff);
  trackHomeControl();
  trackNewTips();
  // console.log('TRACKER: ~trackStaff~ }');
}

// ***********************************************************************************

function trackStick(newSpike, newGPS, newAlias)
{
  // console.log('TRACKER: ~trackStick~:');
  cleanStaff();
  Staff.alias = newAlias;
  Staff.pike = newSpike;
  Staff.ground = newGPS;
  openGate(Staff);
  trackArea();
  showStick(Staff);
  trackControlTip();
  trackNewTips();
  nowButtonOn = false;
  console.log('TRACKER: Now mode OFF!');
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
  Gate.forEach(function(Wheel, i)
  { var minDur = Math.abs(Spike.diff(Wheel[0])); var Num = 0;
    Wheel.forEach(function(Spoke, j) 
    { var Dur = Math.abs(Spike.diff(Spoke));
      if (Dur < minDur) {minDur = Dur; Num = j}; });
    Lairs.push(Num); });
  // console.log('TRACKER: ~trackLairs~ }');
  return Lairs;
}

// **********************************************************************************

function trackAngles(Stick)
{
  var lairAngle  = 11.25;
  var Angles = []; // result - three angles of three lairs

  Stick.lairs.forEach(function(lair, i)
    {
     if (Stick.pike.isBefore(Gate[i][lair]))
       {var lairScope = trackScope(Gate[i][lair-1], Gate[i][lair])}
     else if (Stick.pike.isAfter(Gate[i][lair]))
       {var lairScope = trackScope(Gate[i][lair], Gate[i][lair+1])}
     else if (Stick.pike.isSame(Gate[i][lair]))
       {var lairScope = trackScope(Gate[i][lair], Gate[i][lair+1]);}
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

// ***********************************************************************************

function trackNowButton()
{
  $('img.Button.Green').on('click', function()
  {
    $(this).addClass('focus');
    nowButtonOn = true;
    autoStaff();
  });
}

// **********************************************************************************

function trackHomeControl()
{
  Cycles.forEach(function(cycle, i)
  {
    $('.' + cycle + 'Panel .Home').on('click', function()
      {var newSpike = moment(Gate[i][Staff.lairs[i]]);
       var newAlias = cycle + ' ' + Spokes[Staff.lairs[i]].name;
       trackStick(newSpike, currGPS, newAlias);});
//--------------------------------------------------------------------
    $('.' + cycle + 'Panel .prevHome').on('click', function()
      {
        var newSpike = moment(Gate[i][Staff.lairs[i]]);
        var newAlias = 'search stick';
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
        var lair = Staff.lairs[i];
        trackStick(newSpike, currGPS, newAlias);
        newSpike = Gate[i][lair];
        newAlias = Cycles[i] + ' ' + Spokes[lair].name;
        trackStick(newSpike, currGPS, newAlias);
      });
//--------------------------------------------------------------------
    $('.' + cycle + 'Panel .nextHome').on('click', function()
      {
        var newSpike = moment(Gate[i][Staff.lairs[i]]);
        var newAlias = 'search stick';
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
        var lair = Staff.lairs[i];
        trackStick(newSpike, currGPS, newAlias);
        newSpike = Gate[i][lair];
        newAlias = Cycles[i] + ' ' + Spokes[lair].name;
        trackStick(newSpike, currGPS, newAlias);
      });
//--------------------------------------------------------------------
  }); // end Cycles.forEach
  // console.log('TRACKER: ~trackHomeControl~ run!');
}

// **********************************************************************************

function trackMasks() // run masks clickers
{
  function clickMask(I) // cliker of any msk
  { Spokes.forEach(function(spoke, J){
    $("." + Cycles[I] + "Box ." + Spokes[J].name).on("click", function()
     {  var newSpike = Gate[I][J];
        var newAlias = Cycles[I] + ' ' + Spokes[J].name;
        trackStick(newSpike, currGPS, newAlias);});});
  }
  Cycles.forEach(function(cycle, I) {clickMask(I);});
}

// ***********************************************************************************
// ***********************************************************************************

function trackTips()
{
  trackWheelTip();
  nowButtonTip();
}

// ***********************************************************************************

function trackNewTips()
{
  trackControlTip();
  trackStickTip(Staff);
}

// ***********************************************************************************

function trackControlTip()
{ 
  function homeControlTip(Num)
  {
  $("." + Cycles[Num] + "Panel .Home")
    .mouseover(function(){
       var spokeNum = Staff.lairs[Num];
       var spoke = Spokes[spokeNum];
       $homeTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[Num] + ' ' + spoke.name);
       $commTip = $('<div class = commTip>').text(Times[Num][spokeNum]);
       $dateTip = $("<div class = dateTip>")
                  .text(Gate[Num][spokeNum].format('DD MMMM, YYYY'));
       $timeTip = $("<div class = timeTip>")
                  .text(Gate[Num][spokeNum].format('HH:mm:ss   (dddd)'));
       $homeTip.append($spokeTip).append($commTip).append($dateTip).append($timeTip);
       $("." + Cycles[Num] + "Box").append($homeTip);
       $('.wheelTip').fadeTo(600, 1);
      })    
    .mouseout(function()
    {$('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
  //-------------------------------------------------------------------
  $("." + Cycles[Num] + "Panel .prevHome")
    .mouseover(function(){
       var spokeNum = Staff.lairs[Num];
       var spoke = Spokes[spokeNum];
       $homeTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[Num] + ' ' + spoke.name);
       $commTip = $("<div class = commTip>").text(Times[Num][spokeNum]);
       $deepTip = $('<div class = dateTip>').text('Deep in Past!');
       $homeTip.append($spokeTip).append($commTip).append($deepTip);
       $("." + Cycles[Num] + "Box").append($homeTip);
       $('.wheelTip').fadeTo(600, 1);
      })    
    .mouseout(function()
    {$('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
  //-------------------------------------------------------------------
   $("." + Cycles[Num] + "Panel .nextHome")
    .mouseover(function(){
       var spokeNum = Staff.lairs[Num];
       var spoke = Spokes[spokeNum];
       $homeTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[Num] + ' ' + spoke.name);
       $commTip = $("<div class = commTip>").text(Times[Num][spokeNum]);
       $jumpTip = $('<div class = dateTip>').text('Jump in Future!');
       $homeTip.append($spokeTip).append($commTip).append($jumpTip);
       $("." + Cycles[Num] + "Box").append($homeTip);
       $('.wheelTip').fadeTo(600, 1);
      })    
    .mouseout(function()
    {$('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
    // console.log('TRACKER: ~homeControlTip~ run!');
  }
  Cycles.forEach(function(cycle, i)
  {homeControlTip(i);});
}

// ***********************************************************************************

function trackWheelTip()
{
  function spokesTip(j)
  {Spokes.forEach(function(spoke, i)
   {$("." + Cycles[j] + "Box ." + spoke.name)
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
       $('.wheelTip').fadeTo(700, 1);
      }).mouseout(function()
    {$('.wheelTip').fadeTo(500, 0, function(){$(this).remove();});});});
  }
  Cycles.forEach(function(cycle, i)
   {spokesTip(i);});
}

// ***********************************************************************************

function nowButtonTip()
{
  $(".Button.Green").mouseover(function() {
   var title = 'Here and Now!';
   if (nowButtonOn) {var comment = 'Mode is active';} else
   {var comment = 'Press for activate';};
   $buttonTip = $('<div class = greenTip>').hide();
   $titleTip = $("<div class = 'titleTip Green'>").text(title);
   $greenStar = $("<img src= '" + Astros[0].link + "'>");
   $commTip = $("<div class = 'dateTip'>").text(comment);
   $buttonTip.append($titleTip).append($greenStar).append($commTip);
   setTimeout(function()
    {$(".EarthBox").append($buttonTip); $('.greenTip').fadeTo(500, 1);},1000);})
   .mouseout(function(){$('.greenTip').fadeTo(400, 0, function(){$(this).remove();});});
   // console.log('TRACKER: ~nowButtonTip~ run!');
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

function trackStickTip(Stick)
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
     $('.wheelTip').fadeTo(700, 1);
    })
    .mouseout(function()
    {$('.wheelTip').fadeTo(500, 0, function(){$(this).remove();});});
  });
  // console.log('TRACKER: ~stickTip~ run!');
}

// ***********************************************************************************
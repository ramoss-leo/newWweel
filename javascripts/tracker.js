// ***********************************************************************************

function autoStaff()
{ if(nowButtonOn)
  { 
    // console.log('TRACKER: ~autoStaff~ is active!');
    trackStaff();
    setTimeout(function(){setTimeout(function(){autoStaff();},1000);},1000);
  }
}

// **********************************************************************************

function trackStaff() 
{
  // console.log('TRACKER: ~trackStaff~:');
  Staff.alias = 'Present Time';
  Staff.pike = moment();
  Staff.ground = currGPS;
  Staff.Id = 'Staff';
  openGate(Staff);
  trackArea(Staff);
  showStick(Staff);
  trackHomeControl();
  trackNewTips();
  // console.log('TRACKER: ~trackStaff~ }');
}

// ***********************************************************************************

function trackStick(Stick)
{
  // console.log('TRACKER: ~trackStick~:');
  removeStick(Staff);
  nowButtonOn = false;
  if (Stick.alias !== '')
    {Staff.alias = Stick.alias;
     var dur = (Math.abs(Stick.pike.diff(moment())));
     if ((saveNow) && (dur < 300000)) {nowButtonOn = true}}
  else
    { var dur = (Math.abs(Stick.pike.diff(moment())));
      if ((saveNow) && (dur < 300000)) {nowButtonOn = true}
      else { saveNow = false;
             if (Stick.pike.isBefore(moment())) {Stick.alias = 'Somewere in the Past'}
             else if (Stick.pike.isAfter(moment())) {Stick.alias = 'Somewere in the Future'}
            }
    }
  Staff = Stick;
  currGPS =Staff.ground;
  openGate(Staff);
  trackArea();
  showStick(Staff);
  trackHomeControl();
  trackNewTips();
  if (nowButtonOn) {autoStaff()}
  // console.log('TRACKER: Now mode OFF!');
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
    if (nowButtonOn) //$(this).hasClass('focus'))
    {
      $('img.Button.Green').removeClass('focus'); nowButtonOn = false;
      $('.greenTip .dateTip').text('Mode is OFF!');
    }
    else
    {
      $('img.Button.Green').addClass('focus'); nowButtonOn = true;
      $('.greenTip .dateTip').text('Mode is ON!');
      Staff.astro = 0;
    }
    autoStaff();
  });
}

// **********************************************************************************

function trackHomeControl()
{
  // console.log('TRACKER: ~trackHomeContorol~');
  Cycles.forEach(function(cycle, i)
  {
    $('.' + cycle + 'Panel .Home').on('click', function()
      {
       // console.log('TRACKER: ' + Cycles[i] + ' Home click!');
       var Stick = {};
       Stick.pike = moment(Gate[i][Staff.lairs[i]]);
       Stick.alias = cycle + ' ' + Spokes[Staff.lairs[i]].name;
       Stick.ground = currGPS;
       Stick.astro = Staff.astro;
       Stick.Id = Staff.Id;
       trackStick(Stick);});
//--------------------------------------------------------------------
    $('.' + cycle + 'Panel .prevHome').on('click', function()
      {
        // console.log('TRACKER: ' + Cycles[i] + ' prevHome click!');
        var Stick = {};
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
        Stick.pike = newSpike;
        Stick.ground = currGPS;
        Stick.alias = newAlias;
        Stick.astro = Staff.astro;
        Stick.Id = Staff.Id;
        trackStick(Stick);
        Stick.pike = Gate[i][lair];
        Stick.alias = Cycles[i] + ' ' + Spokes[lair].name;
        Stick.Id = Staff.Id;
        trackStick(Stick);
      });
//--------------------------------------------------------------------
    $('.' + cycle + 'Panel .nextHome').on('click', function()
      {
        // console.log('TRACKER: ' + Cycles[i] + ' nextHome click!');
        var Stick = {};
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
        Stick.pike = newSpike;
        Stick.ground = currGPS;
        Stick.alias = newAlias;
        Stick.astro = Staff.astro;
        Stick.Id = Staff.Id;
        trackStick(Stick);
        Stick.pike = Gate[i][lair];
        Stick.alias = Cycles[i] + ' ' + Spokes[lair].name;
        Stick.Id = Staff.Id;
        trackStick(Stick);
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
     {  var Stick = {};
        Stick.pike = Gate[I][J];
        Stick.alias = Cycles[I] + ' ' + Spokes[J].name;
        Stick.ground = currGPS;
        Stick.astro = Staff.astro;
        Stick.Id = Staff.Id;
        trackStick(Stick);});});
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
    var currTip;
  $("." + Cycles[Num] + "Panel .Home")
    .mouseover(function(){
       currTip = setTimeout(function(){
       var spokeNum = Staff.lairs[Num];
       var spoke = Spokes[spokeNum];
       var $homeTip = $('<div class = wheelTip>').hide();
       var $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[Num] + ' ' + spoke.name);
       var $commTip = $('<div class = commTip>').text(Times[Num][spokeNum]);
       var $dateTip = $("<div class = dateTip>")
                  .text(Gate[Num][spokeNum].format('DD MMMM, YYYY'));
       var $timeTip = $("<div class = timeTip>")
                  .text(Gate[Num][spokeNum].format('HH:mm:ss   (dddd)'));
       var $gpsTip = $('<div class = commTip>').text(currGPS.name);
       $homeTip.append($spokeTip).append($commTip).append($dateTip).append($timeTip).append($gpsTip);
       $("." + Cycles[Num] + "Box").append($homeTip);
       $('.wheelTip').fadeTo(600, 1);},600);
      })    
    .mouseout(function()
    { clearTimeout(currTip);
      $('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
  //-------------------------------------------------------------------
  $("." + Cycles[Num] + "Panel .prevHome")
    .mouseover(function(){
      currTip = setTimeout(function(){
       var spokeNum = Staff.lairs[Num];
       var spoke = Spokes[spokeNum];
       $homeTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[Num] + ' ' + spoke.name);
       $commTip = $("<div class = commTip>").text(Times[Num][spokeNum]);
       $deepTip = $('<div class = dateTip>').text('Deep in Past!');
       $homeTip.append($spokeTip).append($commTip).append($deepTip);
       $("." + Cycles[Num] + "Box").append($homeTip);
       $('.wheelTip').fadeTo(600, 1);},600);
      })    
    .mouseout(function()
    { clearTimeout(currTip);
      $('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
  //-------------------------------------------------------------------
   $("." + Cycles[Num] + "Panel .nextHome")
    .mouseover(function(){
      currTip = setTimeout(function(){
       var spokeNum = Staff.lairs[Num];
       var spoke = Spokes[spokeNum];
       $homeTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[Num] + ' ' + spoke.name);
       $commTip = $("<div class = commTip>").text(Times[Num][spokeNum]);
       $jumpTip = $('<div class = dateTip>').text('Jump in Future!');
       $homeTip.append($spokeTip).append($commTip).append($jumpTip);
       $("." + Cycles[Num] + "Box").append($homeTip);
       $('.wheelTip').fadeTo(600, 1);},600);
      })    
    .mouseout(function()
    { clearTimeout(currTip);
      $('.wheelTip').fadeTo(600, 0, function(){$(this).remove();});});
    // console.log('TRACKER: ~homeControlTip~ run!');
  }
  Cycles.forEach(function(cycle, i)
  {homeControlTip(i);});
}

// ***********************************************************************************

function trackWheelTip()
{
  var currTip;
  function spokesTip(j)
  {Spokes.forEach(function(spoke, i)
   {$("." + Cycles[j] + "Box ." + spoke.name)
    .mouseover(function(){
       currTip = setTimeout(function()
       {
       $maskTip = $('<div class = wheelTip>').hide();
       $spokeTip = $("<div class = 'titleTip "+ spoke.color +"'>")
                  .text(Cycles[j] + ' ' + spoke.name);
       $commTip = $('<div class = commTip>').text(Times[j][i]);
       $dateTip = $("<div class = dateTip>")
                  .text(Gate[j][i].format('DD MMMM, YYYY'));
       $timeTip = $("<div class = timeTip>")
                  .text(Gate[j][i].format('HH:mm:ss   (dddd)'));
       var $gpsTip = $('<div class = commTip>').text(currGPS.name);
       $maskTip.append($spokeTip).append($commTip).append($dateTip).append($timeTip).append($gpsTip);
       $("." + Cycles[j] + "Box").append($maskTip);
       $('.wheelTip').fadeTo(600, 1);
     }, 700);
      }).mouseout(function()
    { clearTimeout(currTip);
      $('.wheelTip').fadeTo(500, 0, function(){$(this).remove();});});});
  }
  Cycles.forEach(function(cycle, i)
   {spokesTip(i);});
}

// ***********************************************************************************

function nowButtonTip()
{ var currTip;
  $(".Button.Green").mouseover(function() {
   currTip = setTimeout(function(){
   var title = 'Present Time';
   if (nowButtonOn) {var comment = 'Mode is ON'} else
   {var comment = 'Mode is OFF'}
   $buttonTip = $('<div class = greenTip>').hide();
   $titleTip = $("<div class = 'titleTip Green'>").text(title);
   $greenStar = $("<img src= '" + Astros[0].link + "'>");
   $commTip = $("<div class = 'dateTip'>").text(comment);
   $buttonTip.append($titleTip).append($greenStar).append($commTip);
   $(".EarthBox").append($buttonTip); $('.greenTip').fadeTo(500, 1);}, 1000);
  }).mouseout(function(){
    clearTimeout(currTip);
    $('.greenTip').fadeTo(400, 0, function(){$(this).remove();});});
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
    var currTip
    $("." + Cycles[i] + "Box ." + Stick.Id)
    .mouseover(function() {
     currTip = setTimeout(function(){
     var comment = trackStickComment(Stick.pike, Gate[i][lair], i);
     var $stickTip = $('<div class = wheelTip>').hide();
     var $aliasTip = $("<div class = 'titleTip "+ type +"'>")
                 .text(Stick.alias);
     var $commTip = $('<div class = commTip>').text(comment + Times[i][lair]);
     var $dateTip = $("<div class = dateTip>")
                 .text(Stick.pike.format('DD MMMM, YYYY'));
     var $timeTip = $("<div class = timeTip>")
                 .text(Stick.pike.format('HH:mm:ss (dddd)'));
     var $gpsTip = $('<div class = commTip>').text(currGPS.name);
     $stickTip.append($aliasTip).append($commTip).append($dateTip).append($timeTip).append($gpsTip);
     // if (i == 1) 
     //   {
     //     $moonTip = $("<div class = dateTip>")
     //     .text('Illumination: ' + (getMoonIllum(Stick.pike)).toFixed(3));
     //     $stickTip.append($moonTip);
     //   }
     $("." + Cycles[i] + "Box").append($stickTip);
     $('.wheelTip').fadeTo(700, 1);}, 600);
    })
    .mouseout(function()
    { clearTimeout(currTip);
      $('.wheelTip').fadeTo(500, 0, function(){$(this).remove();});});
  });
  // console.log('TRACKER: ~stickTip~ run!');
}

// ***********************************************************************************
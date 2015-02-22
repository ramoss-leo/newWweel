var Nabers = [];

// ***********************************************************************************

function autoStaff()
{ if(currButtons[0])
  { 
    trackStaff();
    setTimeout(function(){setTimeout(function(){autoStaff();},1000);},1000);
  }
}

// **********************************************************************************

function trackStaff() 
{
  removeStick(Staff);
  Staff.alias = Alias[0];
  Staff.pike = moment();
  Staff.ground = currGPS; Staff.Id = 'Staff';
  openGate(Staff); trackArea(Staff); showStick(Staff);
  trackNabers(); showNabers(); reloadLists();
  trackNabersClick(); trackHomeControl();
  trackNewTips();
}

// ***********************************************************************************

function trackStick(Stick)
{
  removeStick(Staff);
  currButtons[0] = false;
  if (Stick.alias !== '')
    {Staff.alias = Stick.alias}
  else
    { var dur = (Math.abs(Stick.pike.diff(moment())));
      if ((saveNow) && (dur < 300000)) {currButtons[0] = true}
      else { saveNow = false;
             if (Stick.pike.isBefore(moment())) {Stick.alias = Alias[1]}
             else if (Stick.pike.isAfter(moment())) {Stick.alias = Alias[2]}
           }
    }
  Staff = Stick;
  currGPS = Staff.ground;
  saveData('currGPS', currGPS);
  openGate(Staff); trackArea(); showStick(Staff);
  trackNabers(); showNabers(); trackNabersClick();
  trackHomeControl(); trackNewTips();
  if (currButtons[0]) {autoStaff()}
}

// ***********************************************************************************

function trackArea()
{
  Staff.lairs = trackLairs(Staff.pike);
  Staff.angles = trackAngles(Staff);
}

// ***********************************************************************************

function trackNewTips() {trackControlTip(); trackStickTip(Staff); trackNabersTips();}

// ***********************************************************************************

function trackNabersTips()
{
  function nabersTips(nabers, Num)
  {
    nabers.forEach(function(naber, i)
    {
      var currTip;
      $("." + Cycles[Num] + "Box ." + Nabers[Num][i].Id)
      .mouseover(function() 
      {
        currTip = setTimeout(function(){
        var Stick = Nabers[Num][i];
        if (Stick === undefined) return;
        var lair = Stick.lair;
        var type = Astros[Stick.astro].type;
        var ground = Stick.ground.name;
        var comment = trackStickComment(Stick.pike, Gate[Num][lair], Num);
        var $stickTip = $('<div class = wheelTip>').hide();
        var $aliasTip = $("<div class = 'titleTip "+ type +"'>")
                 .text(Stick.alias);
        var $commTip = $('<div class = commTip>').text(comment + Times[Num][lair]);
        var $dateTip = $("<div class = dateTip>")
                 .text(Stick.pike.format('DD MMMM, YYYY'));
        var $timeTip = $("<div class = timeTip>")
                 .text(Stick.pike.format('HH:mm:ss (dddd)'));
        var $gpsTip = $('<div class = commTip>').text(ground);
        $stickTip.append($aliasTip).append($commTip).append($dateTip)
        .append($timeTip).append($gpsTip);
        $("." + Cycles[Num] + "Box").append($stickTip);
        $('.wheelTip').fadeTo(700, 1);}, 600);
      })
      .mouseout(function()
      { clearTimeout(currTip);
        $('.wheelTip').fadeTo(500, 0, function(){$(this).remove();});
      });
    });
  }
  Cycles.forEach(function(cycle, i)
   {nabersTips(Nabers[i], i);});
}

// ***********************************************************************************

function trackNabers()
{
  var Stick;
  var key;
  var lair;
  var astro;
  Nabers = [];
  stickCount = loadData('stickCount');
  if (stickCount === null) stickCount = 0;
  Cycles.forEach(function(cycle, Num)
  {
    var wheelNabers = [];
    for (var i = 0; i < stickCount; i++)
     {
       key = 'stick' + i;
       Stick = loadData(key);
       astro = Stick.astro;
       if (currButtons[astro])
       {
        Stick.pike = moment(Stick.pike);
        lair = (naberLair(Stick.pike, Gate[Num]));
        if ((lair !== null) && (Stick.alias !== Staff.alias))
        {Stick.lair = lair;
         Stick.angle = naberAngle(Stick, Num);
         wheelNabers.push(Stick);}
       };
     };
     Nabers.push(wheelNabers);
  });
}

// ***********************************************************************************

function trackNabersClick()
{ function naberClick(nabers, I)
  { nabers.forEach(function(naber, J)
    { $('.' + Cycles[I] + 'Box .' + Nabers[I][J].Id).on('click', function()
      { var Stick = Nabers[I][J];
        Stick.Id = Staff.Id;
        currButtons[0] = false; saveNow = false;
        trackStick(Stick);});});
  }
  Nabers.forEach(function(nabers, I){naberClick(nabers, I)});
} 

// ***********************************************************************************

function naberLair(Spike, Wheel)
{
  if (!((Spike.isAfter(Wheel[0]))&&(Spike.isBefore(Wheel[16])))) 
    {return null}
  else
    {
      var minDur = Math.abs(Spike.diff(Wheel[0])); var lair = 0;
      Wheel.forEach(function(Spoke, j) 
       { var Dur = Math.abs(Spike.diff(Spoke));
         if (Dur < minDur) {minDur = Dur; lair = j};});
      return lair;
    }
}

// **********************************************************************************

function naberAngle(Stick, Num)
{
  var lairAngle  = 11.25;
  var lair = Stick.lair;
  if (Stick.pike.isBefore(Gate[Num][lair]))
       {var lairScope = trackScope(Gate[Num][lair-1], Gate[Num][lair])}
  else if (Stick.pike.isAfter(Gate[Num][lair]))
       {var lairScope = trackScope(Gate[Num][lair], Gate[Num][lair+1])}
  else if (Stick.pike.isSame(Gate[Num][lair]))
       {var lairScope = trackScope(Gate[Num][lair], Gate[Num][lair+1]);}
  else {console.log('UNKNOWN ERRROR!'); return null;}
  var spikeDur   = Stick.pike.diff(Gate[Num][lair]);
  var spikeAngle = lairAngle*spikeDur/lairScope;
  var ripeAngle  = Spokes[lair].angle + spikeAngle;
  return ripeAngle;
}

// ***********************************************************************************

function trackLairs(Spike)
{
  var Lairs = new Array(); // result - three numbers of lairs
  Gate.forEach(function(Wheel, i)
  { var minDur = Math.abs(Spike.diff(Wheel[0])); var Num = 0;
    Wheel.forEach(function(Spoke, j) 
    { var Dur = Math.abs(Spike.diff(Spoke));
      if (Dur < minDur) {minDur = Dur; Num = j}; });
    Lairs.push(Num); });
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

// **********************************************************************************

function trackButtons()
{
  Buttons.forEach(function(button, I)
  {
    $('img.Button.' + Buttons[I].name).on('click', function()
    {
     if (saveNow) {saveNow = false; currButtons[0] = true};
     if (currButtons[I])
     {$('img.Button.' + Buttons[I].name).removeClass('focus'); currButtons[I] = false;
      $('.buttonTip .dateTip').text('Mode is OFF!');
      if (Staff.astro === I) Staff.astro = 0;}
     else
     {$('img.Button.' + Buttons[I].name).addClass('focus'); currButtons[I] = true;
      $('.buttonTip .dateTip').text('Mode is ON!');
      if (I === 0) Staff.astro = 0;}
     saveData('currButtons', currButtons);
     if (currButtons[0]) {autoStaff();}
     else {trackNabers(); reloadLists(); trackStick(Staff);}
    });
  });
}

// **********************************************************************************

function trackHomeControl()
{
  Cycles.forEach(function(cycle, i)
  {
    $('.' + cycle + 'Panel .Home').on('click', function()
      {
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
  });
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

function trackTips() {trackWheelTip(); buttonTips();}

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

function buttonTips()
{ Buttons.forEach(function(button, I)
  {
  var currTip;
  $(".Button." + Buttons[I].name).mouseover(function() {
   currTip = setTimeout(function(){
   var title;
   var titleType = Buttons[I].name;
   if (I < 5) title = Buttons[I].name + ' Stars Show';
   if (I === 0) title = Alias[0];
   if (I > 4) 
    {title = Buttons[I].name + ' Moon Show'; titleType = 'Moon';}
   if (currButtons[I]) {var comment = 'Mode is ON'} else
   {var comment = 'Mode is OFF'}
   if ((I === 0) && (saveNow)) {var comment = 'Mode is ON'};
   var $buttonTip = $('<div class = "buttonTip">').hide();
   var $titleTip = $("<div class = 'titleTip " + titleType + "'>").text(title);
   var $astro = $("<img src= '" + Astros[I].link + "'>");
   var $commTip = $("<div class = 'dateTip'>").text(comment);
   $buttonTip.append($titleTip).append($astro).append($commTip);
   $("." + Buttons[I].box).append($buttonTip);
   $('.buttonTip').fadeTo(500, 1);}, 1000);
  }).mouseout(function(){
    clearTimeout(currTip);
    $('.buttonTip').fadeTo(400, 0, function(){$(this).remove();});});
  });
}

// ***********************************************************************************

function trackStickComment(Spike, Spoke, i)
{
  var comment = Alias[3];
  var dur = Math.abs(Spike.diff(Spoke));
  if (dur < (durTime/5)) {comment = Alias[4]; return comment};
  var minDur = durTime*3 + (2 - i)*(2 - i)*(2 - i)*durTime*50;
  if (dur < minDur) {comment = Alias[5]; return comment;};
  if (Spike.isBefore(Spoke)) {comment = Alias[6]} else
   {if (Spike.isAfter(Spoke)) {comment = Alias[7]}};
  return comment;
}

// ***********************************************************************************

function trackStickTip(Stick)
{
  var type = Astros[Stick.astro].type;
  Stick.lairs.forEach(function(lair, i)
  {
    var currTip;
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
     $("." + Cycles[i] + "Box").append($stickTip);
     $('.wheelTip').fadeTo(700, 1);}, 600);
    })
    .mouseout(function()
    { clearTimeout(currTip);
      $('.wheelTip').fadeTo(500, 0, function(){$(this).remove();});});
  });
}

// ***********************************************************************************
var Cycles     = ["Sun", "Moon", "Earth"];
var Colors     = ["Red", "White", "Blue", "Yellow", "Green"];
var scopeDur   = ['days', 'hours', 'minutes', 'seconds'];
var Spokes     =
                 [
{"name" : "Dragon",     "color" : "Red",    "angle" :     0, "link" : "images/mask/01Dragon.png"  },
{"name" : "Stalker",    "color" : "Red",    "angle" :  22.5, "link" : "images/mask/13Stalker.png" },
{"name" : "Serpent",    "color" : "Red",    "angle" :    45, "link" : "images/mask/05Serpent.png" },
{"name" : "Shanti",     "color" : "White",  "angle" :  67.5, "link" : "images/mask/10Shanti.png"  },
{"name" : "Wind",       "color" : "White",  "angle" :    90, "link" : "images/mask/02Wind.png"    },
{"name" : "Jaguar",     "color" : "White",  "angle" : 112.5, "link" : "images/mask/14Jaguar.png"  },
{"name" : "Kali",       "color" : "White",  "angle" :   135, "link" : "images/mask/06Kali.png"    },
{"name" : "Lila",       "color" : "Blue",   "angle" : 157.5, "link" : "images/mask/11Lila.png"    },
{"name" : "Maya",       "color" : "Blue",   "angle" :   180, "link" : "images/mask/03Maya.png"    },
{"name" : "Eagle",      "color" : "Blue",   "angle" : 202.5, "link" : "images/mask/15Eagle.png"   },
{"name" : "Hand",       "color" : "Blue",   "angle" :   225, "link" : "images/mask/07Hand.png"    },
{"name" : "Shaman",     "color" : "Yellow", "angle" : 247.5, "link" : "images/mask/12Shaman.png"  },
{"name" : "Seed",       "color" : "Yellow", "angle" :   270, "link" : "images/mask/04Seed.png"    },
{"name" : "Hero",       "color" : "Yellow", "angle" : 292.5, "link" : "images/mask/16Hero.png"    },
{"name" : "Star",       "color" : "Yellow", "angle" :   315, "link" : "images/mask/08Star.png"    },
{"name" : "Helix",      "color" : "Red",    "angle" : 337.5, "link" : "images/mask/09Moon.png"    },
{"name" : "Dragon New", "color" : "Red",    "angle" :   360, "link" : "images/mask/01Dragon.png"  }
                ];

var Astros = [
              {"type" : "Green",  "link" : "images/star/starGreen.png"  }, // 0 - for Staff
              {"type" : "Red",    "link" : "images/star/starRed.png"    }, // 1
              {"type" : "White",  "link" : "images/star/starWhite.png"  }, // 2   (0-3)
              {"type" : "Blue",   "link" : "images/star/starBlue.png"   }, // 3 for Users
              {"type" : "Yellow", "link" : "images/star/starYellow.png" }, // 4
              {"type" : "Green",  "link" : "images/star/starGreen.png"  }, // 5 - for Staff
              {"type" : "Right",  "link" : "images/moon/moonRight.png"  }, 
              {"type" : "Full",   "link" : "images/moon/moonFull.png"   },
              {"type" : "Left",   "link" : "images/moon/moonLeft.png"   },
              {"type" : "New",    "link" : "images/moon/moonNew.png"    }
             ];

var wheelCenter = {"X" : 167, "Y" : 165};
var GPS = [
            {'name' : 'New York',  'lat' :  40.7142700, 'lng' : -74.0059700},
            {'name' : 'Minsk',     'lat' :  53.9000000, 'lng' :  27.5666700},
            {'name' : 'Moskow',    'lat' :  55.7522200, 'lng' :  37.6155600},
            {'name' : 'Kiev',      'lat' :  50.4546600, 'lng' :  30.5238000},
            {'name' : 'Volgograd', 'lat' :  48.7193900, 'lng' :  44.5018400},
            {'name' : 'Habarovsk', 'lat' :  48.4827200, 'lng' : 135.0837900}
          ];                      

var Staff = {};  // Stick - any saved staffs
             // {    global staff - green star:
             //  pike:  moment(),
             //  ground: {name: String, lat: float, lng: float},
             //  lairs: [], angles: []}],
             //  alias: String
             //  astro: Int - number of Astros
             //  Id:  String - for $selection
             // }
// var Spike = moment();

//***********************************************************************************
//***********************************************************************************

var Creator = function (appDesign) // create all aplication in chosen design
{
  console.log('CREATOR: ~Creator~ is run!');
  createShell(appDesign);
  createBoard(appDesign);
  createHomeController(appDesign);
};

// ***********************************************************************************

var createShell = function(shellDesign) // create shell in chosen design
{
  $("h1").text(shellDesign.Top);
  $("h1").mouseover(function(eventObject){
       $tip = $('<div class = tip>').hide(); $('header').append($tip);
       $('.tip').text('this is title')
       .css({'position': 'absolute', 'top':  eventObject.pageY + 5, 'left': eventObject.pageX + 5})
       .delay(800).fadeIn();
  }).mouseout(function(){
    $('.tip').delay(800).fadeOut();
    $('.tip').remove();
    // .text('').css({'top': 0, 'left': 0});
  });
  $("h3").text(shellDesign.Down);
};

// ***********************************************************************************

var createBoard = function(boardDesign) // create main board in chosen design
{ 
  for (var Id = 0; Id < Cycles.length; Id++)
    {createWheel(Id, boardDesign.wheel[Id]);};
  // createButtons();
  createNowButton();
};

//***********************************************************************************

function createNowButton()
{
  var point = PointPX(0, 0);
      point.X = point.X - 4;
      point.Y = point.Y - 3;
  var pxstyle = "position: absolute; left: " + point.X + "px; top: " + point.Y + "px;"
  var $button = ("<img style='" + pxstyle + 
             "' class='Button " + Buttons[0].name + "' src='" + Buttons[0].link + "'>");
  $("." + Buttons[0].box).append($button);
  $(".Button.Green").addClass("focus");
}

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
  var $wheelBox = $("<div class = 'wheelBox " + Cycles[Id] + "Box'>");
  $wheelBox.append($("<img src='" + imgLink + "'>"));
  $(".Board").append($wheelBox);
  createMasks(Id);
};

// ***********************************************************************************

var createMasks = function(Id)
{
   var radius = wheelArea[0].radius;
   for (var i = 0; i < (Spokes.length - 1); i++)
     {
       var angle = Spokes[i].angle;
       var point = PointPX(angle, radius);
           point.X = point.X - 4;
           point.Y = point.Y - 2;
       var name = Spokes[i].name;
       var link = Spokes[i].link;
       var pxstyle = "position: absolute; left: " + point.X + "px; top: " + point.Y + "px;"
       var $Mask = 
       $("<img style='" + pxstyle + "' class='" + name + "' src='" + link + "'>");
       $("." + Cycles[Id] + "Box").append($Mask);
       $("." + name).addClass("Mask");
       $("." + name).addClass(Spokes[i].color);
     };
  $(".Mask").addClass("sleep");
};

// ***********************************************************************************

var createHomeController = function(controlDesign) //
{
  for (var Id = 0; Id < Cycles.length; Id++)
   {createPanel(Id, "White", Cycles[Id] + " Home")};
};

// ***********************************************************************************

var createPanel = function(Id, color, text)
{
  var $homePanel = $("<div class = 'homePanel " + Cycles[Id] + "Panel'>");
  $(".homeController").append($homePanel);
  var $prevHome = $("<div class = 'prevHome " + color + "'>prev</div>");
  $homePanel.append($prevHome);
  var $Home = $("<div class = 'Home " + color + "'>" + text + "</div>");
  $homePanel.append($Home);
  var $nextHome = $("<div class = 'nextHome " + color + "'>next</div>");
  $homePanel.append($nextHome);
}

// ***********************************************************************************
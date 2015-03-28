var Cycles     = ["Sun", "Moon", "Earth"];
var Colors     = ["Red", "White", "Blue", "Yellow", "Green"];
var scopeDur   = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
var Spokes     =
                 [
{"name" : "Dragon",     "color" : "Red",    "angle" :     0, "link" : "img/mask/01Dragon.png"  },
{"name" : "Stalker",    "color" : "Red",    "angle" :  22.5, "link" : "img/mask/13Stalker.png" },
{"name" : "Serpent",    "color" : "Red",    "angle" :    45, "link" : "img/mask/05Serpent.png" },
{"name" : "Shanti",     "color" : "White",  "angle" :  67.5, "link" : "img/mask/10Shanti.png"  },
{"name" : "Wind",       "color" : "White",  "angle" :    90, "link" : "img/mask/02Wind.png"    },
{"name" : "Jaguar",     "color" : "White",  "angle" : 112.5, "link" : "img/mask/14Jaguar.png"  },
{"name" : "Kali",       "color" : "White",  "angle" :   135, "link" : "img/mask/06Kali.png"    },
{"name" : "Lila",       "color" : "Blue",   "angle" : 157.5, "link" : "img/mask/11Lila.png"    },
{"name" : "Maya",       "color" : "Blue",   "angle" :   180, "link" : "img/mask/03Maya.png"    },
{"name" : "Eagle",      "color" : "Blue",   "angle" : 202.5, "link" : "img/mask/15Eagle.png"   },
{"name" : "Hand",       "color" : "Blue",   "angle" :   225, "link" : "img/mask/07Hand.png"    },
{"name" : "Shaman",     "color" : "Yellow", "angle" : 247.5, "link" : "img/mask/12Shaman.png"  },
{"name" : "Seed",       "color" : "Yellow", "angle" :   270, "link" : "img/mask/04Seed.png"    },
{"name" : "Hero",       "color" : "Yellow", "angle" : 292.5, "link" : "img/mask/16Hero.png"    },
{"name" : "Star",       "color" : "Yellow", "angle" :   315, "link" : "img/mask/08Star.png"    },
{"name" : "Helix",      "color" : "Red",    "angle" : 337.5, "link" : "img/mask/09Moon.png"    },
{"name" : "Dragon-New", "color" : "Red",    "angle" :   360, "link" : "img/mask/01Dragon.png"  }
                ];

var Times   = [ ['Vernal Equinox',   'late spring',  'Beltane',  'early summer',
                  'Summer Solstice',  'late summer',  'lammas',   'early autumn',
                  'Autumnal Equinox', 'late autumn',  'Samhain',  'early winter',
                  'Winter Solstice',  'late winter',  'Imbolc',   'early spring', 'Vernal Equinox'
                 ],

                [ 'Right Moon',   'Young Moon', 'Waxing Moon',  'Bright Moon',
                   'Full Moon',   'Pure Moon',  'Wanning Moon', 'Witch Moon',
                   'Left Moon',   'Misty Moon', 'Old Moon',     'Ripe Moon',
                   'New Moon',    'Sacral Moon', 'Early Moon',   'Sweet Moon', 'Right Moon'
                 ],
 
                 [ 'Sunrise',   'tracking day',    'activity',  'service',
                   'Midday',    'afternoon',     'early evening', 'evening',
                   'Sunset',    'twilight',       'dive',          'repose',
                   'Midnight',  'deep night',    'morning star',   'waking'
                 ]];

var Astros = [
              {"type" : "Green",  "link" : "img/star/starGreen.png"  }, // 0 - for Staff
              {"type" : "Red",    "link" : "img/star/starRed.png"    }, // 1
              {"type" : "White",  "link" : "img/star/starWhite.png"  }, // 2   (0-3)
              {"type" : "Blue",   "link" : "img/star/starBlue.png"   }, // 3 for Users
              {"type" : "Yellow", "link" : "img/star/starYellow.png" }, // 4
              {"type" : "Green",  "link" : "img/star/starGreen.png"  }, // 5 - for Staff
              {"type" : "Right",  "link" : "img/moon/moonRight.png"  }, 
              {"type" : "Full",   "link" : "img/moon/moonFull.png"   },
              {"type" : "Left",   "link" : "img/moon/moonLeft.png"   },
              {"type" : "New",    "link" : "img/moon/moonNew.png"    }
             ];

var wheelCenter = {"X" : 167, "Y" : 165};
var durTime = 300000;

var GPS = [
            {'name' : 'Greenwich Time',         'lat' :  51.4772220, 'lng' :         0.0},
            {'name' : 'Amsterdam, Netherlands', 'lat' :  52.3740300, 'lng' :   4.8896900},
            {'name' : 'Florida, USA',           'lat' :  41.3317600, 'lng' : -74.3568200},
            {'name' : 'Gomel, Belarus',         'lat' :  52.4345000, 'lng' :  30.9754000},
            {'name' : 'Habarovsk, Russia',      'lat' :  48.4827200, 'lng' : 135.0837900},
            {'name' : 'Kiev, Ukraina',          'lat' :  50.4546600, 'lng' :  30.5238000},
            {'name' : 'Minsk, Belarus',         'lat' :  53.9000000, 'lng' :  27.5666700},
            {'name' : 'Moskow, Russia',         'lat' :  55.7522200, 'lng' :  37.6155600},
            {'name' : 'New York, USA',          'lat' :  40.7142700, 'lng' : -74.0059700},
            {'name' : 'Sydney, Australia',      'lat' : -33.8678500, 'lng' : 151.2073200},
            {'name' : 'St. Petersburg, Russia', 'lat' :  59.9386300, 'lng' :  30.3141300},
            {'name' : 'Tchaikovsky, Russia',    'lat' :  56.7686400, 'lng' :  54.1148400},
            {'name' : 'Ufa, Russia',            'lat' :  54.7430600, 'lng' :  55.9677900},
            {'name' : 'Volgograd, Russia',      'lat' :  48.7193900, 'lng' :  44.5018400}
          ];

var currGPS = {};
var nowButtonOn = true;
var saveNow = true;
var Sticks = [];

var Staff = { pike: moment(), 
              alias: '', 
              Id: 'Staff', 
              astro: 0,
              ground: {name: '', lat: 0, lng: 0}, 
              lairs: [], 
              angles: []
             };  
             // Stick - any saved staffs
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
  createShell(appDesign);
  createBoard(appDesign);
  createHomeController(appDesign);
  createGPSform();
};

// ***********************************************************************************

var createShell = function(shellDesign) // create shell in chosen design
{
  $("h1").text(shellDesign.Top);
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

function createGPSform()
{
  GPS.forEach(function(gps)
  {userList('gps', gps.name);});
  gpsCount = loadData('gpsCount');
  if ((gpsCount === null)||(gpsCount === 0)) return;
  for (var i = 0; i < gpsCount; i++)
  { 
    key = 'gps' + i;
    userGPS = loadData(key);
    userList('gps', userGPS.name);
  };
}

//***********************************************************************************

function userList(Id, text)
{
  if ((text !== null) && (Id !== null))
    $('.' + Id + 'List').append("<option>" + text + "</option>");
}

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
  $(".Button.Green").addClass('sleep');
  $(".Button.Green").addClass('sleep');
}

//***********************************************************************************

// var createButtons = function()
//    {
//      Buttons.forEach(function(button)
//      {
//        var $button = ("<img style='" + PXstyle(button) + 
//                      "' class='Button " + button.name + "' src='" + button.link + "'>");
//        $("." + button.box).append($button);
//      });
//      $(".Button").addClass("sleep");
//    };

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
   for (var i = 0; i < (Spokes.length); i++)
     {
       var angle = Spokes[i].angle;
       if (i === 0)  {angle = angle + 4};
       if (i === 16) {angle = angle - 4};
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

var createHomeController = function(controlDesign)
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
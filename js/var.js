var Design =
      {
         "EN" : {
                  "Top"        : "SHAMANIC TIME",
                  "Down"       : "(EN Design, 2015)",
                  "wheel"   : [
                                "img/wheel/wheelSunEN.png",
                                "img/wheel/wheelClean.png",
                                "img/wheel/wheelEarthEN.png"
                              ]
                },
         "RU" : {
                  "Top"        : "ØÀÌÀÍÑÊÈÉ ÊÀËÅÍÄÀÐÜ",
                  "Down"       : "(RU Design, 2015)",
                  "wheel"   : [
                                "img/wheel/wheelSunRU.png",
                                "img/wheel/wheelClean.png",
                                "img/wheel/wheelEarthRU.png"
                              ]
                }
      };

var Buttons =  [ 
                  { "name" : "Green",   "box"  : "EarthBox",
                    "X"    : "164",         "Y"    : "162",
                    "link" : "img/star/starGreen.png"         },

                  { "name" : "Right", "box"  : "MoonBox",
                    "X"    : "188",         "Y"    : "164",
                    "link" : "img/moon/buttonRight.png"       },

                  { "name" : "Full",  "box"  : "MoonBox",
                    "X"    : "163",         "Y"    : "139",
                    "link" : "img/moon/buttonFull.png"        },

                  { "name" : "Left",  "box"  : "MoonBox",
                    "X"    : "138",         "Y"    : "164",
                    "link" : "img/moon/buttonLeft.png"         },

                  { "name" : "New",   "box"  : "MoonBox",
                    "X"    : "163",         "Y"    : "188",
                    "link" : "img/moon/buttonNew.png"          },

                  { "name" : "Red",    "box"  : "SunBox",
                    "X"    : "188",          "Y"    : "164",
                    "link" : "img/star/starRed.png"            },

                  { "name" : "White",  "box"  : "SunBox",
                    "X"    : "165",          "Y"    : "141",
                    "link" : "img/star/starWhite.png"          },

                  { "name" : "Blue",   "box"  : "SunBox",
                    "X"    : "142",          "Y"    : "164",
                    "link" : "img/star/starBlue.png"           },
 
                  { "name" : "Yellow", "box"  : "SunBox",
                    "X"    : "165",          "Y"    : "187",
                    "link" : "img/star/starYellow.png"         }
                  ];

var wheelArea = [
                  {"radius" : 159, "step" : 22.5 },
                  {"radius" : 127, "step" : 22.5 },
                  {"radius" : 112, "step" : 5.625},
                  {"radius" :  97, "step" : 11.25},
                  {"radius" :  82, "step" : 11.25},
                  {"radius" :  67, "step" : 11.25}
                ];

var astroNumber = 0;

var Atlas  =     [
                   { "type"  : 0,
                     "name"  : "Altair",
                     "about" :  "some text about this intresting star",
                     "angle"  : [37, 280, 12]},
                   { "type"  : 1,
                     "name"  : "Proxeya",
                     "about" :  "some text about this intresting star",
                     "angle"  : [148, 218, 87]},
                   { "type"  : 2,
                     "name"  : "Sirius",
                     "about" :  "some text about this intresting star",
                     "angle"  : [303, 225, 52]},
                   { "type"  : 3,
                     "name"  : "Polar Star",
                     "about" :  "some text about this intresting star",
                     "angle"  : [78, 36, 44]},
                   { "type"  : 4,
                     "name"  : "Omega",
                     "about" :  "some text about this intresting star",
                     "angle"  : [185, 62, 321]}
                 ];


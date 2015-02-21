var Design =
      {
         "EN" : {
                  "Top"        : "SHAMANIC TIME",
                  "Down"       : "(EN Design, 2015)",
                  "wheel"   : [
                                "images/wheel/wheelSunEN.png",
                                "images/wheel/wheelClean.png",
                                "images/wheel/wheelEarthEN.png"
                              ]
                },
         "RU" : {
                  "Top"        : "ØÀÌÀÍÑÊÈÉ ÊÀËÅÍÄÀÐÜ",
                  "Down"       : "(RU Design, 2015)",
                  "wheel"   : [
                                "images/wheel/wheelSunRU.png",
                                "images/wheel/wheelClean.png",
                                "images/wheel/wheelEarthRU.png"
                              ]
                }
      };

var Buttons =  [ 
                  { "name" : "Green",   "box"  : "EarthBox",
                    "X"    : "164",         "Y"    : "162",
                    "link" : "images/star/starGreen.png"         },

                  { "name" : "Right", "box"  : "MoonBox",
                    "X"    : "188",         "Y"    : "164",
                    "link" : "images/moon/buttonRight.png"       },

                  { "name" : "Full",  "box"  : "MoonBox",
                    "X"    : "163",         "Y"    : "139",
                    "link" : "images/moon/buttonFull.png"        },

                  { "name" : "Left",  "box"  : "MoonBox",
                    "X"    : "138",         "Y"    : "164",
                    "link" : "images/moon/buttonLeft.png"         },

                  { "name" : "New",   "box"  : "MoonBox",
                    "X"    : "163",         "Y"    : "188",
                    "link" : "images/moon/buttonNew.png"          },

                  { "name" : "Red",    "box"  : "SunBox",
                    "X"    : "188",          "Y"    : "164",
                    "link" : "images/star/starRed.png"            },

                  { "name" : "White",  "box"  : "SunBox",
                    "X"    : "165",          "Y"    : "141",
                    "link" : "images/star/starWhite.png"          },

                  { "name" : "Blue",   "box"  : "SunBox",
                    "X"    : "142",          "Y"    : "164",
                    "link" : "images/star/starBlue.png"           },
 
                  { "name" : "Yellow", "box"  : "SunBox",
                    "X"    : "165",          "Y"    : "187",
                    "link" : "images/star/starYellow.png"         }
                  ];

var wheelArea = [
                  {"radius" : 159, "step" : 22.5 },
                  {"radius" : 127, "step" : 22.5 },
                  {"radius" : 110, "step" : 5.625},
                  {"radius" :  95, "step" : 11.25},
                  {"radius" :  79, "step" : 11.25},
                  {"radius" :  63, "step" : 11.25}
                ];
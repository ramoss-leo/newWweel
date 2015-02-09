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

var Astro =  [
               {"type" : "Red",    "link" : "images/star/starRed.png"    },
               {"type" : "White",  "link" : "images/star/starWhite.png"  },
               {"type" : "Blue",   "link" : "images/star/starBlue.png"   },
               {"type" : "Yellow", "link" : "images/star/starYellow.png" },
               {"type" : "Green",  "link" : "images/star/starGreen.png"  },
               {"type" : "Right",  "link" : "images/moon/moonRight.png"  },
               {"type" : "Full",   "link" : "images/moon/moonFull.png"   },
               {"type" : "Left",   "link" : "images/moon/moonLeft.png"   },
               {"type" : "New",    "link" : "images/moon/moonNew.png"    },
             ];

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
var Masks = 
 [
{"name" : "Dragon",  "color" : "Red",    "alfa" :     0,  "link" : "images/mask/01Dragon.png"  },
{"name" : "Wind",    "color" : "White",  "alfa" :    90,  "link" : "images/mask/02Wind.png"    },
{"name" : "Maya",    "color" : "Blue",   "alfa" :   180,  "link" : "images/mask/03Maya.png"    },
{"name" : "Seed",    "color" : "Yellow", "alfa" :   270,  "link" : "images/mask/04Seed.png"    },
{"name" : "Serpent", "color" : "Red",    "alfa" :    45,  "link" : "images/mask/05Serpent.png" },
{"name" : "Kali",    "color" : "White",  "alfa" :   135,  "link" : "images/mask/06Kali.png"    },
{"name" : "Hand",    "color" : "Blue",   "alfa" :   225,  "link" : "images/mask/07Hand.png"    },
{"name" : "Star",    "color" : "Yellow", "alfa" :   315,  "link" : "images/mask/08Star.png"    },
{"name" : "Helix",   "color" : "Yellow", "alfa" : 337.5,  "link" : "images/mask/09Moon.png"    },
{"name" : "Shanti",  "color" : "White",  "alfa" :  67.5,  "link" : "images/mask/10Shanti.png"  },
{"name" : "Lila",    "color" : "Blue",   "alfa" : 157.5,  "link" : "images/mask/11Lila.png"    },
{"name" : "Shaman",  "color" : "Yellow", "alfa" : 247.5,  "link" : "images/mask/12Shaman.png"  },
{"name" : "Stalker", "color" : "Red",    "alfa" :  22.5,  "link" : "images/mask/13Stalker.png" },
{"name" : "Jaguar",  "color" : "White",  "alfa" : 112.5,  "link" : "images/mask/14Jaguar.png"  },
{"name" : "Eagle",   "color" : "Blue",   "alfa" : 202.5,  "link" : "images/mask/15Eagle.png"   },
{"name" : "Hero",    "color" : "Yellow", "alfa" : 292.5,  "link" : "images/mask/16Hero.png"    }
 ];
var Spokes =
 [
{"name" : "Dragon",     "color" : "Red",    "alfa" :     0,  "link" : "images/mask/01Dragon.png"  },
{"name" : "Stalker",    "color" : "Red",    "alfa" :  22.5,  "link" : "images/mask/13Stalker.png" },
{"name" : "Serpent",    "color" : "Red",    "alfa" :    45,  "link" : "images/mask/05Serpent.png" },
{"name" : "Shanti",     "color" : "White",  "alfa" :  67.5,  "link" : "images/mask/10Shanti.png"  },
{"name" : "Wind",       "color" : "White",  "alfa" :    90,  "link" : "images/mask/02Wind.png"    },
{"name" : "Jaguar",     "color" : "White",  "alfa" : 112.5,  "link" : "images/mask/14Jaguar.png"  },
{"name" : "Kali",       "color" : "White",  "alfa" :   135,  "link" : "images/mask/06Kali.png"    },
{"name" : "Lila",       "color" : "Blue",   "alfa" : 157.5,  "link" : "images/mask/11Lila.png"    },
{"name" : "Maya",       "color" : "Blue",   "alfa" :   180,  "link" : "images/mask/03Maya.png"    },
{"name" : "Eagle",      "color" : "Blue",   "alfa" : 202.5,  "link" : "images/mask/15Eagle.png"   },
{"name" : "Hand",       "color" : "Blue",   "alfa" :   225,  "link" : "images/mask/07Hand.png"    },
{"name" : "Shaman",     "color" : "Yellow", "alfa" : 247.5,  "link" : "images/mask/12Shaman.png"  },
{"name" : "Seed",       "color" : "Yellow", "alfa" :   270,  "link" : "images/mask/04Seed.png"    },
{"name" : "Hero",       "color" : "Yellow", "alfa" : 292.5,  "link" : "images/mask/16Hero.png"    },
{"name" : "Star",       "color" : "Yellow", "alfa" :   315,  "link" : "images/mask/08Star.png"    },
{"name" : "Helix",      "color" : "Yellow", "alfa" : 337.5,  "link" : "images/mask/09Moon.png"    },
{"name" : "Dragon New", "color" : "Red",    "alfa" :   360,  "link" : "images/mask/01Dragon.png"  },
 ];

var wheelArea = [
                  {"radius" : 159, "step" : 22.5 },
                  {"radius" : 127, "step" : 22.5 },
                  {"radius" : 112, "step" : 5.625},
                  {"radius" :  97, "step" : 11.25},
                  {"radius" :  82, "step" : 11.25},
                  {"radius" :  67, "step" : 11.25}
                ];

var wheelCenter = {"X" : 167, "Y" : 165};

var Cycle      = ["Sun", "Moon", "Earth"];

var Color      = ["Red", "White", "Blue", "Yellow", "Green"];

var astroNumber = 0;

var Atlas  =     [
                   { "type"  : 0,
                     "name"  : "Altair",
                     "about" :  "some text about this intresting star",
                     "alfa"  : [37, 280, 12]},
                   { "type"  : 1,
                     "name"  : "Proxeya",
                     "about" :  "some text about this intresting star",
                     "alfa"  : [148, 218, 87]},
                   { "type"  : 2,
                     "name"  : "Sirius",
                     "about" :  "some text about this intresting star",
                     "alfa"  : [303, 225, 52]},
                   { "type"  : 3,
                     "name"  : "Polar Star",
                     "about" :  "some text about this intresting star",
                     "alfa"  : [78, 36, 44]},
                   { "type"  : 4,
                     "name"  : "Omega",
                     "about" :  "some text about this intresting star",
                     "alfa"  : [185, 62, 321]}
                 ];

var Moments = [];
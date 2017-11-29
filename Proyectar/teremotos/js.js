var terremotos = [
 {
   "FIELD1": 0,
   "FLAG_TSUNAMI": "No",
   "DATE": "22/5/1960",
   "FOCAL_DEPTH": 33,
   "MAGNITUDE": 9.5,
   "COUNTRY": "CHILE",
   "LOCATION_NAME": "Chile, Valdivia, 1960",
   "LATITUDE": -38.143,
   "LONGITUDE": -73.407,
   "DEATHS": 2226.0,
   "DAMAGE": "1000.0",
   "HOUSES_DESTROYED": "58622.0",
   "POPULATION": 7716625,
   "PIB": 532.616266826495
 },
 {
   "FIELD1": 1,
   "FLAG_TSUNAMI": "No",
   "DATE": "31/5/1970",
   "FOCAL_DEPTH": 43,
   "MAGNITUDE": 7.9,
   "COUNTRY": "PERU",
   "LOCATION_NAME": "Peru, Pisco-Chiclayo, 1970",
   "LATITUDE": -9.2,
   "LONGITUDE": -78.8,
   "DEATHS": 66794.0,
   "DAMAGE": "530.0",
   "HOUSES_DESTROYED": "sin dato",
   "POPULATION": 13341069,
   "PIB": 557.0935265211959
 },
 {
   "FIELD1": 2,
   "FLAG_TSUNAMI": "No",
   "DATE": "28/7/1976",
   "FOCAL_DEPTH": 26,
   "MAGNITUDE": 7.4,
   "COUNTRY": "CHINA",
   "LOCATION_NAME": "China, Tangshan, 1976",
   "LATITUDE": 39.664,
   "LONGITUDE": 118.401,
   "DEATHS": 242419,
   "DAMAGE": "sin dato",
   "HOUSES_DESTROYED": "sin dato",
   "POPULATION": 930685000,
   "PIB": 165.40554037241998
 },
 {
   "FIELD1": 3,
   "FLAG_TSUNAMI": "No",
   "DATE": "19/9/1985",
   "FOCAL_DEPTH": 28,
   "MAGNITUDE": 8.1,
   "COUNTRY": "MEXICO",
   "LOCATION_NAME": "Mexico, Michoacan, DF, 1985",
   "LATITUDE": 18.19,
   "LONGITUDE": -102.533,
   "DEATHS": 9500.0,
   "DAMAGE": "4000.0",
   "HOUSES_DESTROYED": "sin dato",
   "POPULATION": 77360707,
   "PIB": 2384.58402748349
 },
 {
   "FIELD1": 4,
   "FLAG_TSUNAMI": "No",
   "DATE": "26/12/2003",
   "FOCAL_DEPTH": 10,
   "MAGNITUDE": 6.6,
   "COUNTRY": "IRAN, ISLAMIC REP.",
   "LOCATION_NAME": "Iran, Baravat, 2003",
   "LATITUDE": 28.995,
   "LONGITUDE": 58.311,
   "DEATHS": 31000,
   "DAMAGE": "32.7",
   "HOUSES_DESTROYED": "sin dato",
   "POPULATION": 68812713,
   "PIB": 2231.34279555916
 },
 {
   "FIELD1": 5,
   "FLAG_TSUNAMI": "Tsu",
   "DATE": "26/12/2004",
   "FOCAL_DEPTH": 30,
   "MAGNITUDE": 9.1,
   "COUNTRY": "INDONESIA",
   "LOCATION_NAME": "Indonesia, Sumatra, west coast, 2004",
   "LATITUDE": 3.316,
   "LONGITUDE": 95.854,
   "DEATHS": 227899,
   "DAMAGE": "10000.0",
   "HOUSES_DESTROYED": "",
   "POPULATION": 223614649,
   "PIB": 1148.5690961840899
 },
 {
   "FIELD1": 6,
   "FLAG_TSUNAMI": "No",
   "DATE": "8/10/2005",
   "FOCAL_DEPTH": 26,
   "MAGNITUDE": 7.6,
   "COUNTRY": "PAKISTAN",
   "LOCATION_NAME": "Pakistan, Barambula, 2005",
   "LATITUDE": 34.539,
   "LONGITUDE": 73.588,
   "DEATHS": 76213.,
   "DAMAGE": "6680.0",
   "HOUSES_DESTROYED": "sin dato",
   "POPULATION": 153909667,
   "PIB": 711.469946269738
 },
 {
   "FIELD1": 7,
   "FLAG_TSUNAMI": "No",
   "DATE": "12/5/2008",
   "FOCAL_DEPTH": 19,
   "MAGNITUDE": 7.9,
   "COUNTRY": "CHINA",
   "LOCATION_NAME": "China, Sichuan Province, 2008",
   "LATITUDE": 31.002,
   "LONGITUDE": 103.322,
   "DEATHS": 87652.0,
   "DAMAGE": "86000.0",
   "HOUSES_DESTROYED": "5360000.0",
   "POPULATION": 1324655000,
   "PIB": 3471.24754726234
 },
 {
   "FIELD1": 8,
   "FLAG_TSUNAMI": "No",
   "DATE": "12/1/2010",
   "FOCAL_DEPTH": 13,
   "MAGNITUDE": 7,
   "COUNTRY": "HAITI",
   "LOCATION_NAME": "Haiti, Puerto Principe, 2010",
   "LATITUDE": 18.457,
   "LONGITUDE": -72.533,
   "DEATHS": 316000,
   "DAMAGE": "8000.0",
   "HOUSES_DESTROYED": "97294.0",
   "POPULATION": 9999617,
   "PIB": 662.279518162433
 },
 {
   "FIELD1": 9,
   "FLAG_TSUNAMI": "No",
   "DATE": "27/2/2010",
   "FOCAL_DEPTH": 23,
   "MAGNITUDE": 8.8,
   "COUNTRY": "CHILE",
   "LOCATION_NAME": "Chile, Concepcion, 2010",
   "LATITUDE": -36.122,
   "LONGITUDE": -72.898,
   "DEATHS": "558.0",
   "DAMAGE": 30000,
   "HOUSES_DESTROYED": "sin dato",
   "POPULATION": 16993354,
   "PIB": 12860.1776447469
 }
];
function* gen() {
  var i = 1;
  while (true) {
    if (i >= 10) {
      yield 10
    }
    else {
      yield i++;
    }

  }


}
var g1 = gen();
var g2 = gen();
var g3 = gen();
var g4 = gen();
var g5 = gen();
var g6 = gen();
var g7 = gen();
var g8 = gen();
var g9 = gen();
var g10 = gen();
var gcolor = gen();

function disminur(ob,gen){

    var delta = gen.next().value*(ob.DEATHS/10)
      return delta

}

var color = d3.scaleLinear().domain([2226,242419])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#fffda8"), d3.rgb('#FF2700')]);

$(document).ready(function() {
gcolor.next().value;
  $(".terremoto1").text(terremotos[0].LOCATION_NAME +": 0");
    $(".terremoto1").addClass("text");
    $(".terremoto1").fadeIn(1500);

    var i = setInterval(function(){
      $(".terremoto1").text(terremotos[0].LOCATION_NAME +": "
      +String(disminur(terremotos[0], g1)));
    }, 1000)

    $("#left").css("background", color(terremotos[0].DEATHS));
    $("#right").css("background", color(terremotos[0].DEATHS));



});


$(document).ready(function() {

  $(".terremoto2").text(terremotos[1].LOCATION_NAME +": 0");
    $(".terremoto2").addClass("text");
    setTimeout(function() {
        $(".terremoto2").fadeIn(1500);
        if (gcolor.next().value == 2) {
          console.log("2");
          $("#left").css("background", color(terremotos[1].DEATHS));
          $("#right").css("background", color(terremotos[1].DEATHS));
        }

        var i = setInterval(function(){
          $(".terremoto2").text(terremotos[1].LOCATION_NAME +": "
          +String(disminur(terremotos[1], g2)));

        }, 1000);

    },10000);


});


$(document).ready(function() {

  $(".terremoto3").text(terremotos[2].LOCATION_NAME +": 0");
    $(".terremoto3").addClass("text");
  setTimeout(function() {
        $(".terremoto3").fadeIn(1500);
        if (gcolor.next().value == 3) {
          console.log("3");
          $("#left").css("background", color(terremotos[2].DEATHS));
          $("#right").css("background", color(terremotos[2].DEATHS));
        }
        var i = setInterval(function(){
          $(".terremoto3").text(terremotos[2].LOCATION_NAME +": "
          +String(disminur(terremotos[2], g3)));


        }, 1000);

    },20000);


});

$(document).ready(function() {
  $(".terremoto4").text(terremotos[3].LOCATION_NAME +": 0");
    $(".terremoto4").addClass("text");
    setTimeout(function() {
        $(".terremoto4").fadeIn(1500);
        if (gcolor.next().value == 4) {
          console.log("4");
          $("#left").css("background", color(terremotos[3].DEATHS));
          $("#right").css("background", color(terremotos[3].DEATHS));
        }
        var i = setInterval(function(){    
          $(".terremoto4").text(terremotos[3].LOCATION_NAME +": "
          +String(disminur(terremotos[3], g4)));

        }, 1000);
    },30000);

});


$(document).ready(function() {
  $(".terremoto5").text(terremotos[4].LOCATION_NAME +": 0");
    $(".terremoto5").addClass("text");
     setTimeout(function() {
        $(".terremoto5").fadeIn(1500);
        if (gcolor.next().value == 5) {
          console.log("5");
          $("#left").css("background", color(terremotos[4].DEATHS));
          $("#right").css("background", color(terremotos[4].DEATHS));
        }
        var i = setInterval(function(){
          $(".terremoto5").text(terremotos[4].LOCATION_NAME +": 0"
          +String(disminur(terremotos[4], g5)));
          ;
        }, 1000);
    },40000);

});


$(document).ready(function() {
  $(".terremoto6").text(terremotos[5].LOCATION_NAME +": 0");
    $(".terremoto6").addClass("text");
    setTimeout(function() {
        $(".terremoto6").fadeIn(1500);
        if (gcolor.next().value == 6) {
          console.log("3");
          $("#left").css("background", color(terremotos[5].DEATHS));
          $("#right").css("background", color(terremotos[5].DEATHS));
        }
        setInterval(function(){
          $(".terremoto6").text(terremotos[5].LOCATION_NAME +": "
          +String(disminur(terremotos[5], g6)));

        }, 1000);
    },50000);
});

$(document).ready(function() {
  $(".terremoto7").text(terremotos[6].LOCATION_NAME + ": 0");
    $(".terremoto7").addClass("text");
    setTimeout(function() {
        $(".terremoto7").fadeIn(1500);
        if (gcolor.next().value == 7) {
          console.log("7");
          $("#left").css("background", color(terremotos[6].DEATHS));
          $("#right").css("background", color(terremotos[6].DEATHS));
        }
        var i = setInterval(function(){
          $(".terremoto7").text(terremotos[6].LOCATION_NAME +": "
          +String(disminur(terremotos[6], g7)));

        }, 1000);
    },60000);
});


$(document).ready(function() {
  $(".terremoto8").text(terremotos[7].LOCATION_NAME+": 0");
    $(".terremoto8").addClass("text");
    setTimeout(function() {
        $(".terremoto8").fadeIn(1500);
        if (gcolor.next().value == 8) {
          console.log("8");
          $("#left").css("background", color(terremotos[7].DEATHS));
          $("#right").css("background", color(terremotos[7].DEATHS));
        }
        setInterval(function(){
          $(".terremoto8").text(terremotos[7].LOCATION_NAME +": "
          +String(disminur(terremotos[7], g8)));
        }, 1000);
    },70000);
});


$(document).ready(function() {
  $(".terremoto9").text(terremotos[8].LOCATION_NAME +": 0");
    $(".terremoto9").addClass("text");
    setTimeout(function() {
      if (gcolor.next().value == 9) {
        console.log("9");
        $("#left").css("background", color(terremotos[8].DEATHS));
        $("#right").css("background", color(terremotos[8].DEATHS));
      }
        $(".terremoto9").fadeIn(1500);
        setInterval(function(){
          $(".terremoto9").text(terremotos[8].LOCATION_NAME +": "
          +String(disminur(terremotos[8], g9)));

        }, 1000);
    },80000);

});

$(document).ready(function() {
  $(".terremoto10").text(terremotos[9].LOCATION_NAME +": 0");
    $(".terremoto10").addClass("text");
    setTimeout(function() {
      if (gcolor.next().value == 10) {
        console.log("10");
        $("#left").css("background", color(terremotos[9].DEATHS));
        $("#right").css("background", color(terremotos[9].DEATHS));
      }
        $(".terremoto10").fadeIn(1500);
        setInterval(function(){
          $(".terremoto10").text(terremotos[9].LOCATION_NAME +": "
          +String(disminur(terremotos[9], g10)));

        }, 1000);
    },90000);

});

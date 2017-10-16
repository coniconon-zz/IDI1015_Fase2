var layers_array = [];
var countries = [];

var map = L.map('map').setView([-21.351441,-71.7764874], 5);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, &copy; <a href="http://carto.com/attributions">CARTO</a>'
    }).addTo(map);

var scale = d3.scaleLinear().domain([0, 316000]).range([10,20]);
var color = d3.scaleLinear().domain([4.9,9.5])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#fffc33"), d3.rgb('#FF2700')]);


display_by_year(1960);

function onEachFeature(feature, layer) {
  var content = "<p>DATE <br/>"
          + feature.properties.DATE +
          "<br/><br/>LOCATION<br/>" +
          feature.properties.LOCATION_NAME +
            "<br/><br/>MAGNITUDE<br/>" +
            feature.properties.MAGNITUDE +
            "<br/><br/>FOCAL DEPTH<br/>" +
            feature.properties.FOCAL_DEPTH +
            "<br/><br/>DEATHS<br/>" +
            feature.properties.DEATHS +
            "<br/><br/>DAMAGE<br/>" +
            feature.properties.DAMAGE +
  "</p>";
  layer.bindPopup(content);
}

function onClick(c){
  countries.push(this.feature.properties.COUNTRY)
  if (countries.length >=2) {
    display_pib_chart(countries[countries.length - 1],
      countries[countries.length - 2])
    display_pop_chart(countries[countries.length - 1],
      countries[countries.length - 2])
  };
  console.log(this.feature.properties);
}

function mouseOver(c){
  this.openPopup();
}

function display_by_year(year){
        var point =  L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
        if (feature.properties.YEAR == year){
          if (feature.properties.DEATHS != "sin dato")
          {
          return L.circleMarker(latlng, {radius:
            scale(feature.properties.DEATHS),
            stroke: false, fillColor: color(feature.properties.MAGNITUDE),
            fillOpacity: 0.8}).on('click', onClick).on("mouseover", mouseOver);
        }
        else {
          return L.circleMarker(latlng, {radius: 4, stroke: false,
            fillColor: color(feature.properties.MAGNITUDE), fillOpacity: 0.8})
            .on('click', onClick).on("mouseover", mouseOver);
        }};
     }, onEachFeature: onEachFeature
   }).addTo(map);


   layers_array.push(point);
   if (layers_array.length > 1){

     map.removeLayer(layers_array[layers_array.length - 2]);
   }
}

function update(val){
  document.getElementById("year-value").innerHTML = val;
  display_by_year(val);
}

// define a lookup for what text should be displayed for each value in your range
var rangeValues =
{
    "1960":   "1960",
    "1965":   "1965",
    "1970":   "1970",
    "1975":   "1975"
};


$(function(){
$('#rangeText').text(rangeValues[$('#slider').val()]);
$('#slider').on('input change', function () {
    $('#rangeText').text(rangeValues[$(this).val()]);
    });
});


function display_pib_chart(country1,country2){
  var myConfig = {
    "background-color":"#E1EAEC #ECF2F4",
    "graphset":[
        {
            "background-color":"#424242",
            "type":"pop-pyramid",
            "options":{
                "aspect":"area"
            },
            "title": {
              "text": "PIB per capita por anno"
            },
            "plot":{
                "stacked":true
            },
            "scale-x":{
                "item":{
                    "text-align":"middle"
                },
                "values":"1960:2016"
            },
            "scale-y":{
                "values":"40:102831.32148281099:100"
            },
            "series":[
                {
                    "data-side":1,
                    "text": country1,
                    "background-color":"#007DF0 #0055A4",
                    "line-color":"#0055a4",
                    "marker":{
                        "visible":false
                    },
                    "values": extraer_pib(country1)
                },
                {
                    "data-side":2,
                    "text": country2,
                    "background-color":"#94090D #D40D12",
                    "line-color":"#94090D",
                    "marker":{
                        "visible":false
                    },
                    "values":extraer_pib(country2)
                }
            ]
        }
    ]
};

zingchart.render({
  id : 'PIB_Chart',
  data : myConfig,
  height: "600px",
  width: "100%"
});
}

function display_pop_chart(country1,country2){
  var pop1 = extraer_poblacion(country1);
  var pop2 = extraer_poblacion(country2);
  var deaths1 = deaths_by_year(country1);
  var deaths2 = deaths_by_year(country2);
  var percent1 = [];
  var percent2 = [];
  for (var i in deaths1) {
      percent1.push((deaths1[i]/(pop1[i]*1000))*100)
      percent2.push((deaths2[i]/(pop2[i]*1000))*100)
  }
  console.log(percent1);
  console.log(percent2);
  var myConfig = {
 	"type" : "pop-pyramid",
 	"background-color" : "#424242",
 	"title" : {
 	  "text" : "Cantidad de muertos",
 	  "font-size" : "18px",
 	  "font-color" : "#DDD",
 	},
 	"subtitle" : {
 	  "text" : "Desde 1960-2016",
 	  "font-size" : "14px",
 	  "font-color" : "#999",
 	  "padding-top" : 0,
 	},
 	"tooltip" : {
 	  "visible" : false,
 	},
 	"legend" : {
 	  "item" : {
 	    "font-color" : "#FFF",
 	    "cursor": "pointer"
 	  },
 	  "background-color" : "#999 #777",
 	  "border-width" : "1px",
 	  "border-radius" : "3px",
 	  "border-color" : "#AAA",
 	  "offset-x" : 50,
 	  "offset-y" : 60,
 	  "align": "left",
 	  "z-index":9999
 	},
 	"scale-x" : {
 	  "values" : "1960:2016:1",
 	  "tick" : {
 	    "line-color" : "#CCC",
 	  },
 	  "minor-ticks" : 2,
 	  "minor-tick" : {
 	    "line-color" : "#999",
 	    "placement" : "outer",
 	  }
 	},
 	"scale-y" : {
 	  "values" : "0:20:0.00001",
 	  "guide" : {
 	    "line-color" : "#777",
 	  },
 	},
 	"crosshair-x" : {
 	  "line-width" : "1px",
 	  "line-color" : "#bdbdbd",
 	  "line-style": "dashed",
 	  "line-segment-size": 4,
 	  "line-gap-size":10,
 	  "shared" : true,
 	  "plot-label" : {
 	    "multiple" : true,
 	    "font-color":"#333",
 	    "text":"%t: %v%",
 	    "border-color" : "#666",
 	    "padding": 10,
 	    "font-size":14,
 	    "border-radius":5
 	  },
 	  "scaleLabel":{
 	    "background-color": "#EEE",
 	    "font-color" : "#333",
 	    "border-width" : "1px",
 	    "border-color" : "#000",
 	  },
 	},
 	"plot" : {
 	  "alpha-area" : 0.5,
 	  "line-width" : 1,
 	  "marker" : {
 	    "size" : 3,
 	    "border-color" : "#FFF",
 	    "border-width" : 1,
 	  },
 	  "hover-marker" : {
 	    "size" : 5,
 	  },
 	},
 	"series" : [
		{
			"data-side" : 1,
			"text" : country1,
		  "values" : percent1,
		  "background-color" : "#69f0ae",
		  "marker" : {
		    "background-color" : "#64ffda",
		    "border-color" : "#00bfa5",
		  },
		  "line-color" : "#00bfa5",
		},
		{
		  "data-side" : 2,
		  "text" : country2,
			"values" : percent2,
			"background-color" : "#7c4dff",
			"marker" : {
		    "background-color" : "#d500f9",
		    "border-color" : "#aa00ff",
		  },
		  "line-color" : "#aa00ff",
		},
	],
	"options" : {
 	  "side-1" : {
 	    "crosshair-x" : {
 	      "scale-label" : {
 	        "visible" : false,
 	      },
 	    },
 	    "scale-x" : {
 	      "visible" : false,
 	    },
 	    "scale-y" : {
     	  "guide" : {
     	    "items" : [
     	      {
     	        "background-color" : "#5F5F5F",
     	      },
     	      {
     	        "background-color" : "#666",
     	      },
     	    ],
     	  },
 	    },
 	  },
 	  "side-2" : {
 	    "subtitle" : {
 	      "visible" : false,
 	    },
 	    "scale-y" : {
     	  "guide" : {
     	    "items" : [
     	      {
     	        "background-color" : "#666",
     	      },
     	      {
     	        "background-color" : "#5F5F5F",
     	      },
     	    ],
     	  },
 	    },
 	  },
 	  "aspect" : "area",
 	},
};

zingchart.render({
	id : 'pop_chart',
	data : myConfig,
	height: '600',
	width: '100%'
});


}

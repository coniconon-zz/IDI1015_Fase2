var layers_array = [];
var countries = [];
var objects = [];

var map = L.map('map').setView([16.906346, 23.370259], 3);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, &copy; <a href="http://carto.com/attributions">CARTO</a>'
    }).addTo(map);

var scale = d3.scaleLinear().domain([0, 316000]).range([13,20]);
var color = d3.scaleLinear().domain([4,8])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#fffda8"), d3.rgb('#FF2700')]);


display_by_year(1960);

function onEachFeature(feature, layer) {
  var date = feature.properties.DATE.split(" ")
  var content = "<p>FECHA<br/>"
          + date[0] +
          "<br/><br/>LUGAR<br/>" +
          feature.properties.LOCATION_NAME +
            "<br/><br/>MAGNITUD<br/>" +
            feature.properties.MAGNITUDE +
            "<br/><br/>PROFUNDIDAD<br/>" +
            feature.properties.FOCAL_DEPTH +
            "<br/><br/>MUERTES<br/>" +
            feature.properties.DEATHS +
            "<br/><br/>DAÑOS (millones) USD<br/>" +
            feature.properties.DAMAGE +
  "</p>";
  layer.bindPopup(content);
}

function onClick(c){
  objects.push(this.feature.properties)
  //countries.push(this.feature.properties.COUNTRY)
  if (objects.length >=2) {
    display_pib_chart(objects[objects.length - 1].COUNTRY,
      objects[objects.length - 2].COUNTRY)
    display_pop_chart(objects[objects.length - 1],
      objects[objects.length - 2])
    display_damage_chart(objects[objects.length - 1],
        objects[objects.length - 2])
  };
  console.log(this.feature.properties);
}

function mouseOver(c){
  //this.openPopup();
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
            .on('click', onClick);
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



function display_pib_chart(country1,country2){
  var pib1 = extraer_pib(country1);
  var pib2 = extraer_pib(country2);
  var pib1_round = pib1.map(function(i){return parseFloat(i.toFixed(2))});
  var pib2_round = pib2.map(function(i){return parseFloat(i.toFixed(2))});
  console.log(pib1_round);
  console.log(pib2_round);
  var myConfig = {
    "background-color":"#E1EAEC #ECF2F4",
    "graphset":[
        {
            "background-color":"#242426",
            "type":"pop-pyramid",
            "options":{
                "aspect":"area"
            },
            "title": {
              "text": "Evolucion PIB per capita",
              "font-size" : "18px",
 	            "font-color" : "#DDD",
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
 	    "text":"%t: %v",
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
            "series":[
                {
                    "data-side":1,
                    "text": country1,
                    "background-color":"#007DF0 #0055A4",
                    "line-color":"#0055a4",
                    "marker":{
                        "visible":false
                    },
                    "values": pib1_round
                },
                {
                    "data-side":2,
                    "text": country2,
                    "background-color":"#94090D #D40D12",
                    "line-color":"#94090D",
                    "marker":{
                        "visible":false
                    },
                    "values":pib2_round
                }
            ]
        }
    ]
};

zingchart.render({
  id : 'PIB_Chart',
  data : myConfig,
  height: "100%",
  width: "100%"
});
}



function display_pop_chart(object1,object2){
  var pop1 = extraer_poblacion(object1.COUNTRY);
  var pop2 = extraer_poblacion(object2.COUNTRY);
  var deaths1 = deaths_by_year(object1.COUNTRY);
  var deaths2 = deaths_by_year(object2.COUNTRY);
  if (object1.YEAR == 1960) {
    var min_index = 0;
    var max_index = 2;
    var min_year = "1960";
    var max_year = "1962";
  }
  else if (object1.YEAR == 2016) {
    var min_index = 2014-1960;
    var max_index = 2016-1960;
    var min_year = "2014";
    var max_year = "2016";
  }
  else {
    var min_index = object1.YEAR - 1961;
    var max_index = object1.YEAR - 1959;
    var min_year = object1.YEAR - 1;
    var max_year = object1.YEAR + 1;
  };


  var myConfig = {
      type: "bar",
      plot:{
        stacked:true
      },
      "background-color":"#242426",
      "title":{
        "text": "Muertos por Terremoto/Población",
    "font-size" : "18px",
 	   "font-color" : "#DDD",
      },
      "scale-x": {
        "label":{
          "text":object1.COUNTRY +" , " +  object2.COUNTRY,
          "font-size" : "10px",
 	        "font-color" : "#DDD",
        },
        "values":min_year+":"+max_year
      },

      series: [
        {
          values:pop1.slice(min_index, max_index + 1),
          stack:1,
          "background-color": "#0078FF",
        },
        {
          values:deaths1.slice(min_index, max_index + 1),
          stack:1,
          "background-color": "#FF2700",
        },
        {
          values: pop2.slice(min_index, max_index + 1),
          stack:2,
          "background-color": "#17FF00",
        },
        {
          values:deaths2.slice(min_index, max_index + 1),
          stack:2,
          "background-color": "#FF2700",
        }
      ]
    };

    zingchart.render({
    	id : 'pop_chart',
    	data : myConfig,
    	height: "100%",
    	width: "100%"
    });
  }

  function display_damage_chart(object1,object2){
    var pop1 = extraer_poblacion(object1.COUNTRY);
    var pop2 = extraer_poblacion(object2.COUNTRY);
    var damage1 = damage_by_year(object1.COUNTRY);
    var damage2 = damage_by_year(object2.COUNTRY);
    if (object1.YEAR == 1960) {
      var min_index = 0;
      var max_index = 2;
      var min_year = "1960";
      var max_year = "1962";
    }
    else if (object1.YEAR == 2016) {
      var min_index = 2014-1960;
      var max_index = 2016-1960;
      var min_year = "2014";
      var max_year = "2016";
    }
    else {
      var min_index = object1.YEAR - 1961;
      var max_index = object1.YEAR - 1959;
      var min_year = object1.YEAR - 1;
      var max_year = object1.YEAR + 1;
    };


    var myConfig = {
        type: "bar",
        plot:{
          stacked:true
        },
        "background-color":"#242426",
        "title":{
          "text": "Daño causado/PIB",
      "font-size" : "18px",
   	   "font-color" : "#DDD",
        },
        "scale-x": {
          "label":{
            "text":object1.COUNTRY +" , " +  object2.COUNTRY,
            "font-size" : "10px",
   	        "font-color" : "#DDD",
          },
          "values":min_year+":"+max_year
        },

        series: [
          {
            values:pop1.slice(min_index, max_index + 1),
            stack:1,
            "background-color": "#0078FF",
          },
          {
            values:damage1.slice(min_index, max_index + 1),
            stack:1,
            "background-color": "#FF2700",
          },
          {
            values: pop2.slice(min_index, max_index + 1),
            stack:2,
            "background-color": "#17FF00",
          },
          {
            values:damage2.slice(min_index, max_index + 1),
            stack:2,
            "background-color": "#FF2700",
          }
        ]
      };

      zingchart.render({
      	id : 'damage_chart',
      	data : myConfig,
      	height: "100%",
      	width: "100%"
      });
    }

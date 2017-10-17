var layers_array = [];
var countries = [];
var objects = [];

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
  objects.push(this.feature.properties)
  //countries.push(this.feature.properties.COUNTRY)
  if (objects.length >=2) {
    display_pib_chart(objects[objects.length - 1].COUNTRY,
      objects[objects.length - 2].COUNTRY)
    display_pop_chart(objects[objects.length - 1],
      objects[objects.length - 2])
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
  //document.getElementById("year-value").innerHTML = val;
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
      "scale-x": {
        "label":{
          "text":object1.COUNTRY +" , " +  object2.COUNTRY
        },
        "values":min_year+":"+max_year
      },
      series: [
        {
          values:pop1.slice(min_index, max_index + 1),
          stack:1,

        },
        {
          values:deaths1.slice(min_index, max_index + 1),
          stack:1
        },
        {
          values: pop2.slice(min_index, max_index + 1),
          stack:2
        },
        {
          values:deaths2.slice(min_index, max_index + 1),
          stack:2
        }
      ]
    };

    zingchart.render({
    	id : 'pop_chart',
    	data : myConfig,
    	height: "600px",
    	width: "100%"
    });
  }

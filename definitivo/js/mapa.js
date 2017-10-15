var layers_array = [];


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
  console.log(this.feature.properties);
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
            fillOpacity: 0.8}).on('click', onClick);
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

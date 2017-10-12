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



function display_by_year(year){
        var point =  L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
        if (feature.properties.YEAR == year){
          if (feature.properties.DEATHS != "sin dato")
          {
          return L.circleMarker(latlng, {radius:
            scale(feature.properties.DEATHS),
            stroke: false, fillColor: color(feature.properties.MAGNITUDE),
            fillOpacity: 0.8});
        }
        else {
          return L.circleMarker(latlng, {radius: 4, stroke: false,
            fillColor: color(feature.properties.MAGNITUDE), fillOpacity: 0.8});
        }};
     }, onEachFeature: onEachFeature
   }).addTo(map);


   layers_array.push(point);
   if (layers_array.length > 1){
     console.log(layers_array);
     map.removeLayer(layers_array[layers_array.length - 2]);
   }
}

function clear() {
  L.geoJSON(data,{
    onEachFeature : function (feature, layer){
      console.log(layer.latlng);
    }});
  }
function clear2(year){
  L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
          if (feature.properties.YEAR != year){
            if (feature.properties.DEATHS != "sin dato")
            {
            return L.circleMarker(latlng, {radius:
              scale(feature.properties.DEATHS),
              stroke: false, fillColor: color(feature.properties.MAGNITUDE),
              fillOpacity: 0.8});
          }
          else {
            return L.circleMarker(latlng, {radius: 4, stroke: false,
              fillColor: color(feature.properties.MAGNITUDE), fillOpacity: 0.8});
          }};
       }, onEachFeature: onEachFeature

     }).removeFrom(map);
  }


function update(val){
  // clear(val)
  console.log(val);
  document.getElementById("year-value").innerHTML = val;
  display_by_year(val);


}

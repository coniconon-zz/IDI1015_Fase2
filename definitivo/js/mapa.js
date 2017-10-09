var map = L.map('map').setView([-21.351441,-71.7764874], 5);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, &copy; <a href="http://carto.com/attributions">CARTO</a>'
    }).addTo(map);

var scale = d3.scaleLinear().domain([0, 316000]).range([5,15]);
var color = d3.scaleLinear().domain([1,9.9])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#fffc33"), d3.rgb('#FF2700')]);

L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
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
      };
   }

    }).addTo(map);

var margin = 25;
var width = window.innerWidth;
var height = window.innerHeight;

//xN is the scale for xN-axis
var x1 = d3.scaleLinear().range([height/2 - margin, 0]);
var x2 = d3.scaleLinear().range([height/2 - margin, 0]);
var x3 = d3.scaleLinear().range([height/2 - margin, 0]);
var x4 = d3.scaleLinear().range([height/2 - margin, 0]);
var x5 = d3.scaleLinear().range([height/2 - margin, 0]);

var x1Axis = d3.axisLeft(x1).ticks(5).tickSize(1);
var x2Axis = d3.axisLeft(x2).ticks(5).tickSize(1);
var x3Axis = d3.axisLeft(x3).ticks(5).tickSize(1);
var x4Axis = d3.axisLeft(x4).ticks(5).tickSize(1);
var x5Axis = d3.axisLeft(x5).ticks(5).tickSize(1);

//container
var svg = d3.select("body").append("svg")
    .attr("width", width - margin)
    .attr("height", height - margin);

//drawing axis
svg.append("g")
    .attr("class", "x1Axis")
    .attr("transform", "translate(" + (width/2-margin) + "," + margin + ")")
    .call(x1Axis)
    .select(".tick").attr("visibility","hidden");           //hidden first tick

svg.append("g")
    .attr("class", "x2Axis")
    .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(72),translate(0," + (-height/2+margin) + ")")
    .call(x2Axis)
    .select(".tick").attr("visibility","hidden");           //hidden first tick

svg.append("g")
    .attr("class", "x3Axis")
    .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(144),translate(0," + (-height/2+margin) + ")")
    .call(x3Axis)
    .select(".tick").attr("visibility","hidden");           //hidden first tick

svg.append("g")
    .attr("class", "x4Axis")
    .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(216),translate(0," + (-height/2+margin) + ")")
    .call(x4Axis)
    .select(".tick").attr("visibility","hidden");           //hidden first tick

svg.append("g")
    .attr("class", "x5Axis")
    .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(288),translate(0," + (-height/2+margin) + ")")
    .call(x5Axis)
    .select(".tick").attr("visibility","hidden");           //hidden first tick




var margin = 25;
var width = window.innerWidth;
var height = window.innerHeight;
var origin = {"x": (width/2 - 25) ,"y":height/2};       //origin of the axes
var mvd = 0;                                 //max value of axes domain, updated by setAxesDomain()
var xOrder = [x1,x2,x3,x4,x5]               //clockwise order of axis, updated reversing axes 

//xN is the scale for xN-axis
var x1 = d3.scaleLinear().range([height/2 - margin, 0]);
var x2 = d3.scaleLinear().range([height/2 - margin, 0]);
var x3 = d3.scaleLinear().range([height/2 - margin, 0]);
var x4 = d3.scaleLinear().range([height/2 - margin, 0]);
var x5 = d3.scaleLinear().range([height/2 - margin, 0]);

//axes
var x1Axis = d3.axisLeft(x1).ticks(5).tickSize(1);
var x2Axis = d3.axisLeft(x2).ticks(5).tickSize(1);
var x3Axis = d3.axisLeft(x3).ticks(5).tickSize(1);
var x4Axis = d3.axisLeft(x4).ticks(5).tickSize(1);
var x5Axis = d3.axisLeft(x5).ticks(5).tickSize(1);

//container
var svg = d3.select("body").append("svg")
    .attr("width", width - margin)
    .attr("height", height - margin);


//set axes domain based on max value (about all attributes of all objects)
function setAxesDomain(data){
    var maxValue =0;
    for (var i=0; i < data.length; i++ ){
        var attrArray = d3.values(data[i]["attributes"]);
        currentMax = d3.max(attrArray);
        if(maxValue < currentMax){
            maxValue = currentMax;
        }
    }
    maxValueDomain = maxValue;
    x1.domain([0,maxValue]);
    x2.domain([0,maxValue]);
    x3.domain([0,maxValue]);
    x4.domain([0,maxValue]);
    x5.domain([0,maxValue]);
}

//drawing axes
function drawAxes(){
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
        .select(".tick").attr("visibility","hidden")            //hidden first tick
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
}

//path to identify dials between two axes
//second-to-fifth dials are created by rotating the first relative to origin
function drawDials(){    
    var center =  "M" + origin.x + " " + origin.y;
    var firstDial = center + ", V 25,L"+(origin.x +origin.y -45 )+" "+(origin.y-((origin.y - 25)*0.31))+",Z";

    svg.append("path")
        .attr("class","firstDial")
        .attr("d",firstDial)
        .attr("background-color","white")
        .attr("fill","white")
    svg.append("path")
        .attr("class","secondDial")
        .attr("d",firstDial)
        .attr("transform","rotate(72,"+origin.x+","+origin.y+")")
        .attr("fill","white")
    svg.append("path")
        .attr("class","thirdDial")
        .attr("d",firstDial)
        .attr("transform","rotate(144,"+origin.x+","+origin.y+")")
        .attr("fill","white")
    svg.append("path")
        .attr("class","fourthDial")
        .attr("d",firstDial)
        .attr("transform","rotate(216,"+origin.x+","+origin.y+")")
        .attr("fill","white")
    svg.append("path")
        .attr("class","fifthDial")
        .attr("d",firstDial)
        .attr("transform","rotate(288,"+origin.x+","+origin.y+")")
        .attr("fill","white")
}

//reverse axes on mouseover or mouseout
function reverseAxes(){
    svg.select(".firstDial").on("mouseover", function(){
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + margin + ")");
    });
    svg.select(".firstDial").on("mouseout", function(){
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + margin + ")");
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".secondDial").on("mouseover", function(){
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".secondDial").on("mouseout", function(){
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".thirdDial").on("mouseover", function(){
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".thirdDial").on("mouseout", function(){
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".fourthDial").on("mouseover", function(){
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".fourthDial").on("mouseout", function(){
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".fifthDial").on("mouseover", function(){
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(360),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
    });
    svg.select(".fifthDial").on("mouseout", function(){
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(360),translate(0," + (-origin.y+margin) + ")");
    });
}


function drawCasePoints(data){
    var values = [];
    for (var i=0; i < data.length; i++ ){
        values[i] =data[i]["attributes"];
    }
    var circles = svg.selectAll(".datapoint").data(values)
        .attr("class", "dataPoint")
        .attr("cx",function (d) {
            return origin.x + x2(mvd-d.attr2)*0.95 + x3(mvd-d.attr3)*0.58 - x4(mvd-d.attr4)*0.58 - x5(mvd-d.attr5)*0.95;
        })
        .attr("cy",function (d) {
            return origin.y - x1(mvd-d.attr1) - x2(mvd-d.attr2)*0.31 + x3(mvd-d.attr3)*0.8 + x4(mvd-d.attr4)*0.8 - x5(mvd-d.attr5)*0.31;
        })
        .attr("r",5)
        .attr("fill","blue");

    circles.enter().append("circle")
        .attr("class", "dataPoint")
        .attr("cx",function (d) {
            return origin.x + x2(mvd-d.attr2)*0.95 + x3(mvd-d.attr3)*0.58 - x4(mvd-d.attr4)*0.58 - x5(mvd-d.attr5)*0.95;
        })
        .attr("cy",function (d) {
            return origin.y - x1(mvd-d.attr1) - x2(mvd-d.attr2)*0.31 + x3(mvd-d.attr3)*0.8 + x4(mvd-d.attr4)*0.8 - x5(mvd-d.attr5)*0.31;
        })
        .attr("r",5)
        .attr("fill","blue");
    
    circles.exit().remove();


}


d3.json("data/dataset.json")
	.then(function(data) {
        setAxesDomain(data);
        drawDials();
        drawAxes();
        reverseAxes();
        drawCasePoints(data);
    })
    .catch(function(error) {
		console.log(error);
  	});




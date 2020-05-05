
var margin = 25;
var width = window.innerWidth;
var height = window.innerHeight;
var origin = {"x": (width/2 - 25) ,"y":height/2};       //origin of the axes

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

//set axes domain based on max value

function setAxesDomain(data){
    var values = 
    x1Axis.domain()
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

/*
function drawCasePoints(data){
    var values = data["values"]

}*/

d3.json("../data/dataset.json")
	.then(function(data) {
        //setAxesDomain(data);
        drawDials();
        drawAxes();
        reverseAxes();
        //drawCasePoints(data);
    })
    .catch(function(error) {
		console.log(error);
  	});






var margin = 25;
var width = window.innerWidth;
var height = window.innerHeight;
var origin = {"x": (width/2 - margin) ,"y":height/2};           //origin of the axes
var attrOrder = ["attr1","attr2","attr3","attr4","attr5"]   //order of attributes based to clockwise order of axes

//x is the scale for xN-axis
var x = d3.scaleLinear().range([height/2 - margin, 0]);

//axes
var x1Axis = d3.axisLeft(x).ticks(5).tickSize(1);
var x2Axis = d3.axisLeft(x).ticks(5).tickSize(1);
var x3Axis = d3.axisLeft(x).ticks(5).tickSize(1);
var x4Axis = d3.axisLeft(x).ticks(5).tickSize(1);
var x5Axis = d3.axisLeft(x).ticks(5).tickSize(1);

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
    x.domain([0,maxValue]);
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

    //rotate tick's text
    svg.select(".x2Axis").selectAll(".tick").select("text").attr("transform","translate(-8,-6)rotate(-72)");
    svg.select(".x3Axis").selectAll(".tick").select("text").attr("transform","translate(-12,-4)rotate(-142)");
    svg.select(".x4Axis").selectAll(".tick").select("text").attr("transform","translate(-14,4)rotate(142)");
    svg.select(".x5Axis").selectAll(".tick").select("text").attr("transform","translate(-10,5)rotate(72)");
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
function reverseAxes(data){
    // FIRST DIAL
    svg.select(".firstDial").on("mouseover", function(){
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x1Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-8,-6)rotate(-72)");
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + margin + ")");
        svg.select(".x2Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","rotate(0)");
        drawCasePoints(data,["attr2","attr1","attr3","attr4","attr5"]);
    });
    svg.select(".firstDial").on("mouseout", function(){
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + margin + ")");
        svg.select(".x1Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","rotate(0)");
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x2Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-8,-6)rotate(-72)");
        drawCasePoints(data,attrOrder);
    });
    // SECOND DIAL
    svg.select(".secondDial").on("mouseover", function(){
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x2Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-12,-4)rotate(-142)");
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x3Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-8,-6)rotate(-72)");
        drawCasePoints(data,["attr1","attr3","attr2","attr4","attr5"]);
    });
    svg.select(".secondDial").on("mouseout", function(){
        svg.select(".x2Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x2Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-8,-6)rotate(-72)");
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x3Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-12,-4)rotate(-142)");
        drawCasePoints(data,attrOrder);
    });
    // THIRD DIAL
    svg.select(".thirdDial").on("mouseover", function(){
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x3Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-14,4)rotate(142)");
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x4Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-12,-4)rotate(-142)");
        drawCasePoints(data,["attr1","attr2","attr4","attr3","attr5"]);
    });
    svg.select(".thirdDial").on("mouseout", function(){
        svg.select(".x3Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x3Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-12,-4)rotate(-142)");
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x4Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-14,4)rotate(142)");
        drawCasePoints(data,attrOrder);
    });
    // FOURTH DIAL
    svg.select(".fourthDial").on("mouseover", function(){
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x4Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-10,5)rotate(72)");
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x5Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-14,4)rotate(142)");
        drawCasePoints(data,["attr1","attr2","attr3","attr5","attr4"]);
    });
    svg.select(".fourthDial").on("mouseout", function(){
        svg.select(".x4Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x4Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-14,4)rotate(142)");
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x5Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-10,5)rotate(72)");
        drawCasePoints(data,attrOrder);
    });
    // FIFTH DIAL
    svg.select(".fifthDial").on("mouseover", function(){
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(360),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x5Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","rotate(0)");
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x1Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-10,5)rotate(72)");
            drawCasePoints(data,["attr5","attr2","attr3","attr4","attr1"])
    });
    svg.select(".fifthDial").on("mouseout", function(){
        svg.select(".x5Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x5Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","translate(-10,5)rotate(72)");
        svg.select(".x1Axis").transition().duration(2000)
            .attr("transform","translate(" + origin.x + "," + origin.y +"),rotate(360),translate(0," + (-origin.y+margin) + ")");
        svg.select(".x1Axis").selectAll(".tick").select("text").transition().duration(2000)
            .attr("transform","rotate(0)");
        drawCasePoints(data,attrOrder);
    });
}

function drawCasePoints(data, attrOrder){
    var values = [];
    for (var i=0; i < data.length; i++ ){
        values[i] = data[i]["attributes"];
        values[i].label = data[i]["label"];
    }
    var circles = svg.selectAll(".datapoint").data(values)
        
    circles.transition().duration(2000)
        .attr("cx",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("cy",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("r",5);

    circles.enter().append("circle")
        .attr("class", "dataPoint")
        .attr("cx",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("cy",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("r",5)
        .attr("fill","blue")
    
    circles.exit().remove();
        
    var labels = svg.selectAll(".labels").data(values)

    labels.exit().remove();

    labels.enter().append("text")
        .attr("class","labels")
        .attr("x",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("y",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("transform","translate(-10,-8)")
        .text(function (d) {return d.label});
        
    labels.transition().duration(2000)
        .attr("x",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("y",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("transform","translate(-10,-8)")
        .text(function (d) {return d.label});

}

d3.json("data/dataset.json")
	.then(function(data) {
        setAxesDomain(data);
        drawDials();
        drawAxes();
        reverseAxes(data);
        drawCasePoints(data,attrOrder);
    })
    .catch(function(error) {
		console.log(error);
    });
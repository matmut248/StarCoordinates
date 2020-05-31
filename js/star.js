
var margin = 25;
var width = window.innerWidth;
var height = window.innerHeight;
var origin = {"x": (width/2 - margin) ,"y":height/2};           //origin of the axes
var updateTime = 2000;

//each element of axisOrder specifies which axes delimit dials
var axisOrder = [[".x1",".x2"],[".x2",".x3"],[".x3",".x4"],[".x4",".x5"],[".x5",".x1"]];
//map from axes to attributes
var axesToAttr = {".x1" : "attr1", ".x2" : "attr2", ".x3" : "attr3", ".x4" : "attr4", ".x5" : "attr5",};
//attrOrder specifies clockwise order of attributes from first to fifth axis
var attrOrder = ["attr1","attr2","attr3","attr4","attr5"];
//axisPos defined initial transformation of axes
var axisPos = {first : "translate(" + origin.x + "," + margin + ")",
            second : "translate(" + origin.x + "," + origin.y +"),rotate(72),translate(0," + (-origin.y+margin) + ")",
            third : "translate(" + origin.x + "," + origin.y +"),rotate(144),translate(0," + (-origin.y+margin) + ")",
            fourth : "translate(" + origin.x + "," + origin.y +"),rotate(216),translate(0," + (-origin.y+margin) + ")",
            fifth : "translate(" + origin.x + "," + origin.y +"),rotate(288),translate(0," + (-origin.y+margin) + ")"};

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

//set axes's domain based on max value among all attributes
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
    svg.append("g") //FIRST
        .attr("class", "x1")
        .attr("transform", "translate(" + (width/2-margin) + "," + margin + ")")
        .call(x1Axis)
        .select(".tick").attr("visibility","hidden");           //hide first tick
    svg.append("g") //SECOND
        .attr("class", "x2")
        .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(72),translate(0," + (-height/2+margin) + ")")
        .call(x2Axis)
        .select(".tick").attr("visibility","hidden");           
    svg.append("g") //THIRD
        .attr("class", "x3")
        .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(144),translate(0," + (-height/2+margin) + ")")
        .call(x3Axis)
        .select(".tick").attr("visibility","hidden")
    svg.append("g") //FOURTH
        .attr("class", "x4")
        .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(216),translate(0," + (-height/2+margin) + ")")
        .call(x4Axis)
        .select(".tick").attr("visibility","hidden");         
    svg.append("g") //FIFTH
        .attr("class", "x5")
        .attr("transform", "translate(" + (width/2-margin) + "," + height/2 +"),rotate(288),translate(0," + (-height/2+margin) + ")")
        .call(x5Axis)
        .select(".tick").attr("visibility","hidden");     

    //rotate tick's text
    svg.select(".x2").selectAll(".tick").select("text").attr("transform","translate(-8,-6)rotate(-72)");
    svg.select(".x3").selectAll(".tick").select("text").attr("transform","translate(-12,-4)rotate(-142)");
    svg.select(".x4").selectAll(".tick").select("text").attr("transform","translate(-14,4)rotate(142)");
    svg.select(".x5").selectAll(".tick").select("text").attr("transform","translate(-10,5)rotate(72)");

    //draw axes's label
    svg.select(".x1").append("text").attr("class","axisLabel").text(axesToAttr[".x1"]).attr("transform","translate(20,-10)");
    svg.select(".x2").append("text").attr("class","axisLabel").text(axesToAttr[".x2"]).attr("transform","translate(15,-15),rotate(-90)");
    svg.select(".x3").append("text").attr("class","axisLabel").text(axesToAttr[".x3"]).attr("transform","translate(-5,-35),rotate(-144)");
    svg.select(".x4").append("text").attr("class","axisLabel").text(axesToAttr[".x4"]).attr("transform","translate(-30,-10),rotate(144)");
    svg.select(".x5").append("text").attr("class","axisLabel").text(axesToAttr[".x5"]).attr("transform","translate(10,20),rotate(90)");
}

//path to identify dials between two axes
//second-to-fifth dials are created rotating the first relative to origin
function drawDials(){    
    var center =  "M" + origin.x + " " + origin.y;
    var firstDial = center + ", V 25,L"+(origin.x +origin.y -45 )+" "+(origin.y-((origin.y - 25)*0.31))+",Z";

    svg.append("path")
        .attr("id","firstDial")
        .attr("class","dial")
        .attr("d",firstDial)

    svg.append("path")
        .attr("id","secondDial")
        .attr("class","dial")
        .attr("d",firstDial)
        .attr("transform","rotate(72,"+origin.x+","+origin.y+")")

    svg.append("path")
        .attr("id","thirdDial")
        .attr("class","dial")
        .attr("d",firstDial)
        .attr("transform","rotate(144,"+origin.x+","+origin.y+")")

    svg.append("path")
        .attr("id","fourthDial")
        .attr("class","dial")
        .attr("d",firstDial)
        .attr("transform","rotate(216,"+origin.x+","+origin.y+")")

    svg.append("path")
        .attr("id","fifthDial")
        .attr("class","dial")
        .attr("d",firstDial)
        .attr("transform","rotate(288,"+origin.x+","+origin.y+")")

    svg.selectAll(".dial").attr("fill","white").attr("fill-opacity","0");
}

//reverse the axes by clicking on dial that they delimit it. transformation is also applied to ticks and labels.
//after the transformation, data points are redrawn according to the new order of the axes
function reverseAxes(data){
    //FIRST
    svg.select("#firstDial").on("click", function(){        
        svg.select(axisOrder[0][0]).transition().duration(updateTime)
            .attr("transform",axisPos.second)
        svg.select(axisOrder[0][0]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-8,-6)rotate(-72)");
        svg.select(axisOrder[0][0]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(15,-15),rotate(-90)");

        svg.select(axisOrder[0][1]).transition().duration(updateTime)
            .attr("transform",axisPos.first)
        svg.select(axisOrder[0][1]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","rotate(0)");
        svg.select(axisOrder[0][1]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(20,-10)");

        var temp = axisOrder[0][0]
        axisOrder[0][0] = axisOrder[0][1]
        axisOrder[4][1] = axisOrder[0][1]
        axisOrder[0][1] = temp
        axisOrder[1][0] = temp
        
        drawCasePoints(data,[axesToAttr[axisOrder[0][0]],axesToAttr[axisOrder[1][0]],axesToAttr[axisOrder[2][0]],axesToAttr[axisOrder[3][0]],axesToAttr[axisOrder[4][0]]])
    })
    //SECOND
    svg.select("#secondDial").on("click", function () {  
        svg.select(axisOrder[1][0]).transition().duration(updateTime)
            .attr("transform",axisPos.third)
        svg.select(axisOrder[1][0]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-12,-4)rotate(-142)");
        svg.select(axisOrder[1][0]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(-5,-35),rotate(-144)");

        svg.select(axisOrder[1][1]).transition().duration(updateTime)
            .attr("transform",axisPos.second)
        svg.select(axisOrder[1][1]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-8,-6)rotate(-72)");
        svg.select(axisOrder[1][1]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(15,-15),rotate(-90)");

        var temp = axisOrder[1][0]
        axisOrder[1][0] = axisOrder[1][1]
        axisOrder[0][1] = axisOrder[1][1]
        axisOrder[1][1] = temp
        axisOrder[2][0] = temp 

        drawCasePoints(data,[axesToAttr[axisOrder[0][0]],axesToAttr[axisOrder[1][0]],axesToAttr[axisOrder[2][0]],axesToAttr[axisOrder[3][0]],axesToAttr[axisOrder[4][0]]])
    })
    //THIRD
    svg.select("#thirdDial").on("click", function () {
        svg.select(axisOrder[2][0]).transition().duration(updateTime)
            .attr("transform", axisPos.fourth)
        svg.select(axisOrder[2][0]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-14,4)rotate(142)");
        svg.select(axisOrder[2][0]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(-30,-10),rotate(144)");

        svg.select(axisOrder[2][1]).transition().duration(updateTime)
            .attr("transform", axisPos.third)
        svg.select(axisOrder[2][1]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-12,-4)rotate(-142)");
        svg.select(axisOrder[2][1]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(-5,-35),rotate(-144)");

        var temp = axisOrder[2][0]
        axisOrder[2][0] = axisOrder[2][1]
        axisOrder[1][1] = axisOrder[2][1]
        axisOrder[2][1] = temp
        axisOrder[3][0] = temp 

        drawCasePoints(data,[axesToAttr[axisOrder[0][0]],axesToAttr[axisOrder[1][0]],axesToAttr[axisOrder[2][0]],axesToAttr[axisOrder[3][0]],axesToAttr[axisOrder[4][0]]])
    })
    //FOURTH
    svg.select("#fourthDial").on("click", function () {
        svg.select(axisOrder[3][0]).transition().duration(updateTime)
            .attr("transform",axisPos.fifth)
        svg.select(axisOrder[3][0]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-10,5)rotate(72)");
        svg.select(axisOrder[3][0]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(10,20),rotate(90)");

        svg.select(axisOrder[3][1]).transition().duration(updateTime)
            .attr("transform",axisPos.fourth)
        svg.select(axisOrder[3][1]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-14,4)rotate(142)");
        svg.select(axisOrder[3][1]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(-30,-10),rotate(144)");

        var temp = axisOrder[3][0]
        axisOrder[3][0] = axisOrder[3][1]
        axisOrder[2][1] = axisOrder[3][1]
        axisOrder[3][1] = temp
        axisOrder[4][0] = temp 

        drawCasePoints(data,[axesToAttr[axisOrder[0][0]],axesToAttr[axisOrder[1][0]],axesToAttr[axisOrder[2][0]],axesToAttr[axisOrder[3][0]],axesToAttr[axisOrder[4][0]]])
    })
    //FIFTH
    svg.select("#fifthDial").on("click",function () {
        svg.select(axisOrder[4][0]).transition().duration(updateTime)
            .attr("transform",axisPos.first)
        svg.select(axisOrder[4][0]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","rotate(0)");
        svg.select(axisOrder[4][0]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(20,-10)");

        svg.select(axisOrder[4][1]).transition().duration(updateTime)
            .attr("transform",axisPos.fifth)
        svg.select(axisOrder[4][1]).selectAll(".tick").select("text").transition().duration(updateTime)
            .attr("transform","translate(-10,5)rotate(72)");
        svg.select(axisOrder[4][1]).select(".axisLabel").transition().duration(updateTime)
            .attr("transform","translate(10,20),rotate(90)");

        var temp = axisOrder[4][0]
        axisOrder[4][0] = axisOrder[4][1]
        axisOrder[3][1] = axisOrder[4][1]
        axisOrder[4][1] = temp
        axisOrder[0][0] = temp 

        drawCasePoints(data,[axesToAttr[axisOrder[0][0]],axesToAttr[axisOrder[1][0]],axesToAttr[axisOrder[2][0]],axesToAttr[axisOrder[3][0]],axesToAttr[axisOrder[4][0]]])
    })
}

//draw data points according to the order of the axes
//each data point are identified by a circle and a label
function drawCasePoints(data, attrOrder){
    var values = [];
    for (var i=0; i < data.length; i++ ){
        values[i] = data[i]["attributes"];
        values[i].label = data[i]["label"];
    }
    var circles = svg.selectAll(".datapoint").data(values)
        
    circles.transition().duration(updateTime)
        .attr("cx",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("cy",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("r",8);

    circles.enter().append("circle")
        .attr("class", "dataPoint")
        .attr("cx",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("cy",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("r",8)
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
        .attr("transform","translate(-14,-12)")
        .text(function (d) {return d.label});
        
    labels.transition().duration(updateTime)
        .attr("x",function (d) {
            return origin.x - x(d[attrOrder[1]])*0.95 - x(d[attrOrder[2]])*0.58 + x(d[attrOrder[3]])*0.58 + x(d[attrOrder[4]])*0.95;
        })
        .attr("y",function (d) {
            return origin.y + x(d[attrOrder[0]]) + x(d[attrOrder[1]])*0.31 - x(d[attrOrder[2]])*0.8 - x(d[attrOrder[3]])*0.8 + x(d[attrOrder[4]])*0.31;
        })
        .attr("transform","translate(-14,-12)")
        .text(function (d) {return d.label});
}

d3.json("data/dataset.json")
	.then(function(data) {
        setAxesDomain(data);
        drawAxes();
        drawCasePoints(data,attrOrder);
        drawDials();
        reverseAxes(data);
        
    })
    .catch(function(error) {
		console.log(error);
    });
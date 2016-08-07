app.config(function($routeProvider){
        $routeProvider
        .when('/404',{
        'templateUrl' : 'html/404.html'
        })
        .when('/error',{
        'templateUrl' : 'html/error.html'
        })
        .when('/',{
        'templateUrl' : 'html/index.html',
        'controller':'mainController'
        })
        .when('/contact',{
        'templateUrl' : 'html/contact.html'
        })
        .otherwise({
        redirectTo : '/404'
        });
});
app.run(['$rootScope',function($rootScope) {
  $rootScope.drawPieChart=function (divName,data) {
      console.log(' i am in service');
      var width = 450,
        height = 250,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var svg = d3.select(divName).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      //var data=[{crops:'rice',value:30},{crops:'wheat',value:70}];
      console.log("i am in chart");
      console.log(data);
      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.crops); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data.crops; });

    function type(d) {
      d.value = +d.value;
      return d;
    }
  };
$rootScope.drawLineChart=function(divName,data){
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 450 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;

var formatDate = d3.time.format("%d-%b-%y");

var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });
// console.log(line);
var svg = d3.select(divName).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain(d3.extent(data, function(d) { return d.close; }));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Production (in ton)");

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  };
}]);

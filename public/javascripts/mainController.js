app.controller('mainController',['$rootScope','$location','$scope','$http',function ($rootScope,$location,$scope,$http) {
  $scope.options1 = [
    {
      name: 'Commercial Crops',
      value: 'commercialCrops'
    },
    {
      name: 'Food Grains Aggregate across the years',
      value: 'foodGrains'
    },
    {
      name: 'Oil Seeds Aggregate across the years',
      value: 'oilSeeds'
    },
    {
      name: 'Southern India Rice Production',
      value: 'riceSouthernProduction'
    }
  ];
  var options= [
    {
      name: '1993',
      value: 1993
    },
    {
      name: '1994',
      value: 1994
    },
    {
      name: '1995',
      value: 1995
    },
    {
      name: '1996',
      value: 1996
    },
    {
      name: '1997',
      value: 1997
    },
    {
      name: '1998',
      value: 1998
    },
    {
      name: '1999',
      value: 1999
    },
    {
      name: '2000',
      value: 2000
    },
    {
      name: '2001',
      value: 2000
    },
    {
      name: '2002',
      value: 2002
    },
    {
      name: '2003',
      value: 2003
    },
    {
      name: '2004',
      value: 2004
    },
    {
      name: '2005',
      value: 2005
    },
    {
      name: '2006',
      value: 2006
    },
    {
      name: '2007',
      value: 2007
    },
    {
      name: '2008',
      value: 2008
    },
    {
      name: '2009',
      value: 2009
    },
    {
      name: '2010',
      value: 2010
    },
    {
      name: '2011',
      value: 2011
    },
    {
      name: '2012',
      value: 2012
    },
    {
      name: '2013',
      value: 2013
    },
    {
      name: '2014',
      value: 2014
    }
  ];
  $scope.selectedOption1 = $scope.options1[0];
  $scope.options2 = options;
  $scope.selectedOption2 = $scope.options2[0];
  $scope.options3 = options;
  $scope.selectedOption3 = $scope.options3[0];
  $scope.getBarChartGraph=function(divName){
    var data1={indicator:this.selectedOption1.value,startDate:this.selectedOption2.value,endDate:this.selectedOption3.value};
    if(data1.indicator!="riceSouthernProduction"){
    $http.post('/graphApi/barChart',data1).then(function(response){
      console.log(response.data);
      var id = angular.element( document.querySelector(divName) );
      id.empty();
      var id1 = angular.element( document.querySelector('#pieChart') );
      id1.empty();
      var id2 = angular.element( document.querySelector('#lineChart') );
      id2.empty();
      var margin = {top: 40, right: 10, bottom: 200, left: 40},
          width =700 - margin.left - margin.right,
          height =550 - margin.top - margin.bottom,
          x = d3.scale.ordinal().rangeRoundBands([0, width],.35),
          y = d3.scale.linear().range([height, 0]);
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickSize(2),
          yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(15)
          .tickSize(2)
          .tickFormat(d3.format(".2s")),
          svg = d3.select(divName).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform","translate(" + margin.left + "," + margin.top + ")");
          //read json file
          var data=response.data;
          console.log(data);
          x.domain(data.map(function(d) { return d.x; }));
          y.domain([0, d3.max(data, function(d) { return d.y; })]);

          //code for tooltip
          var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                  return "<strong>Production:</strong> <span style='color:#fff22a'>" + d.y +" (Ton mn)"+"</span>";
              });
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.55em")
              .attr("transform", "rotate(-115)" );

          //call tooltip
          svg.call(tip);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 2)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Production(Ton mn)")

          svg.selectAll("bar")
              .data(data)
              .enter().append("rect")
              .style("fill", '#80002a')
              .attr("x", function(d) { return x(d.x); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.y); })
              .attr("height", function(d) { return height - y(d.y); })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide);
              if(data1.indicator!="commercialCrops"){
                var chartData=[];
                chartData = data.map(function(d) {
                  return {crops:d.x,value:d.y};
                });
                console.log(chartData)
                this.getPieChart('#pieChart' ,chartData);
              }
              else{
                var chartData=[];
                chartData = data.map(function(d) {
                  var a=d.x.split('_')[1];
                  return {date:a,close:d.y};
                });
                console.log(chartData)
                this.getLineChart('#lineChart' ,chartData);
              }
  }.bind(this),function (response) {
    console.error(response);
    $location.path('/error');
  });
}
  else{
    $http.post('/graphApi/stackChart',data).then(function(response){
      var id = angular.element( document.querySelector(divName) );
      id.empty();
      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = 800 - margin.left-margin.right,
          height = 400 - margin.top - margin.bottom;
          x = d3.scale.ordinal().rangeRoundBands([0, 3*width/4],.35),
          y = d3.scale.linear().range([height, 0]);
      var color = d3.scale.category10();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickSize(2);

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickSize(2)
          .tickFormat(d3.format(".2s"));

      var svg = d3.select(divName).append("svg")
          .attr("width", width + margin.left + margin.right )
          .attr("height", height + margin.top + margin.bottom+100)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          var data=response.data;
          color.domain(d3.keys(data[0]).filter(function(key) { return key !== "x"; }));

          data.forEach(function(d) {
              var y0 = 0;
              d.prod = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
              d.total = d.prod[d.prod.length - 1].y1;
          });

          x.domain(data.map(function(d) { return d.x; }));
          y.domain([0, d3.max(data, function(d) { return d.total; })]);


          //code for tooltip
         var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                  return "<strong>Production:</strong> <span style='color:#fff22a'>" + d.y1 + " (kg/ha)"+"</span>";
              });

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.55em")
              .attr("transform", "rotate(-115)" );

          //call tooltip
          svg.call(tip);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Production(kg/ha)")

          var year = svg.selectAll(".year")
              .data(data)
              .enter().append("g")
              .attr("class", "g")
              .attr("transform", function(d) { return "translate(" + x(d.x) + ",0)"; });

          year.selectAll("rect")
              .data(function(d) { return d.prod; })
              .enter().append("rect")
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.y1); })
              .attr("height", function(d) { return y(d.y0) - y(d.y1); })
              .style("fill", function(d) { return color(d.name); })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide);

          var legend = svg.selectAll(".legend")
              .data(color.domain().slice().reverse())
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x",700)
              .attr("y", "0px")
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color);

          legend.append("text")
              .attr("x",670)
              .attr("y", 9)
              .attr("dy", "0px")
              .style("text-anchor", "end")
              .text(function(d) { return d; });
    }.bind(this),function(response) {
      console.error(response);
      $location.path('/error');
    });
  }
  };
  $scope.getPieChart=function (divName,data) {
    $rootScope.drawPieChart(divName,data);
  };
  $scope.getLineChart=function (divName,data) {
    $rootScope.drawLineChart(divName,data);
  };
}]);

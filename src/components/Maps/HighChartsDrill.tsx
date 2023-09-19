import React, { useRef } from "react";
import { render } from "react-dom";
import $ from "jquery";
// Import Highcharts
import Highcharts from "highcharts/highmaps";
import drilldow from "highcharts/modules/drilldown";
import dataModule from "highcharts/modules/data";

import HighchartsReact from "highcharts-react-official";

drilldow(Highcharts);
dataModule(Highcharts);

var data: any = Highcharts.geojson(Highcharts.maps["countries/us/us-all"]),
  separators: any = Highcharts.geojson(Highcharts.maps["countries/us/us-all"], "mapline");
console.log(data);
// Set drilldown pointers
data.forEach(function (el: any, i: any) {
  el.drilldown = el.properties["hc-key"];
  el.value = i; // Non-random bogus data
});

//window.Highcharts = Highcharts;

const options = {
  chart: {
    events: {
      drilldown: function (e: any) {
        if (!e.seriesOptions) {
          var chart: any = this,
            mapKey = "countries/us/" + e.point.drilldown + "-all",
            // Handle error, the timeout is cleared on success
            fail = setTimeout(function () {
              if (!Highcharts.maps[mapKey]) {
                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                fail = setTimeout(function () {
                  chart.hideLoading();
                }, 1000);
              }
            }, 3000);

          // Show the spinner
          chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

          // Load the drilldown map
          $.getScript("https://code.highcharts.com/mapdata/" + mapKey + ".js", function () {
            data = Highcharts.geojson(Highcharts.maps[mapKey]);

            // Set a non-random bogus value
            $.each(data, function (i) {
              this.value = i;
            });

            // Hide loading and add series
            chart.hideLoading();
            clearTimeout(fail);
            chart.addSeriesAsDrilldown(e.point, {
              name: e.point.name,
              data: data,
              dataLabels: {
                enabled: true,
                format: "{point.name}",
              },
            });
          });
        }
        //chart was this
        chart.setTitle(null, { text: e.point.name });
      },
      drillup: function () {
        //chart was this
        var chart: any = this;
        chart.setTitle(null, { text: "" });
      },
    },
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  colorAxis: {
    min: 0,
    minColor: "#E6E7E8",
    maxColor: "#005645",
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },

  plotOptions: {
    map: {
      states: {
        hover: {
          color: "#EEDD66",
        },
      },
    },
  },

  series: [
    {
      data: data,
      name: "USA",
      dataLabels: {
        enabled: true,
        format: "{point.properties.postal-code}",
      },
    },
    {
      type: "mapline",
      data: separators,
      color: "silver",
      enableMouseTracking: false,
      animation: {
        duration: 500,
      },
    },
  ],

  drilldown: {
    activeDataLabelStyle: {
      color: "#FFFFFF",
      textDecoration: "none",
      textOutline: "1px #000000",
    },
    drillUpButton: {
      relativeTo: "spacingBox",
      position: {
        x: 0,
        y: 60,
      },
    },
  },
};

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).

const HighChartsDrill = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div>
      <h2>Highcharts</h2>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType={"mapChart"} />
    </div>
  );
};

export default HighChartsDrill;

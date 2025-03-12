(function () {
  "use strict";

  /* BTC Chart */
  var btcChart = {
    chart: {
      type: "area",
      height: 45,
      width: 230,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        color: '#000',
        opacity: 0.1
      }
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 1,
      dashArray: 3,
    },
    fill: {
      gradient: {
        enabled: true
      }
    },
    series: [
      {
        name: "Value",
        data: [54, 38, 56, 35, 65, 43, 53, 45, 62, 80, 35, 48],
      },
    ],
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
    },
    colors: ['rgb(227, 84, 212)'],
    tooltip: {
      enabled: false,
    },
  };
  document.getElementById("btc-currency-chart").innerHTML = "";
  var btcChartInstance = new ApexCharts(
    document.querySelector("#btc-currency-chart"),
    btcChart
  );
  btcChartInstance.render();
  /* BTC Chart */

  /* ETH Chart */
  var ethChart = {
    chart: {
      type: "area",
      height: 45,
      width: 230,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        color: '#000',
        opacity: 0.1
      }
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 1,
      dashArray: 3,
    },
    fill: {
      gradient: {
        enabled: true
      }
    },
    series: [
      {
        name: "Value",
        data: [54, 38, 56, 35, 65, 43, 53, 45, 62, 80, 35, 48],
      },
    ],
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
    },
    colors: ["rgba(106, 78, 237,0.5)"],
    tooltip: {
      enabled: false,
    },
  };
  document.getElementById("eth-currency-chart").innerHTML = "";
  var ethChartInstance = new ApexCharts(
    document.querySelector("#eth-currency-chart"),
    ethChart
  );
  ethChartInstance.render();
  /* ETH Chart */

  /* Additional charts follow the same pattern... */

})();

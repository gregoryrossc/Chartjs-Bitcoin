const drawChart = function(dates, price, mcap) {
    new Chart(document.getElementById("chart"), {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
          label: "Price",
          type: "line",
          borderColor: "#8e5ea2",
          data: price,
          fill: false,
          yAxisID: 'price'
        }, {
          label: "Mcap",
          type: "line",
          borderColor: "#3e95cd",
          data: mcap,
          fill: false,
          yAxisID: 'mcap'
        }]
    },
    options: {
      title: {
        display: false,
        text: 'Bitcoin growth: '
      },
      legend: { 
          display: false 
      },
      scales: {
        yAxes: [{
          id: 'mcap',
          type: 'linear',
          position: 'left',
        }, {
          id: 'price',
          type: 'linear',
          position: 'right',
        }]
        }
    }
  });
}

// Use jquery to get the data.
 setInterval(function() {
     $.get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1", function(data, status) {
    const prices = data.prices.map(n => n[1])
  const mcap = data.market_caps.map(n => n[1])
  const dates = data.prices.map(n => new Date(n[0] * 1000).getHours()) 
  
  console.log(data)
  drawChart(dates, prices, mcap)
});
 }, 4000);

const os = require('os')
var chart = null;


function getMemoryUsage(){
    freeMemo = os.freemem();
    totalMemo = os.totalmem();
    usingMemo = totalMemo - freeMemo;

    return [
        freeMemo,
        usingMemo
    ]
}


function getDataSets(){
    const dataset = []
    const memoData = {
        data: getMemoryUsage(),
        backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
        ]
    }
    dataset.push(memoData)
    return dataset;
}

function updateDatasets(){
    chart.data.datasets[0].data = os.freemem();
    chart.data.datasets[1].data = os.totalmem() - os.freemem();

    chart.update();
}

function drawChart() {
    chart = new Chart($('.chart'), {
      type: 'doughnut',
      data: {
        labels: [
          'Free Memory (Bytes)',
          'Used Memory (Bytes)'
        ],
        datasets: getDataSets()
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Memory Usage',
          fontColor: 'rgb(15, 15, 15)',
          fontSize: 16
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(15, 15, 15)',
            fontSize: 12
          }
        }
      }
    });
  
    setInterval(updateDatasets, 250);
  }
  
  $(() => {
    getMemoryUsage();
    drawChart();
  })
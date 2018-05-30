const os = require('os')
var chart = null;


function getMemoryUsage(){
  return [
    os.freemem(),
    os.totalmem() - os.freemem(),   
  ];
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
    chart.data.datasets.data[0] = os.freemem();
    chart.data.datasets.data[1] = os.totalmem() - os.freemem();

    chart.update();
}

function drawChart() {
    chart = new Chart($('.chart'), {
      type: 'doughnut',
      data: {
        labels: [
          'Used Memory (Bytes)',
          'Free Memory (Bytes)'
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
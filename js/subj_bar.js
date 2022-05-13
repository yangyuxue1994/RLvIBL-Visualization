console.log('subj_bar.js')
function convertBehData(behData, id) {
    return {
        labels: ['Reward', 'Loss'], 
        datasets:[{
            type: "bar",
            data: [behData[id].RewardBlock.RewardTrial, behData[id].LossBlock.RewardTrial],
            label:"Reward Trial",   // legend name 
            fill:false,    // fill areas below line
            borderColor: 'rgba(34, 139, 34, 0.8)',
            backgroundColor: 'rgba(34, 139, 34, 0.8)',
            order: 1,
            categoryPercentage: 0.2,
            barPercentage: 0.3
        }, 
        {   
            type: "bar",
            data: [behData[id].RewardBlock.LossTrial, behData[id].LossBlock.LossTrial],
            label:"Loss Trial",   // legend name 
            fill:false,    // fill areas below line
            borderColor: 'rgba(255, 79, 0, 0.8)',
            backgroundColor: 'rgba(255, 79, 0, 0.8)',
            order: 1,
            categoryPercentage: 0.2,
            barPercentage: 0.3
        }, { 
            type: "line",
            data: [(behData[id].RewardBlock.RewardTrial + behData[id].RewardBlock.LossTrial)/2, (behData[id].LossBlock.RewardTrial + behData[id].LossBlock.LossTrial)/2],
            label:"Block Effect",   // legend name 
            fill:false,    // fill areas below line
            borderColor: '#444',
            backgroundColor: '#444',
            order: 1,
            barPercentage: 0.5
        }, { 
            type: "line",
            data: [(behData[id].RewardBlock.RewardTrial + behData[id].LossBlock.RewardTrial)/2, (behData[id].RewardBlock.LossTrial + behData[id].LossBlock.LossTrial)/2],
            label:"Trial Effect",   // legend name 
            fill:false,    // fill areas below line
            borderColor: '#ccc',
            backgroundColor: '#ccc',
            order: 1,
            barPercentage: 0.5
        }]
    }
}
function plotBeh(behData, id) {
    //console.log(data)
    const dummy_dataset = convertBehData(behData, id);
    const config = {
        // type:"bar",
        data: dummy_dataset,
        options:{
          responsive:true,
          plugins: {
            title: {
                display: true,
                text: 'Probability of Switching - Subject (' + id + ')'
                }
            },
            scales: {
                x:{
                    
                },
                y:{
                    beginAtZero: true,
                    max:1
                }
            },
            legend: {
                display: true,
                position: 'left',
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        },
      };
    //console.log(dummy_dataset)
    // set the dimensions and margins of the graph
    // var margin = {top: 30, right: 30, bottom: 30, left: 50},
    // width = 300 - margin.left - margin.right,
    // height = 100 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const ctx = 'subj_pswitch'; //objChart.getContext(ctx);
    const mychart1 = new Chart(ctx, config);
    //document.getElementById("myCanvas").getContext("2d");
    
    // var svg = d3.select("#vis_pswitch")
    // .append("canvas")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .attr("id", ctx)
    // .append("g")
    // .attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")");
    return mychart1
}

function plotUpdateBeh(chart,behData, id) {
    console.log(behData[id]);
    const dummy_dataset = convertBehData(behData, id);
    chart.options.plugins.title.text = 'Probability of Switching - Subject (' + id + ')';
    chart.data = dummy_dataset;
    chart.update()
} 
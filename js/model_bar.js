console.log('model_bar.js')
function convertModelData0(mData, id) {
    return {
        labels: ['M1', 'M2'], 
        datasets:[{
            data: [mData[id]['m1'].RewardBlock.RewardTrial, mData[id]['m1'].RewardBlock.LossTrial],
            label:["M1: Reward Block"],   // legend name 
            fill:true,    // fill areas below line
            //borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(222, 45, 38, 0.5)',
            // order: 1,
            // barPercentage: 0.8,
            // barThickness: 10,
            // maxBarThickness: 10,
            // minBarLength: 10,
        }, 
        {   data: [mData[id]['m1'].LossBlock.RewardTrial, mData[id]['m1'].LossBlock.LossTrial],
            label:["M1: Loss Block"],   // legend name 
            fill:false,    // fill areas below line
            borderColor: '#fff',
            backgroundColor: 'rgba(222, 45, 38, 0.5)',
            // order: 1,
            // barPercentage: 0.8,
            // barThickness: 10,
            // maxBarThickness: 10,
            // minBarLength: 10
        },
        {   data: [mData[id]['m2'].RewardBlock.LossTrial, mData[id]['m2'].LossBlock.LossTrial],
            label:["Reward Trial", "Loss Trial"],   // legend name 
            fill:false,    // fill areas below line
            borderColor: '#fff',
            backgroundColor: 'rgba(49, 130, 189, 0.5)',
            order: 1,
            // barPercentage: 0.5,
            // barThickness: 10,
            // maxBarThickness: 10,
            // minBarLength: 10
        },
        {   data: [mData[id]['m2'].RewardBlock.LossTrial, mData[id]['m2'].LossBlock.LossTrial],
            label:["Reward Trial", "Loss Trial"],   // legend name 
            fill:false,    // fill areas below line
            //borderColor: '#fff',
            backgroundColor: 'rgba(49, 130, 189, 0.5)',
            order: 1,
            // barPercentage: 0.5,
            // barThickness: 10,
            // maxBarThickness: 10,
            // minBarLength: 10
        }]
    }
}


function convertModelData(mData, id, m) {
    return {
        labels: ['Reward', 'Loss'], 
        datasets:[
        {
            type: "bar",
            data: [mData[id][m].RewardBlock.RewardTrial, mData[id][m].LossBlock.RewardTrial],
            label:"Reward Trial",   // legend name 
            fill:false,    // fill areas below line
            borderColor: 'rgba(34, 139, 34, 0.8)',
            backgroundColor: 'rgba(34, 139, 34, 0.8)',
            order: 1,
            categoryPercentage: 0.2,
            barPercentage: 0.3
        }, {   
            type: "bar",
            data: [mData[id][m].RewardBlock.LossTrial, mData[id][m].LossBlock.LossTrial],
            label:"Loss Trial",   // legend name 
            fill:false,    // fill areas below line
            borderColor: 'rgba(255, 79, 0, 0.8)',
            backgroundColor: 'rgba(255, 79, 0, 0.8)',
            order: 1,
            categoryPercentage: 0.2,
            barPercentage: 0.3
        }, { 
            type: "line",
            data: [(mData[id][m].RewardBlock.RewardTrial + mData[id][m].RewardBlock.LossTrial)/2, (mData[id]['m1'].LossBlock.RewardTrial + mData[id]['m1'].LossBlock.LossTrial)/2],
            label:"Block Effect",   // legend name 
            fill:false,    // fill areas below line
            borderColor: '#444',
            backgroundColor: '#444',
            order: 1,
            barPercentage: 0.5
        }, { 
            type: "line",
            data: [(mData[id][m].RewardBlock.RewardTrial + mData[id][m].LossBlock.RewardTrial)/2, (mData[id]['m1'].RewardBlock.LossTrial + mData[id]['m1'].LossBlock.LossTrial)/2],
            label:"Trial Effect",   // legend name 
            fill:false,    // fill areas below line
            borderColor: '#ccc',
            backgroundColor: '#ccc',
            order: 1,
            barPercentage: 0.5
        }]
    }
}

function plotModel1Data(modelDat, id) {
    //console.log(data)
    const dummy_dataset = convertModelData(modelDat, id, 'm1');
    const config = {
        type:"bar",
        data: dummy_dataset,
        options:{
          responsive:true,
          plugins: {
            title: {
                display: true,
                text: 'Model 1 Fit Probability of Switching - Subject (' + id + ')'
                },
            subtitle:{
                display: true,
                text: 'Best Fit Model: ' + modelDat[id]['best_model']
            }
            },
            scales: {
                y:{
                    beginAtZero: true,
                    max:1
                }
            },
        },
      };
    
    const ctx = 'm1_pswitch'; //objChart.getContext(ctx);
    const chart = new Chart(ctx, config);
    return chart
}

function plotModel2Data(modelDat, id) {
    //console.log(data)
    const dummy_dataset = convertModelData(modelDat, id, 'm2');
    const config = {
        type:"bar",
        data: dummy_dataset,
        options:{
          responsive:true,
          plugins: {
            title: {
                display: true,
                text: 'Model 2 Fit Probability of Switching - Subject (' + id + ')'
                },
            subtitle:{
                display: true,
                text: 'Best Fit Model: ' + modelDat[id]['best_model']
            }
            },
            scales: {
                y:{
                    beginAtZero: true,
                    max:1
                }
            },
        },
      };
    
    const ctx = 'm2_pswitch'; //objChart.getContext(ctx);
    const chart = new Chart(ctx, config);
    return chart
}

function plotUpdateModelData(charts, modelDat, id) {
    console.log(modelDat[id]);
    charts[0].options.plugins.title.text = 'Model 1 Fit Probability of Switching - Subject (' + id + ')';
    charts[0].options.plugins.subtitle.text = 'Best Fit Model: ' + modelDat[id]['best_model'];
    charts[0].data = convertModelData(modelDat, id, 'm1');
    charts[0].update()

    charts[1].options.plugins.title.text = 'Model 2 Fit Probability of Switching - Subject (' + id + ')';
    charts[1].options.plugins.subtitle.text = 'Best Fit Model: ' + modelDat[id]['best_model'];
    charts[1].data = convertModelData(modelDat, id, 'm2');
    charts[1].update()
}
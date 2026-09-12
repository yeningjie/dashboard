const statusText = document.getElementById('status');
const cardContainer = document.getElementById('cards');

statusText.textContent = "加载中...";

fetch('data/consume.json')
.then(res => {
    if(!res.ok) throw new Error("读取json失败");
    return res.json();
})
.then(data => {
    statusText.style.display = "none";
    renderCards(data);
    renderPie(data);
    renderLine(data);
})
.catch(err => {
    console.error(err);
    statusText.textContent = "数据加载失败：" + err;
})

function renderCards(data){
    cardContainer.innerHTML = "";
    data.forEach(item => {
        const cardDiv = $(`<div class="card mb-3 p-3 border rounded">
            <h4>${item.name}</h4>
            <p>${item.money} 元</p >
            <p>4个月总消费</p >
        </div>`);
        cardDiv.click(function(){
            $(this).toggleClass("card-highlight");
        })
        cardContainer.appendChild(cardDiv[0]);
    })
}

// 饼图（第二步保留）
function renderPie(data){
    const pieDom = document.getElementById('pie-chart');
    const myChart = echarts.init(pieDom);
    const pieData = data.map(item=>({name:item.name, value:item.money}));
    const option = {
        title:{text:"消费分类占比"},
        series: [{
            type: 'pie',
            radius:'60%',
            data: pieData
        }]
    };
    myChart.setOption(option);
}

// 新增：第三步折线图
function renderLine(data){
    const lineCanvas = document.getElementById("trend-chart");
    const ctx = lineCanvas.getContext('2d');
    const labels = ["1月","2月","3月","4月"];
    const datasets = data.map(item =>{
        return {
            label: item.name,
            data: [item.money*0.2, item.money*0.3, item.money*0.25, item.money*0.25],
            borderWidth:2,
            fill:false
        }
    })
    new Chart(ctx,{
        type:"line",
        data:{
            labels:labels,
            datasets:datasets
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                title:{display:true,text:"月度消费趋势"}
            }
        }
    })
}
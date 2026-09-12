// 获取页面元素
const statusText = document.getElementById('status');
const cardContainer = document.getElementById('cards');

// 页面加载，显示加载提示
statusText.textContent = "加载中...";

// 读取本地json数据
fetch('data/consume.json')
.then(res => res.json())
.then(data => {
    statusText.style.display = "none";
    renderCards(data);
    renderPie(data);
})
.catch(err => {
    statusText.textContent = "数据加载失败";
    console.error(err);
})

// 渲染卡片
function renderCards(data){
    data.forEach(item => {
        const cardDiv = $(`<div class="card">
            <h4>${item.name}</h4>
            <p>${item.money} 元</p >
            <p>4个月总消费</p >
        </div>`);
        // 点击卡片高亮
        cardDiv.click(function(){
            $(this).toggleClass("card-highlight");
        })
        cardContainer.appendChild(cardDiv[0]);
    })
}

// 新增：渲染饼图（第二步核心新增代码）
function renderPie(data){
    const pieDom = document.getElementById('pie-chart');
    const myChart = echarts.init(pieDom);
    const pieData = data.map(item=>{
        return {name:item.name, value:item.money}
    })
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

// 折线图暂时还是空函数，第三步再写
function renderLine(){}
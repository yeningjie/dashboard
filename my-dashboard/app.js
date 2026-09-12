const state = { data: null };

let pieChart = null;
let trendChart = null;

// 饼图 第2次提交实现，现在占位
const renderPieChart = () => {};
// 折线图 第3次提交实现，现在占位
const renderTrendChart = () => {};

const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    const resp = await fetch('data/consume.json');
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();

    if(data.series.length === 0){
      $('#status').text('暂无数据').show();
      return;
    }

    state.data = data;
    $('#sub-title').text(data.title + "｜数据来源：" + data.source);
    $('#status').hide();

    renderCards(data);
    renderPieChart(data);
    renderTrendChart(data);
  } catch (err) {
    $('#status').text("加载失败：" + err.message).show();
  }
};

const renderCards = (data) => {
  $('#cards').empty();
  data.series.forEach(item=>{
    const total = item.counts.reduce((sum,val)=>sum+val,0);
    $('#cards').append(`
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title h6">${item.category}</h5>
            <p class="card-text fs-4">${total} 元</p >
            <p class="small text-muted">4个月总消费</p >
          </div>
        </div>
      </div>
    `);
  })
};

// jQuery交互：点击卡片切换高亮样式
$('#cards').on('click','.card',function(){
  $(this).toggleClass('card-highlight');
});

window.addEventListener('resize',()=>{
  if(pieChart) pieChart.resize();
});

loadData();
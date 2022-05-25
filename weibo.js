const _config = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
  },
  hotListUrl: "https://weibo.com/ajax/side/hotSearch",
};
// 过滤数据
async function filterData(data) {
  // 去除商业投放 & 推荐热搜
  const realData = data.filter((item) => item.realpos >= 0);
  // 获取需要的字段
  const mapData = realData.map((item) => {
    return {
      rank: item.realpos,
      content: item.note,
      label_name: item.icon_desc,
      label_color: item.icon_desc_color,
      word_scheme: item.word_scheme,
    };
  });
  return mapData;
}
// if (config.runsInWidget) {
initWidget();
// }
// 初始化 组件
async function initWidget() {
  // 获取数据
  const data = await getHotListData();
  const dataWeNeed = await filterData(data.data.realtime);
  // 创建组件
  const widget = new ListWidget();
  const imgURL =
    "https://www4.bing.com/th?id=OHR.ZebraEgret_ZH-CN8497454146_1920x1080.jpg&rf=LaDigue_1920x1080.jpg";
  const imgReq = new Request(imgURL);
  const img = await imgReq.loadImage();
  widget.backgroundImage = img;

  const stack = widget.addStack();
  stack.url = "#";
  stack.addSpacer(5);
  // 添加主标题
  let main_title = stack.addText("微博热搜");
  main_title.textColor = new Color("#fff");
  main_title.font = new Font("PingFang SC", 20);
  for (i = 0; i < 4; i++) {
    let w_text = widget.addText(
      `${dataWeNeed[i].rank}.${dataWeNeed[i].content}`
    );
    w_text.textColor = new Color("#fff");
    w_text.font = new Font("PingFang SC", 14);
    // 编码 scheme
    let encodeScheme = encodeURIComponent(dataWeNeed[i].word_scheme);
    let link = `https://s.weibo.com/weibo?q=${encodeScheme}&topic_ad=`;
    w_text.url = link;
  }
  // 展示组件
  Script.setWidget(widget);
}

// 获取热搜数据
async function getHotListData() {
  let req = new Request(_config.hotListUrl);
  req.headers = _config.headers;
  return req.loadJSON();
}

async function getBgImgFromBing() {}

// // 添加渐变色背景
// const gradient = new LinearGradient();
// gradient.locations = [0, 1];
// gradient.colors = [new Color("#e76766"), new Color("#d52c2b")];
// widget.backgroundGradient = gradient;

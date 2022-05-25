// ios 微博热搜组件

const _config = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
  },
  hotListUrl: "https://weibo.com/ajax/side/hotSearch",
  bingUrl: "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
  icon_url: "https://scriptable.oss-cn-shanghai.aliyuncs.com/img/weibo.png",
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
  // 获取背景图
  const imgData = await getBackUrlFromBing();
  const imgURL = `https://cn.bing.com${imgData.images[0].url}`;
  // console.log(imgURL);
  const imgReq = new Request(imgURL);
  const img = await imgReq.loadImage();
  widget.backgroundImage = img;

  const stack = widget.addStack();
  // 添加微博的图标
  let icon = stack.addImage(Image.fromData(await load_image(_config.icon_url)));
  icon.imageSize = new Size(20, 20);

  // 增加icon和标题的间距  px
  stack.addSpacer(5);

  // 添加主标题
  let main_title = stack.addText("微博热搜");
  main_title.textColor = new Color("#fff");
  main_title.font = Font.boldSystemFont(20);

  // 垂直居中
  stack.centerAlignContent();

  for (i = 0; i < 5; i++) {
    let w_text = widget.addText(
      `${dataWeNeed[i].rank}.${dataWeNeed[i].content}`
    );
    w_text.textColor = new Color("#fff");
    w_text.font = new Font("PingFang SC", 14);
    // 编码 scheme
    let encodeScheme = encodeURIComponent(dataWeNeed[i].word_scheme);
    let link = `https://s.weibo.com/weibo?q=${encodeScheme}&topic_ad=`;
    w_text.url = link;
    // 绘制分割线
    let context = new DrawContext();
    context.size = new Size(width, h);
    context.opaque = false;
    context.respectScreenScale = true;
    context.setFillColor(new Color("#48484b", 1));
    let path = new Path();
    path.addRoundedRect(new Rect(0, 0, width, h), 3, 2);
    context.addPath(path);
    context.fillPath();
    context.setFillColor(new Color("#373737", 1));
    // 添加分割线
    list.addImage(context.getImage());
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

// 获取 bing 图片
async function getBackUrlFromBing() {
  let req = new Request(_config.bingUrl);
  // 允许不安全的请求
  req.allowInsecureRequest = true;
  req.headers = _config.headers;
  return req.loadJSON();
}

// 获取图片流
async function load_image(url) {
  let req = new Request(url);
  req.headers = _config.headers;
  return req.load();
}

// // 添加渐变色背景
// const gradient = new LinearGradient();
// gradient.locations = [0, 1];
// gradient.colors = [new Color("#e76766"), new Color("#d52c2b")];
// widget.backgroundGradient = gradient;

// 1、format，非必要。我理解为输出格式，不存在或者不等于js，即为xml格式，等于js时，输出json格式。
// 2、idx，非必要。不存在或者等于0时，输出当天的图片，-1为已经预备用于明天显示的信息，1则为昨天的图片，idx最多获取到之前16天的图片信息。
// 3、n，必要。这是输出信息的数量，比如n=1，即为1条，以此类推，至多输出8条
// 参考: https://blog.csdn.net/y1534414425/article/details/107513880

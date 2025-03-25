(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".map .chart"));
  // 实例化返回全国的按钮，以便后边做点击事件监听
  const backBtn = document.getElementById('back-btn');
  // 记录当前选择的地图
  currentMapLevel = 'china';
  // 2. 指定配置和数据
  // 2. 指定配置和数据
  //城市坐标
  //城市坐标
  var geoCoordMap = {
    // 华北地区
    石家庄: [114.4995, 38.1006], // 河北省
    太原: [112.5495, 37.8568],   // 山西省
    呼和浩特: [111.6508, 40.8183], // 内蒙古自治区
    北京: [116.4053, 39.9042],   // 北京市
    天津: [117.2000, 39.1333],   // 天津市
    
    // 东北地区
    沈阳: [123.4299, 41.7966],   // 辽宁省
    长春: [125.3245, 43.8170],   // 吉林省
    哈尔滨: [126.6424, 45.8034], // 黑龙江省
    
    // 华东地区
    南京: [118.7969, 32.0606],   // 江苏省
    杭州: [120.1551, 30.2741],   // 浙江省
    合肥: [117.2766, 31.8649],   // 安徽省
    福州: [119.3063, 26.0751],   // 福建省
    南昌: [115.8923, 28.6765],   // 江西省
    济南: [117.0009, 36.6758],   // 山东省
    
    // 华中地区
    郑州: [113.6654, 34.7579],   // 河南省
    武汉: [114.3054, 30.5931],   // 湖北省
    长沙: [113.0000, 28.2000],   // 湖南省
    
    // 华南地区
    广州: [113.2644, 23.1291],   // 广东省
    南宁: [108.3200, 22.8240],   // 广西壮族自治区
    海口: [110.3511, 20.0319],   // 海南省
    
    // 西南地区
    成都: [104.0665, 30.5723],   // 四川省
    贵阳: [106.7135, 26.5783],   // 贵州省
    昆明: [102.8326, 24.8801],   // 云南省
    拉萨: [91.1322, 29.6603],    // 西藏自治区
    
    // 西北地区
    西安: [108.9398, 34.2676],   // 陕西省
    兰州: [103.8235, 36.0611],   // 甘肃省
    西宁: [101.7789, 36.6232],   // 青海省
    银川: [106.2782, 38.4664],   // 宁夏回族自治区
    乌鲁木齐: [87.6168, 43.8256], // 新疆维吾尔自治区

    上海: [121.4648, 31.2891],
    重庆: [107.7539, 30.1904],
    
    // 特别行政区
    香港: [114.1747, 22.3200],   // 香港特别行政区
    澳门: [113.5491, 22.1987],   // 澳门特别行政区
    
    // 台湾省
    台北: [121.5091, 25.0428]    // 台湾省
};
// 创建省份名称到省会城市的映射
var provinceToCapital = {
  '安徽': '合肥',
  '河北': '石家庄',
  '山西': '太原',
  '内蒙古': '呼和浩特',
  '辽宁': '沈阳',
  '吉林': '长春',
  '黑龙江': '哈尔滨',
  '江苏': '南京',
  '浙江': '杭州',
  '福建': '福州',
  '江西': '南昌',
  '山东': '济南',
  '河南': '郑州',
  '湖北': '武汉',
  '湖南': '长沙',
  '广东': '广州',
  '广西': '南宁',
  '海南': '海口',
  '四川': '成都',
  '贵州': '贵阳',
  '云南': '昆明',
  '西藏': '拉萨',
  '陕西': '西安',
  '甘肃': '兰州',
  '青海': '西宁',
  '宁夏': '银川',
  '新疆': '乌鲁木齐',
  '台湾': '台北',
  '北京': '北京',
  '天津': '天津',
  '上海': '上海',
  '重庆': '重庆',
  '香港': '香港',
  '澳门': '澳门'
};

var XAData = [
  // 华北地区
  [{ name: "石家庄", value: 100, img: 'hb', url: 'http://wglj.sjz.gov.cn/' }],
  [{ name: '太原', value: 100, img: 'sx', url: 'https://wlj.taiyuan.gov.cn/p198/index.html' }],
  [{ name: '呼和浩特', value: 100, img: 'nm', url: 'https://wap.lotsmall.cn/vue/?m_id=192' }],
  [{ name: "北京", value: 100 ,img:'bj',url:'https://www.visitbeijing.com.cn/'}],
  [{ name: "天津", value: 100 ,img:'tj' ,url:'https://whly.tj.gov.cn/'}],
  // 东北地区
  [{ name: "沈阳", value: 100, img: 'ln', url: 'https://shenyang.jianggupiao.com'}],
  [{ name: "长春", value: 100, img: 'jl', url: 'https://changchun.527uu.net/changchun'}],
  [{ name: "哈尔滨", value: 100, img: 'hlj', url: 'http://www.ctsqx.com/lines/xuexianglvyou/#bd?bd_vid=7397327288139877566' }],
  // 华东地区
  [{ name: "南京", value: 100, img: 'js', url: 'http://www.njlyw.cn/websitenew/web'}],
  [{ name: "杭州", value: 100, img: 'zj', url: 'https://travel.hangzhou.com.cn'}],
  [{ name: "合肥", value: 100, img: 'ah', url: 'http://www.wehefei.com/list/n_59.htm'}],
  [{ name: "福州", value: 100, img: 'fj', url: 'http://wlj.fuzhou.gov.cn' }],
  [{ name: "南昌", value: 100, img: 'jx', url: 'https://www.nanchanglvyou.com' }],
  [{ name: "济南", value: 100, img: 'sd', url: 'http://jnwl.jinan.gov.cn' }],
  // 华中地区
  [{ name: "郑州", value: 100, img: 'hn', url: 'https://zhengzhou.cncn.com' }],
  [{ name: "武汉", value: 100, img: 'hb', url: 'https://www.wuhan.gov.cn/zjwh/whly/index_2.shtml' }],
  [{ name: "长沙", value: 100, img: 'hn2', url: 'http://wlgd.changsha.gov.cn/' }],
  // 华南地区
  [{ name: "广州", value: 100, img: 'gd', url: 'https://www.gz.gov.cn/zlgz/gzly/index.html' }],
  [{ name: '南宁', value: 100, img: 'gx', url: 'https://wgl.nanning.gov.cn/' }],
  [{ name: "海口", value: 100, img: 'hn3', url: 'http://lwj.haikou.gov.cn/' }],
  // 西南地区
  [{ name: "成都", value: 100, img: 'sc', url: 'https://www.ctscd.com/?bd_vid=7719142239128996699' }],
  [{ name: "贵阳", value: 100, img: 'gz', url: 'https://www.gywb.cn/shenghuo/lvyou/index_m.shtml' }],
  [{ name: "昆明", value: 100, img: 'yn', url: 'https://whhlyj.km.gov.cn/' }],
  [{ name: "拉萨", value: 100, img: 'xz', url: 'https://lyw.xizang.gov.cn/active-lyzx.html' }],
  // 西北地区
  [{ name: "西安", value: 100, img: 'sx1', url: 'https://www.lgh.yyzxnsj.cn/category/%e8%a5%bf%e5%ae%89%e7%89%b9%e8%89%b2' }],
  [{ name: "兰州", value: 100, img: 'gs', url: 'http://wlj.lanzhou.gov.cn/' }],
  [{ name: "西宁", value: 100, img: 'qh', url: 'http://www.qhxnw.com/xnly/index.shtml' }],
  [{ name: "银川", value: 100, img: 'nx', url: 'https://www.nxtour.com.cn/' }],
  [{ name: "乌鲁木齐", value: 100, img: 'xj', url: 'https://www.xjlxw.com/s/wlmq' }],


  [{ name: "上海", value: 100  ,img:'sh',url:'http://www.962020.com/cmp_index.ac'}],
  [{ name: "重庆", value: 100, img: 'cq', url: 'http://www.cq.travelnet.cc/' }],
 
  // 特别行政区
  [{ name: "香港", value: 100, img: 'hk', url: 'https://www.discoverhongkong.cn/index.html' }],
  [{ name: "澳门", value: 100, img: 'am', url: 'https://www.macaotourism.gov.mo/zh-hans/' }],
  // 台湾省
  [{ name: "台北", value: 100, img: 'tw', url: 'https://www.travel.taipei/' }],
];

  var color = ["#ffa022", "#ffa022", "#46bee9"]; //定位颜色
  var series = [];
  [
    ["北京", XAData],
  ].forEach(function(item, i) {
    series.push(
      {
        name: item[0] + " Top3",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{b}",
          }
        },
        symbolSize: function(val) {
          return val[2] / 10;
        },
        itemStyle: {
          normal: {
            color: color[i]
          },
          emphasis: {
            areaColor: "#2B91B7"
          }
        },
        data: item[1].map(function(dataItem) {
          return {
            name: dataItem[0].name,
            value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
            url:dataItem[0].url,
            img:dataItem[0].img,
          };
        })
      }
    );
  });
  var option = {
    tooltip: {
      trigger: 'item', // 触发类型，这里仍然是'item'
      formatter: function(params, ticket, callback) {
          var imgSrc = params.data.img ? params.data.img + '.jpg' : 'default_image.jpg'; // 如果没有 img，则使用默认图片
          // 根据 seriesType 或其他条件来定制内容
          if (params.seriesType == "effectScatter") {
              return "<img src='./img/sf/"+imgSrc+"' style='width:60px;height:60px;'/>"
          } else if (params.seriesType == "lines") {
              return "<img src='./img/sf/"+imgSrc+"' style='width:60px;height:60px;'/>"
          } else {
              return "<img src='./img/sf/"+imgSrc+"' style='width:60px;height:60px;'/>"
          }
      }
    },

    geo: {
      map: "china",
      label: {
        emphasis: {
          show: true,
          color: "#fff"
        }
      },
      roam: false,
      //   放大我们的地图
      zoom: 1.2,
      itemStyle: {
        // normal: {
        //   areaColor: "rgba(43, 196, 243, 0.42)",
        //   borderColor: "rgba(43, 196, 243, 1)",
        //   borderWidth: 1
        // },
        emphasis: {
          areaColor: "#2B91B7"
        },
        normal: {
          // 地图省份的背景颜色
          areaColor: "rgba(20, 41, 87,0.6)",
          borderColor: "#195BB9",
          borderWidth: 1
        },
      }
    },
    series: series
  };
  // 应用配置
  myChart.setOption(option);

  // 这个是点击地图快跳转用到的
  // 创建省份名称到URL的映射
  var provinceUrlMap = {};
  XAData.forEach(function(item) {
    provinceUrlMap[item[0].name] = item[0].url;
  });


  // 地图监听点击事件
  myChart.on('click', function(params) {
    // 检查点击的是否是effectScatter系列的数据点
    var url;
    if (params.seriesType === 'effectScatter' && params.data && params.data.url) {
      url = params.data.url;
    } else if (params.name && provinceUrlMap[provinceToCapital[params.name]]) {
      // 点击地图块做的事件处理
      loadProvinceMap(params.name);
      // url = provinceUrlMap[provinceToCapital[params.name]];
    }
    if (url) {
      window.open(url, '_blank');
    }
  });

  // 加载省级地图
  function loadProvinceMap(provinceName) {
    currentMapLevel = 'province';

    const option = {
      backgroundColor: '#F5F5F5',
      title: {
        text: `${provinceName}地图`,
        left: 'center'
      },
      series: [{
        name: provinceName,
        type: 'map',
        map: provinceName,
        label: {
          show: true,
          fontSize: 12
        },
        itemStyle: {
          areaColor: '#fff',
          borderColor: '#999'
        },
        emphasis: {
          itemStyle: {
            areaColor: '#b4d7f3'
          },
          label: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        }
      }]
    };
    myChart.setOption(option, true);
    // 给返回全国按钮添加样式，用来显示按钮
    backBtn.style.display = 'block';
    // myChart.style.background = `url(../img/bg.jpg) no-repeat #000`;
  };
  // 返回全国地图按钮监听事件
  backBtn.addEventListener('click', function() {
    if (currentMapLevel === 'province') {
      currentMapLevel = 'china';
      myChart.setOption(option, true);
      // 给返回全国按钮添加样式，用来隐藏按钮
      backBtn.style.display = 'none';
    }
  });

  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

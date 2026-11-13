// 第十一届上午 · 区域发展布局制图 —— 解析摘录
export const note = "来源：微信公众号“小火苗GIS”系列解析文章（全国大学生GIS技能大赛 · 第十一届上午题）。解析操作基于 ArcGIS 桌面版（文件地理数据库、合并/融合工具、地理配准、编辑器矢量化、拓扑检查、符号属性编辑器、标注表达式等），原文未注明具体软件版本。#非官方答案，仅代表作者个人观点#"
export const overview = [
  { "text": "题目要求", "heading": true },
  { "text": "我们需要制作一幅广西区域发展布局示意图，最终成图参考“数据”文件夹中的广西区域发展布局示意图.png。地图使用的投影坐标系是 Asia_North_Albers_Equal_Area_Conic，其中地理坐标系是 CGCS2000，中央经线东经105°，标准纬线是北纬25°和北纬47°，出图比例尺1:4,780,000。" },
  { "text": "数据说明", "heading": true },
  { "text": "1.广西区域发展布局示意图.png：参考地图。\n2.中国地图 1000 万.jpg：参考地图。\n3.E48、E49、E50、F48、F49、F50、G48、G49、G50 文件夹：1:100 万公众版基础地理信息数据（2021）中的部分分区数据。数据组织见下表。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35t8LiaV7YjF9Lxb3LJoAWIHXWaRt0tUABpZpRKFmq9Llq9JgOZLHeUDg/640?wx_fmt=png" },
  { "text": "赛题总结", "heading": true },
  { "text": "(1) 本赛题主要倾向于对点线面数据的基础操作的考察，涵盖了数据库的“巧妙运用”、拓扑检查、字段计算器以及查询等，还有标注显示等，考点较为全面，题量相对不小。\n(2) 基于传统而又有创新，有很多坑也是作者在比赛中遇到的，夯实基础，才能“见招拆招”，希望能有所启发。" }
]
export const stepBlocks = [
  [
    { "text": "一、创建数据库，整合数据入库", "heading": true },
    { "text": "1. 创建数据库并导入要素类", "heading": true },
    { "text": "首先，新建“中间数据库.gdb”，然后将数据导入至新建数据库中（如果未对数据进行导入，在进行合并操作时会由于数据名称进行报错，而数据库能对重复名称进行自动重命名）。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35xicrGfJyWfHgdugxicMZic6GXg3ibBkF4MaLrW0PeZzLMGeEWt6ZcylGJQ/640?wx_fmt=png" },
    { "text": "2. 合并数据", "heading": true },
    { "text": "选择【合并】工具分别对 AGNP（点数据）、BOUA（线数据）、BOUL（面数据），输出结果分别为“行政地名点”、“行政境界线”和“行政境界面”。合并结果如下：", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35Peb9ZPLet3So23dcRmwvMA9ibj9svWEFMXa2uK4X66oTSic26v3RhAnQ/640?wx_fmt=png" },
    { "text": "3. 环境设置", "heading": true },
    { "text": "因为后续操作均需在题目要求的坐标系下进行，所以在环境中设置坐标系为题目要求的坐标系以进行后续操作。右击 Asia_North_Albers_Equal_Area_Conic 坐标系，选择【复制并修改】，将中央经线、标准纬线和地理坐标系设置与题目要求相同。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35vOj4XlOyD3kK9lLibic0wdIDY8V8O2sClaWZNvVslOOjjSrla3hjBaRA/640?wx_fmt=png" },
    { "text": "4. 融合相同行政区", "heading": true },
    { "text": "PAC 字段的区分在于，前两位的编码相同，则代表同一个省级行政区。所以，首先通过字段计算器工具，进行计算处理得到 PAC 值的前两位。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35XW48cTRZXUObJAox947Jx6wzrHBQE7ZFOKia2opG2tO7n2lFmmM6Tdg/640?wx_fmt=png" },
    { "text": "选择【融合】工具，根据 PAC 字段进行融合，得到合并后的省级行政区划。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE355xggKutPqnFcgstrNZqMbsOhWYfgmicPwaYibJWKOCfROXjiaWHh6uBcQ/640?wx_fmt=png" },
    { "text": "5. 导出并删除海洋区域", "heading": true },
    { "text": "由于海洋 PAC1 值为 25，在融合后的数据中选择海洋部分导出，并在行政境界面数据中将海洋数据删除。" },
    { "text": "6. 检查拓扑错误并修改", "heading": true },
    { "text": "对行政境界面数据进行拓扑检查。在“中间数据库”下新建要素数据集“拓扑”。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35sCwT7ObjLUzyZEj5koFWtZofSsVRoFNy8Lx0sicUsV2ddKR0a2wfMfQ/640?wx_fmt=png" },
    { "text": "考虑到对面要素进行拓扑检查，设置拓扑规则主要为“不能有空隙”、“不能重叠”。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35qOIpK9ARZdwnRrza890OOwnHJMazW6366Un8HZEt0fZJmSQiaxUXkhw/640?wx_fmt=png" },
    { "text": "题目要求修改一种拓扑错误，作者针对重叠错误进行了修改。该问题普遍出现在行政区间的边界地区，打开【编辑器】，在编辑状态下进行拓扑纠错，右击错误图层进行合并处理。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35gYbdrczMJVjicZewxAic04c4IwNy0Z8HfStY870zCsjKnVkmIYLgynQQ/640?wx_fmt=png" }
  ],
  [
    { "text": "二、处理行政境界面数据", "heading": true },
    { "text": "1. 新建数据库", "heading": true },
    { "text": "右键【新建】|【文件地理数据库】，命名为广西区域发展.gdb，如图所示。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35lS3j1OMkKSicc1zeUUlgl8FblB39BarqJN3CWbO72ibSdxBIs5PywYZQ/640?wx_fmt=png" },
    { "text": "2. 地理配准", "heading": true },
    { "text": "在菜单栏中，打开【自定义】|【工具条】|【地理配准】工具，添加控制点进行校正，如图所示。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35muGiaZgkLNaRAQQPIQa8l7PopVJm3R5icDnydexxRfj37K2n5qZnKlkQ/640?wx_fmt=png" },
    { "text": "3. 矢量化采集", "heading": true },
    { "text": "在菜单栏中，打开【编辑器】，开始编辑，进行矢量化，最终矢量化结果如图所示。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35LeRm36sDO23jIgrXhQsBiadYIam5jXib6ErHMEKKx6LsLrfeODrn0iaXQ/640?wx_fmt=png" },
    { "text": "4. 提取国外区划数据与广西行政区划数据", "heading": true },
    { "text": "参照海洋数据提取办法。" },
    { "text": "5. 符号化显示", "heading": true },
    { "text": "根据题目所给的颜色对各面要素进行符号化。" }
  ],
  [
    { "text": "三、处理行政境界线数据", "heading": true },
    { "text": "1. 按 GB 字段融合", "heading": true },
    { "text": "在菜单栏中打开【融合】工具，对合并后的线要素按 GB 字段进行融合，如图所示。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35ib1K7T0XsrzbYChew4nExqibbDRQTk6ElOd5BPKm8GAJ4yelxyN63yYQ/640?wx_fmt=png" },
    { "text": "2. 添加类型字段", "heading": true },
    { "text": "在属性表中添加文本型类型字段，根据 GB 码对各要素添加类型字段。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35cZMVXO3EFPZaZGOudQJzur9ZI1M0RKfCSiaVWibxYKV0NLb0KSBTntrg/640?wx_fmt=png" },
    { "text": "3. 新建符号", "heading": true },
    { "text": "以行政区界线为例：打开【符号属性编辑器】，选择制图线符号，新建一个线图层，并调整线模板。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35IZ3ZticEteQKJaIEkR4ZPpOxyrIaqU4Cxq2TpWVH0PDp2XGOgpg00bg/640?wx_fmt=png" },
    { "text": "线模板（符号模板）设置如图：", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE354ibeibTpWO23b4yvhuEpZbxAFPx5UM4PMuP3KB8tBBOhBJcb83Ly7b6g/640?wx_fmt=png" },
    { "text": "添加渲染色带图，调整颜色、宽度、线连接方式等，调整图层顺序，完成符号新建。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35PhzuCud90yApiarnRU83j23eibntqjN7a94CClXb736Fn1n9AiaYmib4kg/640?wx_fmt=png" },
    { "text": "4. 符号化显示", "heading": true },
    { "text": "双击图层打开属性对话框，在【符号系统】中设置按类型字段唯一值进行显示，设置新建的符号。", "image": "https://mmbiz.qpic.cn/mmbiz_jpg/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35bDpJBgjSNUaq7uyvuk1K9jEktZc3v9OMufINwKQAkaPe2ZUtCibrfjg/640?wx_fmt=jpeg" }
  ],
  [
    { "text": "四、处理各级行政地名点数据", "heading": true },
    { "text": "1. 提取省级行政区中心和设区行政中心", "heading": true },
    { "text": "使用【按属性选择】工具，设置其选择字段为 NAME，进行模糊查询，表达式如下：", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35x6HeVAnTOmoupxQkLwmlITCice1502LmjK8Nlqpvq1VZHEvY1Gvdibng/640?wx_fmt=png" },
    { "text": "将省级行政区中心和设区行政中心数据导出至数据库。" },
    { "text": "2. 添加标注", "heading": true },
    { "text": "右击行政中心数据，设置标注，设置其标注表达式为：Replace( [NAME],\"市\",\"\")（Replace 原理为选择需要进行替代的字段，选择需要替代的值，选择替代后的值）。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1eWvfmSgmV54nAsqQ9hoE35m0fbjNLLWDvjV88icxsLoiaHHJibGtTnOKUyjcjAEC2OdYdfOxNShnSPQ/640?wx_fmt=png" }
  ],
  [
    { "text": "五、绘制箭头", "heading": true },
    { "text": "1. 数字化箭头形状", "heading": true },
    { "text": "为添加箭头符号，新建要素进行数字化。" },
    { "text": "2. 新建箭头符号", "heading": true },
    { "text": "原文未展开此部分的具体操作，作者表示将另行单独撰文介绍箭头符号的新建方法。" }
  ],
  [
    { "text": "六、地图制图", "heading": true },
    { "text": "添加图例、标注、比例尺、指北针、图名等地图要素后导出地图。" }
  ]
]

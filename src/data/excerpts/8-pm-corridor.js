// 第八届下午 · 生态廊道与最小累积成本 —— 解析摘录
export const note = "来源：CSDN 博客《ArcGIS——第八届全国 GIS 应用技能大赛（下午）》。解析操作基于 ArcMap 10.2；作者声明：由于 10.2 版本问题，解题过程中存在着诸多问题，具体思路参考中科培训中心。原文文字较简、以操作截图为主，本摘录中部分工具参数（如值字段 BUFF_DIST/TYPE、输出数据名称等）摘自截图内容。#非官方答案，仅代表作者个人观点#"
export const overview = [
  { "text": "题目背景与要求", "heading": true },
  { "text": "动物需要在不同的森林公园之间迁徙交流，在经过不同的地表时，动物迁徙的困难程度是不一样的，如经过草地林地比较容易，而经过水域和道路时则比较困难。在不同的公园之间构建生态廊道，保护动物的迁徙。" },
  { "text": "一、数据说明（见“下午 C 分析数据”文件夹）", "heading": true },
  { "text": "研究区影像.tif：研究区的遥感影像数据。\n高速公路.shp：高速公路线数据。\n市区道路.shp：市区道路线数据。\n铁路.shp：铁路线数据。\n河流.shp：河流面数据。\n森林公园.shp：两个森林公园点数据。\n训练样本.shp：监督分类使用的训练样本数据。" },
  { "text": "二、要求", "heading": true },
  { "text": "1. 影像分类：使用提供的训练样本进行监督分类，具体的监督分类方法任选。（10 分）" },
  { "text": "2. 创建生态廊道保护物种迁徙：（50 分）" },
  { "text": "找出从辰山植物园到阳山森林公园之间动物迁徙所花费成本最低的路线，规划部门将在这个路径上修建生态廊道，以保护动物在两个森林公园之间迁徙。动物在迁徙过程中，在经过不同的地表时，困难程度是不一样的，经过不同地物的成本值见下表。" },
  { "text": "注：水域和交通用地参考已有的矢量数据，其他参考遥感影像。道路线数据的影响范围见下表缓冲距离。所有最终结果数据，包括最终的阻力成本表面栅格、最短路线数据、总成本值等。" },
  { "text": "经过不同地物的成本值（阻力取值表）：\n交通道路 —— 市区道路（15m 缓冲）：150；高速公路（20m 缓冲）：200；铁路（30m 缓冲）：300\n遥感影像分类 —— 建筑：150；裸地：10；林地：5；耕地：50；草地：5\n水域 —— 河流：80" }
]
export const stepBlocks = [
  [
    { "text": "1、影像分类", "heading": true },
    { "text": "版本问题：栅格影像与矢量数据不一致，先进行空间校正操作（在空间校正中选择校正以下图层中的所有要素：森林公园、市区道路、高速公路、训练样本）。", "image": "https://i-blog.csdnimg.cn/blog_migrate/6a4a43522bbda1b7f02d108e7e7e475f.png" },
    { "text": "在训练样本管理器中添加样本数据，并修改其值（类别为林地、草地、耕地、建筑物、裸地）。监督分类的输出结果为 Classification_研究区影像.tif，用于后续重分类。", "image": "https://i-blog.csdnimg.cn/blog_migrate/e0300391cb9fa6b8a4d1e4f3590e6bf4.png" }
  ],
  [
    { "text": "2、交通道路", "heading": true },
    { "text": "【分析工具】→【邻域分析】→【缓冲区】：对市区道路做 15 米缓冲（距离 15，输出 市区15m.shp，侧类型 FULL、端类型 ROUND）。", "image": "https://i-blog.csdnimg.cn/blog_migrate/f29482c415ec4be1b526ab56f65d8262.png" },
    { "text": "【转换工具】→【转为栅格】→【面转栅格】：将市区道路 15m 缓冲面转为栅格，值字段 BUFF_DIST，像元分配类型 CELL_CENTER。", "image": "https://i-blog.csdnimg.cn/blog_migrate/44bbe4081dec2c647e14dfbedc96bf00.png" },
    { "text": "【Spatial Analyst工具】→【重分类】：将市区道路 15m 缓冲栅格重分类赋阻力值 150，输出【市区道路15m重分类】。", "image": "https://i-blog.csdnimg.cn/blog_migrate/c6207b86a6d632fe620f12321d51ffec.png" },
    { "text": "同理得【高速公路20m重分类】（20m 缓冲，阻力值 200）、【铁路30m重分类】（30m 缓冲，阻力值 300）。" },
    { "text": "4、河流", "heading": true },
    { "text": "河流面数据转为栅格：【转换工具】→【转为栅格】→【面转栅格】，值字段 TYPE，像元分配类型 CELL_CENTER。", "image": "https://i-blog.csdnimg.cn/blog_migrate/316461e72917e559a8c50477473621a9.png" },
    { "text": "对河流栅格进行【Spatial Analyst工具】→【重分类】，赋阻力值 80，输出【河流重分类】。", "image": "https://i-blog.csdnimg.cn/blog_migrate/2c2416e95318106bba025dfab29d972b.png" }
  ],
  [
    { "text": "3、遥感影像分类（分类结果赋阻力值）", "heading": true },
    { "text": "对监督分类结果 Classification_研究区影像.tif 进行【Spatial Analyst工具】→【重分类】，将各地类赋阻力值：林地 5、草地 5、耕地 50、建筑物 150、裸地 10，输出【遥感影像分类】（即 reclass 影像）。", "image": "https://i-blog.csdnimg.cn/blog_migrate/05f70f043d774abc2f09f1514f6ee387.png" },
    { "text": "5、镶嵌", "heading": true },
    { "text": "a）先将三个 reclass 道路镶嵌到一起，镶嵌运算符选择 MAXIMUM（输入：市区道路15m重分类、高速公路20m重分类、铁路30m重分类；输出【交通道路】）。", "image": "https://i-blog.csdnimg.cn/blog_migrate/273d09cf699c8eb0dcdfae16cbf7106e.png" },
    { "text": "b）然后 reclass 影像与 reclass 河流镶嵌，镶嵌运算符选择 LAST/FIRST，即重叠区域使用河流的阻力值（输入：遥感影像分类、河流重分类；输出【土地利用类型】）。", "image": "https://i-blog.csdnimg.cn/blog_migrate/d156db445c363e65bb63d49fa55c2f60.png" },
    { "text": "c）最后与 reclass 道路镶嵌，镶嵌运算符选择 MAXIMUM（输入：土地利用类型、交通道路；输出【阻力成本】，即最终阻力成本表面）。", "image": "https://i-blog.csdnimg.cn/blog_migrate/244c6bb12bd6b1e7cddba2d0c3ddb11a.png" },
    { "text": "d）像素类型统一 16_BIT_UNSIGNED 及以上。" }
  ],
  [
    { "text": "6、成本距离、成本路径", "heading": true },
    { "text": "【Spatial Analyst工具】→【距离分析】→【成本距离】" },
    { "text": "森林公园选中其中一个作为源：输入栅格数据或要素源数据为森林公园，输入成本栅格数据为【阻力成本】，输出成本距离栅格和回溯链接（回溯）栅格。", "image": "https://i-blog.csdnimg.cn/blog_migrate/8ed4fea6ef86daee96927bc6efe9de7a.png" },
    { "text": "成本距离计算结果：", "image": "https://i-blog.csdnimg.cn/blog_migrate/05b8d221d001b7ebd2e274d228ed55b6.png" },
    { "text": "【Spatial Analyst工具】→【距离分析】→【成本路径】" },
    { "text": "注：在进行距离路径之前设置【地理处理】→【环境设置】→【处理范围】（至少为）成本距离栅格范围。" },
    { "text": "森林公园再选另一个作为目标：输入栅格数据或要素目标数据为森林公园（目标字段 FID），输入成本距离栅格和回溯栅格，路径类型 EACH_CELL，得到最短路线。", "image": "https://i-blog.csdnimg.cn/blog_migrate/b3a109577f8a9dc51bfd87bb9f329542.png" }
  ],
  [
    { "text": "成果数据与技术文档要求", "heading": true },
    { "text": "步骤：包含数据处理的所有步骤的文档，尽可能附图说明。" },
    { "text": "技术文档：应包括解题思路、解题过程说明和结果等内容。解题过程说明中，请尽可能附图说明。" },
    { "text": "成果数据、文档放置在一个文件夹内，以小组编号命名，放置在一台电脑的 D:\\GISContest 目录下，并在桌面生成一个快捷方式。" }
  ]
]

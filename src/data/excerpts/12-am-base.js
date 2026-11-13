// 第十二届上午 · 江苏基础地理信息整合 —— 解析摘录
export const note = "操作软件：GeoScene Pro 4.0。内容整理自微信公众号解析文章《2023年全国大学生GIS应用技能大赛试题详解（第一题）》（第十二届全国大学生GIS应用技能大赛·上午基础题·江苏基础地理信息整合）。"
export const overview = [
  {
    "text": "先来看上午的基础题，题目原文截图如下："
  },
  {
    "text": "题目原文截图 1/4",
    "image": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/60KZUoSHDiaeibPPPUjIpCIlVxVprz08r9icxjgsicge2ibHGokYDfz7STop6dqIVfgfoMmG5aJrMFBQVwmNrh5y0QA/640?wx_fmt=jpeg"
  },
  {
    "text": "题目原文截图 2/4",
    "image": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/60KZUoSHDiaeibPPPUjIpCIlVxVprz08r9FvwF6zWJy34rvVETOBL88NB7mOkCGR96o2hzUwyqHsFZXwzTrtajxQ/640?wx_fmt=jpeg"
  },
  {
    "text": "题目原文截图 3/4",
    "image": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/60KZUoSHDiaeibPPPUjIpCIlVxVprz08r9RC9NguibbAe5dkia5Jic0jnV5ard7qRG4II6KYmckPMMPrlUp2veqejHw/640?wx_fmt=jpeg"
  },
  {
    "text": "题目原文截图 4/4",
    "image": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/60KZUoSHDiaeibPPPUjIpCIlVxVprz08r93uZsQ2FtDYs9Sg89iaO5pFDSuusF6hSzAQxudcGzPXugK3uLhdZVEvg/640?wx_fmt=jpeg&from=appmsg"
  },
  {
    "text": "今天分享的就是上午这道题的解决方案，目标简述：根据相关基础数据，制作江苏省基础地理信息地图，并叠加若干反映社会发展的专题要素密度图。"
  },
  {
    "text": "整体解决思路",
    "heading": true
  },
  {
    "text": "拿到题之后，我们大概浏览一下，了解题目需求，大致拆分成4块任务：\n1）配准江苏省标准地图；\n2）整合基础矢量数据并入库；\n3）整合 POI 数据并入库；\n4）制作相应地图。"
  },
  {
    "text": "再详细查看题目提供的数据并找到对应的解决策略。这部分的内容大家可以跳过不看，自己先尝试做一下，遇到卡壳的地方再翻回来看解决的思路。"
  },
  {
    "text": "1.1 配准江苏省标准地图",
    "heading": true
  },
  {
    "text": "这一步题目有3项要求，其中构建数据库并保证所有结果数据在数据库中，以及空间参考设为统一，均是对所有数据的统一要求。通常统一要求的条件，需要首先设置。由题可知，数据要求CGCS2000，高斯克吕格 6°投影，中央经线 119。Pro中没有直接提供这个坐标系，需要创建符合要求的坐标系。"
  },
  {
    "text": "再进行手动的图片配准。配准需要有对应的参考矢量依据。题目中本身没有提供现成的江苏省行政区划，需要在第二步中结合已有数据处理后再返回来进行配准。"
  },
  {
    "text": "1.2 整合基础矢量数据并入库",
    "heading": true
  },
  {
    "text": "题目要求整合江苏省各行政境界面、行政境界线、行政境界点、主要水系面、主要水系线、公路、街区共 7 份矢量数据。这7份矢量数据除街区外，均来自100 万公众版基础地理信息数据中的H50、H51、I50、I51 文件夹。需要将同类数据进行合并同时提取江苏省境界范围内的数据。需要注意原始数据的坐标系与题目要求坐标系的区别，进行投影转换。"
  },
  {
    "text": "这一步首要问题是如何获取江苏省境界范围，可以参考题目提供的江苏省各行政境界面数据，打开其属性，其中PAC字段表示行政编码，观察其编码，以32开头的均为江苏省行政区，中间两位编码表示所属地区。使用按属性提取工具将符合条件的数据进行提取，获取江苏省境界矢量范围。"
  },
  {
    "text": "对各行政境界面、行政境界线、行政境界点、主要水系面、主要水系线、公路6类矢量数据，可对同名要素进行融合，合并成同一要素，按照题目添加对应的属性字段。"
  },
  {
    "text": "对街区数据，则需要沿着“江苏省地图政区图.jpg”街区的外轮廓范围进行手动矢量化。"
  },
  {
    "text": "1.3 整合 POI 数据并入库",
    "heading": true
  },
  {
    "text": "这一步需要将包含点位信息的POI表格数据转化成点数据，并改变其投影。"
  },
  {
    "text": "对餐饮POI数据进行清洗，可考虑将点位数据重复的删除；使用模糊查询，筛选与关键字不一致的名称并人工进行排查（例如一点点酒楼）。添加“品牌名称”字段并补充对应的属性。合并不同品牌的POI数据。"
  },
  {
    "text": "为学校POI数据添加“学校类型”和“权重”字段。为了计算“权重”属性，需要使用相交及汇总统计工具，统计地级市幼儿园和小学的数量。再结合江苏省统计年鉴.csv查询地级市人口数量，得到其权重。"
  },
  {
    "text": "1.4 制作相应地图",
    "heading": true
  },
  {
    "text": "制作江苏省人口地图时，需要注意基础要素以及人口要素的可视化效果，题目中没有明确要求特定的符号及标注。该部分要求相对主观，同学们可以根据题目罗列的条件进行优化。例如整体制图风格可以参考江苏省地图政区图，行政境界线绘制时可以参考境界线类型，突出不同类型的境界线对应不同线型等等。"
  },
  {
    "text": "制作公路、餐饮POI、学校POI核密度图时，注意核密度工具的参数设置。"
  },
  {
    "text": "既然是要求制作地图，也就是说该步骤提交的结果为地图图片，还需要记得地图上要有基本的整饰要素。例如比例尺、图例、图名等信息。"
  },
  {
    "text": "整体的操作流程如下：",
    "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xy9IgSiaHvSK4xFz1OdWblssAD0Oicy0CwE5icNEGaf1ficn2XDu2PFBJLkw/640?wx_fmt=png&from=appmsg"
  },
  {
    "text": "总结",
    "heading": true
  },
  {
    "text": "这是一道非常实用的数据处理及可视化的题目，涉及到投影变换、数据组织与管理、数据处理、制图等多个基本GIS操作，重点考察同学们对GIS工具的熟练程度。当然，要想提升比赛的分数，就需要重点考虑数据清洗、制图等方面的细节；在处理数据时，善于总结和分类，才能够快速地判断数据的区分方法（试题中的分类数据来自公众版基础地理信息数据，其分类依据来自国家规范，同学们可以作为日常知识点补充）；考题中第一部分的要求可能需要在完成第二步的操作之后才能继续，需要边考虑要求边观察分析数据，得出最佳的解题步骤，节省时间；文章中给出的解题步骤，部分顺序是可以调整的，并不影响结果。"
  },
  {
    "text": "上午的题目没有特别难以理解的工具，所以对细节的把握和细节处理就非常重要。建议：上述数据操作都存在一定的工作量，在比赛时一定要注意时间的把握以及成员之间合理的分工。"
  }
]
export const stepBlocks = [
  [
    {
      "text": "2.1 配准江苏省标准地图",
      "heading": true
    },
    {
      "text": "2.1.1 设置坐标系",
      "heading": true
    },
    {
      "text": "选择地图属性的坐标系CGCS2000 GK CM 117E。（【内容列表】中，双击【地图】设置属性）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyCD7tFL2KRsDPxs0IjxGF3HLJrbYzyaEzfeOUvgiboicWE9SfAL1Jl8Sg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "在其上右键选择复制并修改。【名称】改为CGCS2000 GK CM 119E，【中央经线】改为119。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyRCJMpdFibPYibicicPROhG1NSReT2NehHecforRGf4SBLP4PvAbEH2E31A/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "在该坐标系上，右键选择【添加到收藏夹】。方便后续使用。"
    },
    {
      "text": "2.1.2 创建数据库",
      "heading": true
    },
    {
      "text": "目录视图中，新建文件地理数据库。重命名文件地理数据库为“结果数据库”。"
    },
    {
      "text": "2.1.3 提取江苏省境界面数据",
      "heading": true
    },
    {
      "text": "2.1.3.1 合并境界面数据",
      "heading": true
    },
    {
      "text": "在Pro中依次加载H50、H51、I50、I51 文件夹中的BOUA图层，表示各级行政区，并在内容列表中重命名BOUA图层为BOUA1、BOUA2、BOUA3、BOUA4（防止合并工具检测图层为重复图层）。使用【合并】（【数据管理工具】），依次输入BOUA数据，输出数据集为“行政区划”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyHukI0QnmiaKxvrQrXLak5CjmAe7AmoIVz6nBKq6XWqV6hiasgibic0Y3Cw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.1.3.2 选择江苏省境界面数据",
      "heading": true
    },
    {
      "text": "使用【按属性选择图层】工具，输入图层为“行政区划”，表达式为“PAC > 320000 And PAC < 330000”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyI8ezszNu8Hu8f9Q7UmhMN2ND84NfTJspI8Up1jibfdk2JZPoMfRDVEA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "属于江苏省的数据将会被高亮显示。"
    },
    {
      "text": "2.1.3.3 融合江苏省境界面数据",
      "heading": true
    },
    {
      "text": "保持高亮显示状态，使用【融合】工具，将接缝处的要素进行融合，融合字段为“PAC”及“NAME”。生成“江苏省行政区划”图层。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xybfWMNHSkw1ecXpq7xhnfxod7QFw4T9nCiaBI0WzFo72J6aKYfic7EyuQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.1.3.4 投影境界面数据",
      "heading": true
    },
    {
      "text": "使用【投影】工具，输出坐标系为“CGCS2000 GK CM 119E”，投影后为“行政境界面”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyf3VTVjkJCLolMAhvnRJloUoX7h0rqhSUHQ7vLL5aGPRC6iajeCjibEPw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.1.4 配准政区图",
      "heading": true
    },
    {
      "text": "内容列表中选中“江苏省地图政区图.jpg”图层，切换到【地图】菜单栏，点击【地理配准】。"
    },
    {
      "text": "选择【添加控制点】，在图片上找到关键控制点，进行点选，再缩放至行政境界面矢量图层，找到对应的关键控制点。生成一个控制点点对。软件默认自动应用配准。"
    },
    {
      "text": "如此操作至少三次，生成三个控制点对。进行保存。效果如下图。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyFk6AFY6YUq2MAibKnhqqRUQEXw06lSibJoVppkg5OyS4Fsa6SZXiaGOSg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "配准完成后，政区图图片将自动生成坐标系，该坐标系与地图图框坐标系一致。"
    }
  ],
  [
    {
      "text": "2.2 整合基础矢量数据并入库",
      "heading": true
    },
    {
      "text": "2.2.1 行政境界面、线、点数据入库",
      "heading": true
    },
    {
      "text": "2.2.1.1 合并点数据",
      "heading": true
    },
    {
      "text": "参考2.1.3.1步骤加载AGNP图层，对境界点数据进行合并，生成“居民地地名”数据。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyZicTld9cArXU6PiblxlmDOznY7EhcFwJ9mSxyjZh8TbI5sAStsvS2Yjg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.1.2 投影",
      "heading": true
    },
    {
      "text": "参考2.1.3.4步骤对居民地地名数据进行投影，生成“境界点”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyntIeiawdIdatRibaiaZRLzgK6YBC9hjpxFAIK7icmVn6PUIQ1tFAb2AlEw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.1.3 提取点数据",
      "heading": true
    },
    {
      "text": "使用【相交】工具，输入要素依次为“境界点、行政境界面”，输出数据集为“行政境界点”。生成江苏省境内的境界点。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyibzu251oV053UictCOaA8ibWBzaZ9PmUu1HtqjV6B7DkWlazyFNkbRTuQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.1.4 添加字段",
      "heading": true
    },
    {
      "text": "使用【添加字段（多个）】工具，为“行政境界点”图层添加“行政中心类型”及“名称”，字段类型为“文本”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xy8TPPOibMoKRRyGrT4835XHYR3zbIJ3pOFJAUp1oKCOJ6HZdicic68Mmyw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "打开行政境界点图层属性表，观察“CLASS”字段。值为AB表示省份名称，AD表示地级市行政地名，AE和AF表示县级市、县及地级市市辖区级别的行政地名。其他类别则表示乡镇等更低一级。其中AD级中包含南京市，属于题目中要求的“省级行政中心”类。"
    },
    {
      "text": "2.2.1.5 添加数据属性",
      "heading": true
    },
    {
      "text": "使用【按属性选择】工具，设置条件为“CLASS 等于 AD”，选中行政境界点图层中的13个地市级行政中心（含南京），与江苏省统计年鉴中的城市一致。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyVkMVuY8mDUvcD0dF40roXlXCM0gYyyJ2rJKKbJ6aicz09sVwBbYtTYg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "在要素选中状态下，使用【计算字段】工具，为“行政境界点”图层的行政中心类型字段赋值，行政中心类型=“地市级行政中心”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyeHGXiaK5Q6skyo8nxRzhl6B4rYZVjwF4o85CKsgBZ89E3FqxRn58tMA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "修改“南京市”要素行政中心类型为“省级行政中心”。"
    },
    {
      "text": "重复本步骤的操作，选中县级行政中心并赋值。共计96个县级行政中心。"
    },
    {
      "text": "取消选中要素，使用【计算字段】工具，为“行政境界点”图层的名称字段赋值，名称=“!NAME!”(第一个NAME字段)，填充名称属性。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyPdDjzbPGlmO1EwXIJOgr5Cg0ibrnA9AlCt7Xxlyy8wUQDuV4BVXYMUA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.1.6 导出要素",
      "heading": true
    },
    {
      "text": "使用【按属性选择】工具，选中“行政境界点”图层中，条件为“行政中心类型 不为空”的要素，共计109个。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyqgxF4kNTyKGIibvXwiax9syO7P6TNYGylzVmccqC01QsPYUBzBlMI4Rg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "保持要素选中状态，在行政境界点图层上右键，导出要素。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xy4gI5GibSbOdVXl4zwo4EGjR4RsomejVKz2b57xhNo0bKAYt5yt3Vgeg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "输出要素类保存在结果数据库中，名称为“行政境界点”。"
    },
    {
      "text": "2.2.1.7 境界线入库",
      "heading": true
    },
    {
      "text": "境界线要素操作与上述步骤类似，这里就不再赘述。"
    },
    {
      "text": "在添加数据属性时，除了选择使用【按属性选择】与【计算字段】工具组合，还可以直接在【计算字段】工具中使用python条件语句。如下图",
      "method": true,
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyT1yCnfB1gNlmEvNvbNkP2Oe9wlyckllTMceTBxmSRnceMqpGFe0lMA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "def Reclass (GB) :\n    if (GB == 250200 ): return '海岸线'\n    elif (GB == 260100 ): return '水系交汇处'\n    elif (GB == 630201 ): return '省级界线(已定)'\n    elif (GB == 630202 ): return '省级界线(未定)'\n    elif (GB == 640200 ): return '地、市、州级行政区界'\n    elif (GB == 650200 ): return '县级行政区界'"
    },
    {
      "text": "2.2.1.8 境界面入库",
      "heading": true
    },
    {
      "text": "境界面需要添加“名称”和“地级市名称”。“名称”方法与2.2.1.5相同。地级市名称字段与PAC字段有关，PAC字段的3、4位表示地级市编码，属于相同地级市的境界面3、4位编码相同。可以参照2.2.1.5方法，按属性选择数据并赋值。"
    },
    {
      "text": "也可以直接在【计算字段】工具中使用python条件语句。",
      "method": true,
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyQB6sbGsWHM3jlqRbMg916kuG008ly90VFPCvia3NaD6EJGSxffSOW1Q/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "def Belong (PAC) :\n    if (PAC >= 321300 ): return '宿迁市'\n    elif (PAC >= 321200 ): return '泰州市'\n    elif (PAC >= 321100 ): return '镇江市'\n    elif (PAC >= 321000 ): return '扬州市'\n    elif (PAC >= 320900 ): return '盐城市'\n    elif (PAC >= 320800 ): return '淮安市'\n    elif (PAC >= 320700 ): return '连云港市'\n    elif (PAC >= 320600 ): return '南通市'\n    elif (PAC >= 320500 ): return '苏州市'\n    elif (PAC >= 320400 ): return '常州市'\n    elif (PAC >= 320300 ): return '徐州市'\n    elif (PAC >= 320200 ): return '无锡市'\n    elif (PAC >= 320100 ): return '南京市'"
    },
    {
      "text": "2.2.2 主要水系面和主要水系线数据入库",
      "heading": true
    },
    {
      "text": "2.2.2.1 提取江苏省境内水系线与面数据",
      "heading": true
    },
    {
      "text": "参考2.2.1.1-2.2.1.3步骤，分别使用HYDL和HYDA数据，提取江苏省境内水系线与面数据，并命名为“江苏省内水系线”和“江苏省内水系面”。"
    },
    {
      "text": "2.2.2.2 融合江苏省境内水系线与面数据",
      "heading": true
    },
    {
      "text": "使用【融合】工具，融合“江苏省内水系线”图层中的同名要素，融合字段为“NAME”，注意取消勾选“创建多部件要素”（部分河流线是断开的，需要进行手动编辑）。输出要素类为“江苏省境内水系线”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xynX1oiasA5B1Twyh0u8LaByCS0b8RAYWgAyia0wThFvZyHUiaUbVEgxibdg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "同样方法融合水系面。"
    },
    {
      "text": "2.2.2.3 提取江苏省境内主要水系线与面",
      "heading": true
    },
    {
      "text": "使用【按属性查询】工具。将NAME属性为京杭运河、废黄河、苏北灌溉总渠、通扬运河、滁河、通吕运河、通榆河、新沂河、新沂河北偏泓的河流高亮显示，可使用SQL查询语句，共计29条河流。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyCANTYzRAel9ibic53FoEpkNrH0HS6a7Cw0jugicC6kkz6IAp4WDcczlFw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用【导出要素】工具。导出选中要素，并命名为“主要水系线”。"
    },
    {
      "text": "相同方法导出“主要水系面”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyRSc5mB15pdU2BPgFmu71wZ3AR6k4WVBMkkPC6uxab17S64dBsrHj4A/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.2.4 配准“江苏省 1∶270 万.jpg”图片",
      "heading": true
    },
    {
      "text": "参考2.1.4方法，配准江苏省河流图。效果如下图。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xybGDAVGGJNZDOQVMPLqS12qW4RUibbnWic6FyOfias7TOZeZl96gVmr72g/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.2.5 编辑江苏省境内主要水系线与面",
      "heading": true
    },
    {
      "text": "叠加主要水系线与面要素以及江苏省河流图片。对照江苏省河流图片对主要水系线和面进行修改。"
    },
    {
      "text": "河流线需要编辑："
    },
    {
      "text": "1）“新沂河北偏泓”改成“新沂河”，与原“新沂河”进行合并。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyZFYZyl5AvxIQ24aRWzSGNQrWUga7Ju8b1HtPX0nT8DIsysWBuib5HEw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2）删除部分“通榆河”并改名为“通榆运河”，合并同名要素。"
    },
    {
      "text": "3）将“废黄河”、“京杭运河”断开部分进行连接，合并同名要素（京杭运河在长江段可不连通）。"
    },
    {
      "text": "4）参考2.2.1.4步骤，添加名称字段，并赋值属性。"
    },
    {
      "text": "河流面需要编辑："
    },
    {
      "text": "1）编辑太湖要素折点，保证太湖要素为单一部件。（删除中间线上折点）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyWon6DEgDQkSViaPSj9b5q89cX87h53iaVwZAwnrwuvhcO4r3zkmicKQMQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "太湖要素编辑前后对比（续图）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyibRDzJic6IO9VkBu5HHNZsFAhs7gKFEd7ZtmNjEzUwuteY9lFUNWLjMA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2）参考2.2.1.4步骤，添加名称字段，并赋值属性。"
    },
    {
      "text": "成果可参考下图。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyX6dicqsSjCHE4mwsOqCxklD2FXGGMT99kzN4DiafwN8bZOdw2TDbCBAA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.3 公路数据入库",
      "heading": true
    },
    {
      "text": "2.2.3.1 提取江苏省境内公路数据",
      "heading": true
    },
    {
      "text": "参考2.2.1.1-2.2.1.3步骤，使用LRDL数据，提取江苏省境内公路数据，并命名为“公路”。"
    },
    {
      "text": "2.2.3.2 添加字段",
      "heading": true
    },
    {
      "text": "使用【添加字段（多个）】工具，添加“公路类型”和“权重”字段。公路类型字段为文本型，权重字段为整型。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xynXibq8W99m1lOFWWmdx2fiaZfFkfOdTgNNCq1L5ICNLvyffOgurmUnfw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.2.3.3 添加数据属性",
      "heading": true
    },
    {
      "text": "使用【计算字段】工具，给公路类型字段赋值。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyko0EbhYHJKgPziaZnorJjGRKMt46FCVyGD7FSeOEv0HU7KRBQWGNRJA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "def Reclass (GB) :\n    if (GB == 420101 ): return '国道'\n    elif (GB == 420102 ): return '建筑中国道'\n    elif (GB == 420201 ): return '省道'\n    elif (GB == 420202 ): return '建筑中省道'\n    elif (GB == 420301 ): return '县道'\n    elif (GB == 420302 ): return '建筑中县道'\n    elif (GB == 420400 ): return '乡道'\n    elif (GB == 420800 ): return '机耕路'\n    elif (GB == 420802 ): return '建筑中机耕路'\n    elif (GB == 430200 ): return '快速路'\n    elif (GB == 440100 ): return '简易公路'\n    elif (GB == 440200 ): return '乡村路'\n    elif (GB == 440300 ): return '小路'"
    },
    {
      "text": "使用【计算字段】工具，给权重字段赋值，权重字段中需要两个条件组合进行判断。Python代码如下：",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyGc98PGfJsiawEXCMezYhcmnhpN2MHrCUcS0C1Hg55hk7JU5sxr3Ur7A/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "def Reclass (RTEG,GLLX) :\n    if (RTEG == '高' ): return 5\n    elif (RTEG == '一' ): return 4\n    elif (RTEG == '二' ): return 3\n    elif (RTEG == '三' ): return 2\n    elif (RTEG == '四' ): return 1\n    elif (RTEG == '等' ): return 1\n    elif (RTEG == '' and GLLX== '国道' ): return 3\n    elif (RTEG == '' and GLLX== '建筑中国道' ): return 3\n    elif (RTEG == '' and GLLX== '省道' ): return 2\n    elif (RTEG == '' and GLLX== '建筑中省道' ): return 2\n    else : return 1"
    },
    {
      "text": "也可以使用【按属性选择】和【计算字段】工具结合方式来赋值。",
      "method": true
    },
    {
      "text": "2.2.4 街区数据入库",
      "heading": true
    },
    {
      "text": "在结果数据库中，创建名为“街区”的面要素类，坐标为CGCS2000 GK CM 119E。"
    },
    {
      "text": "勾选“江苏省地图政区图.jpg”图层可见。在地图中找到街区的图例，按照各地级市街区的外轮廓范围矢量化，并添加名称字段。"
    },
    {
      "text": "需要注意连云港市、南京市街区为多部件要素（分别矢量化小部件，再使用编辑中的合并工具），且在江宁区位置存在中空的情况。（挖空可以使用编辑中的分割工具）。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xy4XJBktuBiaDyOWajHefddkFb8mJoiaouM2ibEfluGKz1pwkSaKq9soS8w/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "连云港市、南京市街区要素（续图）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xywlBXDWibbJ5XdfvdtzxkXK9wQ7EguBkgwduqM8YoRiaDMezmJub8cia2w/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "最终矢量化效果如下。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyRjxodgKSLZVh3JtyZgrdDp1o5EgiaGcAV8X3WlA9TzyeAbMG9xHAvicQ/640?wx_fmt=png&from=appmsg"
    }
  ],
  [
    {
      "text": "2.3 整合POI数据并入库",
      "heading": true
    },
    {
      "text": "2.3.1 餐饮POI数据入库",
      "heading": true
    },
    {
      "text": "使用【XY表转点】工具，依次导入“餐饮 POI”相关点数据，将Excel表数据转为点要素，坐标系为CGCS 2000。（注意不是CGCS2000 GK CM 119E。Excel表中坐标为经纬度，一般使用地理坐标系）。"
    },
    {
      "text": "小窍门：在该工具上右键选择批处理，统一导入餐饮 POI数据。选择批处理输入表参数时，可以直接在内容列表中拖拽全部的餐饮表，比下拉列表选择方便。输出要素类参数需要是与名称相关的变量。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyoCNlujibM8VUc3ia5H0u9jUOLPjoAlPiaGtrdnG91dAxXE5OcRiaEibxlvg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用批量【投影】工具，将上述要素类转换成CGCS2000 GK CM 119E坐标系。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyFWKqAJicAamRnRSRx0qsoBWDjHtgj6oBDdrjQjB6KtptkIfiatuWahGQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.3.2 清洗餐饮POI数据",
      "heading": true
    },
    {
      "text": "使用品牌店名关键词，依次提取不符合关键词的要素，人为判断要素是否正确，对错误要素进行删除。以关键词‘肯德基’为例。"
    },
    {
      "text": "使用【按属性查询】工具，SQL语句填写name NOT LIKE '%肯德基%'。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyueiasz8iaGQFbUdQHB2Mfyia5r5BWMMWFvLibsm4ZAzkEa4pF6Uj6sA1XA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "得到不包含关键词的3个要素。可以将编号359、646的name属性改为肯德基，删除编号为828的点。再对数据进行保存。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyPDNcUiaNgbkF72NfujE078lAUJPAVlHd5rXINnf4MNcThthE6tGo6Dw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.3.3 合并餐饮POI数据",
      "heading": true
    },
    {
      "text": "使用【合并】工具，输入数据集依次为相关品牌，输出数据集为“餐饮POI”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyBPU6xmfM0dUJicE4I7F70Z6M4iaibX8esVeZv8dULyG4tUUFNibGg6MIag/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用【计算字段】工具，添加名为“品牌名称”的字段，并使用Python语法对其品牌进行判断。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xy7S63ZKFu0HZrEl7LETibbr6Eibiacx1wxDdx6xNBz9nCJyXW1PCSc6AXQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "代码如下："
    },
    {
      "text": "def Reclass (name) :\n    if ( '麦当劳' in name): return '麦当劳'\n    elif ( '肯德基' in name): return '肯德基'\n    elif ( '星巴克' in name): return '星巴克'\n    elif ( '瑞幸咖啡' in name): return '瑞幸咖啡'\n    elif ( 'luckin coffee' in name): return '瑞幸咖啡'\n    elif ( '都可茶饮' in name): return '都可茶饮'\n    elif ( 'CoCo 都可' in name): return '都可茶饮'\n    elif ( 'coco 都可' in name): return '都可茶饮'\n    elif ( '蜜雪冰城' in name): return '蜜雪冰城'\n    elif ( '7 分甜' in name): return '7 分甜'\n    elif ( '喜茶' in name): return '喜茶'\n    elif ( '1 点点' in name): return '1 点点'"
    },
    {
      "text": "也可以在清洗完数据后，分别对各类数据添加品牌字段，并独立赋值。两种解决方法都可以。",
      "method": true
    },
    {
      "text": "2.3.4 学校POI数据入库",
      "heading": true
    },
    {
      "text": "参考2.3.1步骤，依次导入小学、幼儿园点数据。并进行投影转换。"
    },
    {
      "text": "2.3.5 合并学校POI数据",
      "heading": true
    },
    {
      "text": "使用【计算字段】工具，分别为小学及幼儿园图层添加“学校类型”字段，并赋值。这里以小学图层为例。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyDKZsxb3Z5jtah6AkRFpJKkW2xecD8Q1TGzPb4ibGjbxTyndrf0aic8jw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用【识别】或【相交】工具，分别为小学及幼儿园图层挂接所属行政区。（【识别】与【相交】工具的区别在于，【识别】保留了空间上不在江苏省所属行政区范围内的要素，其原因在于POI数据与行政区数据来源不同，数据有稍微的偏差）。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xykql111EfqhuXmZoa9gJ2VjL900wzwqJLpKlnNVlNfy1lPhnicq9ZYOg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "其属性表如下。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyf7jCyFib4OZfnnDHxK6icpic6Q3y8G7K72hibUgicRk8d9yic8eJZgP6mblA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "分别使用【汇总统计数据】工具，统计不同地级市内的小学/幼儿园数量。注意选择案例分组字段参数。输出结果中的FREQUENCY字段表示各地级市对应的小学/幼儿园数量。（也可以选择使用【频数】工具）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyIX35Vtloyeh85wBxmzxgicmTpKp3JMMVqw41zAd3yicKkdArdIXicS9RA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "加载江苏省统计年鉴至Pro。"
    },
    {
      "text": "分别使用【连接字段】工具，为小学/幼儿园图层连接小学/幼儿园数量表中的统计字段以及江苏省统计年鉴中的人口数量。（也可以使用在图层上右键【添加连接】的方式，二者区别是【添加连接】是临时的，【连接字段】是永久的）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xy7k4GLMhCKZjMK82xnPAuN4GQJN9Eibn0L8LvhKHnkK7DNEMu8WXpmXQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "【连接字段】工具对话框（续图）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyPNCfwync339d8CJcuaib2IkSN8uFTCObEWm5P45KsEXicFvcmNMotmQQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用【合并】工具，将小学和幼儿园数据进行合并，输出要素名为“学校POI”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyw7jZkZwnIFTdrvaMVibwxUy9BqEqnqPW76ZTrZjboL6VNV6Ua00Db1Q/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用【计算字段】工具，计算权重。权重=!人口万人! / !FREQUENCY!。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xykWBIPs5IOoIRmnw2sbSdZDOFFKwXtjKz4DzFKn7ibnrib2lalGQ7yWIg/640?wx_fmt=png&from=appmsg"
    }
  ],
  [
    {
      "text": "2.4 制作地图",
      "heading": true
    },
    {
      "text": "2.4.1 制作江苏省人口地图",
      "heading": true
    },
    {
      "text": "使用【融合】工具，将行政境界面图层按照所属地级市进行融合。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xytlM4xAJ6HM42gKMZy6guacf7ibU2NVRb8KCvJiavkNjaYpoeLqWTjX4g/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "使用【连接字段】工具，为地级市境界面图层连接江苏省统计年鉴中的人口数量。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyHO2LroaicicAfYUZ5icSSOLkwZpqq9AIicchCiceRLwgfdBgzcrj3p8cZrA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "题目中没有明确的比例尺、符号化、专题图样式等要求，可以参考江苏省地图政区图提供的相关信息。"
    },
    {
      "text": "可以考虑使用分级色彩或者分级符号的方式制作人口专题图。注意选择的配色方案与政区图图片风格统一。"
    },
    {
      "text": "对于行政境界点、行政境界线数据，可以根据其类型进行分类符号化。"
    },
    {
      "text": "新建布局，选择自定义布局大小，大小为“60*60CM”(与1:1000000比例尺对应)。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyqObjDyTsSoTMJCad8co4ck9Vge9jbsE59qf5CmmeJFgfzzxM29sXkw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "将目录中的地图直接拖拽至布局中。设置左下方的比例尺为1:1000000。"
    },
    {
      "text": "添加名称、指北针、比例尺以及图例。"
    },
    {
      "text": "在共享菜单栏中，选择导出布局。导出PNG、PDF等格式图片。分辨率最高设为300DPI。效果如下图：",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xynRUEfX25s2xSkicSaMcSviacuKzXiazKBfJ1gRqJJjRgCQUlIVLxEoMNw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.4.2 制作公路核密度图",
      "heading": true
    },
    {
      "text": "使用【核密度分析】工具生成公路核密度数据。Population字段设为“权重”，输出像元大小为“500”，搜索半径为“5000”。切换到【环境】选项卡，设置掩膜参数为“行政境界面”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xypq0IBic8rW47x0fcZDIj1A8OIF8Rw7TwvXpYYeaicyaHKyG6Xib6iak8nQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "【核密度分析】工具对话框（续图）",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyVibucPMWfxf87JApfiaZNkppBXQHX7p0gjdcWgx7d54ZKN1zIopcmDfA/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "调整结果图层的颜色，使其更加清晰。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyDZ86swlibOG85gicZJTdCCx97fPog0bq2EqzaeIrNVTIcLJ9a1GvhSIw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.4.3 制作餐饮 POI 核密度图",
      "heading": true
    },
    {
      "text": "同2.4.2方法制作餐饮POI核密度图。使用【核密度分析】工具生成餐饮POI核密度数据。Population字段设为“NONE”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyMc1O52ReBZ913vF3SowncnTicsjVNmibAOv5uC3eZ3SYYDeVnqCMicZibw/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "调整结果图层的颜色，使其更加清晰，这里选择几何间隔分类方法。结果如下图所示：",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyvcH2O8caoUYrvKI8V0icWtBT6Akx1BkDlSxkuphenGGuGRQDic3icPjSg/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "2.4.4 制作学校 POI 核密度图",
      "heading": true
    },
    {
      "text": "同2.4.2方法制作学校POI核密度图。使用【核密度分析】工具生成学校POI核密度数据。Population字段设为“权重”，输出像元大小为“500”，搜索半径为“5000”。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyEdvGQII4aeNqFdTrb1LWjkJar9ka3gHM1hEia6iaS6OfyoH5cibRl3pdQ/640?wx_fmt=png&from=appmsg"
    },
    {
      "text": "调整结果图层的颜色，使其更加清晰，这里选择几何间隔分类方法（方法不限）。结果如下图所示。",
      "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/60KZUoSHDiafviau2xz1JibodMFLg1ZM1xyyaz2MficYbHbhczeVTqX4N6FLMZicxFDkk70HCn2Riboicw0jdoGabWCKg/640?wx_fmt=png&from=appmsg"
    }
  ]
]

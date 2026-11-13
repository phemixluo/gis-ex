// 第十届下午 · 屋顶太阳能适宜性评估 —— 解析摘录
export const note = "解析软件：ArcGIS 10.8（原文开篇注明\"本次操作使用的 ArcGIS 版本为 10.8\"），脚本部分基于 ArcGIS 自带 Python 2.7.18 + PyCharm 开发。来源：博客园 · 北极洲的小卖部《第十届全国大学生GIS应用技能大赛试题及参考解题过程(A下午)》。说明：粗提取文本丢失了原文的完整 ArcPy 脚本代码、每月辐射低值/高值结果表以及个别仅以截图形式给出的表达式，已对照原始 HTML 逐一补录（补录图片：太阳辐射区域设置界面、面积单位换算表达式、可用辐射量字段计算器表达式）。"
export const overview = [
  { "text": "一、案例背景", "heading": true },
  { "text": "太阳能是一种可再生资源，是指太阳的热辐射能。太阳能资源丰富，既可免费使用，又无需运输，对环境无任何污染。太阳能的利用还不是很普及，太阳能的使用受到昼夜、季节、地理纬度和海拔高度等自然条件的限制以及晴、阴、云、雨等随机因素的影响。\n某住宅小区希望在屋顶安装太阳能，供给家庭日常用电。你将为该小区评估是否适合安装太阳能电池板。" },
  { "text": "二、数据说明（见\"上午A\"文件夹中的\"数据\"文件夹）", "heading": true },
  { "text": "Building.shp：建筑物数据。\nDSM.tif：数字表面模型。\nDTM.tif：数字地面模型。" },
  { "text": "三、分析要求（100 分）", "heading": true },
  { "text": "题目一：根据建筑物修正 DTM（15 分）", "heading": true },
  { "text": "DTM 一般指数字地面模型，在本项目中你可以理解为 DEM；DSM 是数字表面模型，包括地形及地表的所有对象（例如树和建筑物等）。本项目中的 DTM 和 DSM 数据都是通过雷达数据生成，固有一定的误差。正确的 DTM 应该在建筑物处是平整的，而不是倾斜或者高低起伏。\n1）请为 Building 添加属性字段【基本高度】，并计算数值。（5 分）基本高度指建筑物底部高程值，本题请计算每栋建筑物范围内的 DTM 的平均值，保留 2 位小数。\n2）修正 DTM 数据，将结果命名为\"DTM 修正\"。（10 分）建筑物所在位置对应的 DTM 应是平整的，高程值为建筑物的基本高度。" },
  { "text": "题目二：计算每栋房屋的其它基础信息（20 分）", "heading": true },
  { "text": "1）请为 Building 添加属性字段【最大高度】，并计算数值。（5 分）最大高度指建筑物屋顶的最大高程值，保留 2 位小数。\n2）请为 Building 添加属性字段【建筑物高度】，并计算数值。（5 分）建筑物高度指建筑物本身的高度，保留 2 位小数。\n3）填写下表中的建筑物屋顶形态。（10 分）屋顶形态分为平屋顶、双坡屋顶、四坡屋顶。屋顶朝向分为平面、东、南、西、北、东南、西南、东北和西北。如果建筑物是双坡屋顶，请填写 2 个屋顶朝向；如果建筑物是四坡屋顶，请填写 4 个屋顶朝向。\n待填表格（序号 / BuildingBM / 屋顶形态 / 屋顶朝向）：1 2116；2 2156；3 2161；4 2165；5 2171。" },
  { "text": "题目三：创建房屋屋顶区域 2021 年每月预计获得太阳辐射量栅格数据，在环境设置中将 Building 作为掩膜（15 分）", "heading": true },
  { "text": "1）【太阳辐射区域】工具可以计算从栅格表面获得的入射太阳辐射。输出总辐射栅格用于表示为输入表面的每个位置所计算的全局辐射或全部日照入射量（直射 + 散射）的输出栅格，输出单位为瓦特每小时每平方米（WH/m²）。\na）本题工具主参数中天空大小为 200，间隔小时数 0.5，其他主参数请自行研究。\nb）本题工具地形参数中地形方向为 16，其它保持不变。\n2）太阳辐射区域工具计算的太阳辐射量为假设该地区全部晴天可以获得的太阳辐射量。实际太阳辐射受晴、阴、云、雨等随机因素的影响。为了简化计算，我们把天气分为晴天和非晴天：晴天可以获得太阳辐射区域工具计算的全部太阳辐射量，非晴天则无法获得任何太阳辐射量。\n3）该地区 2021 年每月晴天数据如下：1 月 25 天、2 月 20 天、3 月 24 天、4 月 23 天、5 月 20 天、6 月 15 天、7 月 22 天、8 月 26 天、9 月 27 天、10 月 20 天、11 月 25 天、12 月 26 天。\n4）根据每月晴天数据，创建房屋屋顶范围内 2021 年每月太阳辐射栅格数据，像元值表示瓦特每小时每平方米（WH/m²）。请命名为\"太阳辐射 1 月\"\"太阳辐射 2 月\"\"太阳辐射 3 月\"，以此类推，并完成每月低值、高值统计表。" },
  { "text": "题目四：计算 8 月份可用房屋屋顶范围内的太阳辐射量，在环境设置中将 Building 作为掩膜（30 分）", "heading": true },
  { "text": "考虑到太阳能电池板的能效，符合以下条件的屋顶才适合安装电池板。\n1）如果屋顶坡度小于等于 15 度，则任何屋顶方向都可以安装太阳能电池板。\n2）如果屋顶坡度大于 15 度且小于等于 30 度，则屋顶朝向不可以朝北（北方为大于等于 337.5 度，或者小于等于 22.5 度）。\n3）如果屋顶坡度大于 30 度且小于等于 45 度，则屋顶朝向不可以朝北、东北和西北（东北为大于 22.5 度且小于等于 67.5 度，西北为大于等于 292.5 度且小于 337.5 度）。\n4）创建 2021 年 8 月符合以上条件要求的房屋屋顶范围内的太阳辐射量栅格数据，命名为\"可用辐射 8 月\"，像元值表示瓦特每小时每平方米（WH/m²）。" },
  { "text": "题目五：计算 8 月份每栋房屋可接收的太阳辐射量，在环境设置中将 Building 作为掩膜", "heading": true },
  { "text": "1）为 Building 添加属性字段【可用面积】，计算每栋房屋屋顶可用太阳辐射区域的面积。（10 分）面积单位为平方米，保留 2 位小数。1 平方英尺 = 0.093 平方米。\n2）为 Building 添加属性字段【可用辐射 8 月】，计算每栋房屋屋顶 8 月可接收太阳辐射量。（10 分）\na）如果每栋房屋可用面积小于 25 平方米，则该栋房屋不适合安装太阳能电池板，无需计算可接收太阳辐射量。\nb）可用辐射量单位为千瓦时（KWH），保留 2 位小数。" },
  { "text": "【参赛收获】这道题目做下来操作量挺大、耗时也比较长，例如使用 Arcpy 的那一部分在作者的电脑上运行了半个小时左右，在规定时间内完成全部题目很有难度；如果操作者对 ArcGIS 分析流程更熟悉的话就容易很多。" }
]
export const stepBlocks = [
  [
    { "text": "导入原始数据并配置地理处理空间", "heading": true },
    { "text": "打开【地理处理】|【环境】，设置工作空间（作者的数据文件夹就放在桌面上），并设置输出栅格像元大小与 DTM 一致。" },
    { "text": "导入原始数据 \"Building.shp\"、\"DTM.tif\" 以及 \"DSM.tif\" 进入显示窗口中。操作前查看数据的坐标系是一个好习惯，本例中三者的投影坐标系均一致，无需特别处理。" },
    { "text": "计算【基本高度】字段", "heading": true },
    { "text": "首先需要计算建筑物底部的高程值，其数值为房屋区域 DTM 的平均值，可以想到需要使用分区统计之类的工具，又涉及属性表添加字段，所以选定【ArcToolBox】|【Spatial Analyst】|【区域分析】|【以表格显示分区统计】工具。\n首先打开 Building 的属性表并添加双精度类型字段 \"base_tall\"，精度选 12，小数位数规定为 2。添加字段之后在属性表中右键字段名称更改字段属性，将【别名】设置为中文名称 \"基本高度\"。", "image": "https://s1.ax1x.com/2022/07/23/jXwAVH.png" },
    { "text": "然后打开【以表格显示分区统计】工具，以 Building 为分区依据，对每栋房屋范围内的 DTM 进行均值统计。该工具的输出结果是一个表格，【内容列表】需要 \"按源列出\" 才可以看到并打开。" },
    { "text": "上述操作的输出结果是一张表格，内部有 \"ROWID\"、\"BUILDINGBM\"、\"COUNT\"、\"AREA\"、\"MEAN\" 这 5 个字段。将 Building.shp 与表格 mean_dtm 根据 \"BUILDINGBM\" 字段建立连接，然后使用【字段计算器】让 \"mean_dtm:MEAN\" 对 \"Building:base_tall\" 进行赋值。" },
    { "text": "【基本高度】字段赋值完毕后，解除 Building 与 mean_dtm 之间的连接。" },
    { "text": "修正 DTM 数据", "heading": true },
    { "text": "使用【ArcToolBox】|【Spatial Analyst】|【区域分析】|【分区统计】工具（对 DTM 按 Building 统计均值并输出栅格 mean_DTM），设置界面如下：", "image": "https://s1.ax1x.com/2022/07/23/jXwmGt.png" },
    { "text": "输出结果中可以看出，每栋房屋范围内的 mean_DTM 是均匀一致的。" },
    { "text": "然后将 mean_DTM.tif 与 DTM【镶嵌至新栅格】。需要注意镶嵌的顺序：如果输入数据中 mean_DTM 在前，那么镶嵌方式选择为 \"FIRST\"，反之则选择镶嵌方式为 \"LAST\"，因为目的是希望 mean_DTM 代替局部的 DTM，来产生 \"DTM 修正\"。除此之外，镶嵌至新栅格需要设置波段数、像元大小、像素类型等参数，这些参数均参照 DTM。" },
    { "text": "由此得到 \"DTM 修正\" 结果。" }
  ],
  [
    { "text": "首先对 Building 添加字段【max_tall】和【build_tall】，保留 2 位小数，并将别名分别设置为【最大高度】和【建筑物高度】。" },
    { "text": "计算房屋的最大高度", "heading": true },
    { "text": "获取建筑物的最大高度与上一步骤获取建筑物底部高程值的步骤一致：先使用【以表格显示分区统计】工具，对 DSM 的每一栋房屋屋顶范围内的最大值进行统计，输出表格后与 Building 建立连接，然后对字段【最大高度】进行赋值，最后解除连接。\n连接属性表以及使用【字段计算器】进行赋值的步骤与之前计算【基本高度】的步骤相似，此处从略，可参照前文。", "image": "https://s1.ax1x.com/2022/07/23/jXw3ZQ.png" },
    { "text": "计算房屋的建筑物高度", "heading": true },
    { "text": "建筑物高度等于最大高度减去基本高度，因此有：build_tall = max_tall - base_tall。使用【字段计算器】完成赋值。" },
    { "text": "最终得到的【建筑物高度】连同上一步得到的【最大高度】即为目标结果。" },
    { "text": "获取指定房屋的屋顶形态", "heading": true },
    { "text": "由题目提示可知，判断房屋屋顶形态的依据是坡向，因此先计算建筑物屋顶范围内的坡向，输入数据为 DSM。", "image": "https://s1.ax1x.com/2022/07/23/jXwYin.png" },
    { "text": "先不忙点击【确定】执行工具，点击【环境】设置【掩膜】为 Building，这样可以只提取屋顶范围内的坡向。" },
    { "text": "完成设置并执行【坡向】工具后，即得屋顶范围内的坡向栅格（Aspect_DSM）。" },
    { "text": "接下来使用 Building.shp 辅助定位特定编号的房屋：使用【按属性选择】工具，根据 Building.shp 的 BuildingBM 属性分别先后筛选编号为 \"2116\"、\"2156\"、\"2161\"、\"2165\"、\"2171\" 这 5 栋房屋，然后根据 Building.shp 的高亮提示，结合 \"Aspect_DSM.tif\" 判断该房屋的屋顶坡向分布情况。例如编号为 \"2116\" 的房屋屋顶为双坡屋顶，朝向为西北与东南。最终完成下表：\n1 2116 双坡屋顶 西北、东南\n2 2156 四坡屋顶 东、南、西、北\n3 2161 四坡屋顶 西北、东北、东南、西南\n4 2165 四坡屋顶 西北、东北、东南、西南\n5 2171 四坡屋顶 西北、东北、东南、西南" }
  ],
  [
    { "text": "计算房屋屋顶区域 12 个月中每个月的太阳辐射量栅格数据，主要使用【太阳辐射区域】工具，该工具位于【ArcToolBox】|【Spatial Analyst】|【太阳辐射】目录下，题目中对于参数已经做了限定，其余参数保持默认即可。作者尝试几次后发现该工具计算速度比较慢，如果手动计算 12 次要等很久，于是想到使用 Arcpy 的 Python 模块来编写脚本，这样在 Python 代码运行的过程中还可以继续使用 ArcMap 进行操作。" },
    { "text": "使用 ArcGIS 的 Python 脚本功能主要有 2 种方式：" },
    { "text": "方式一：使用 ArcMap 主界面的 Python 脚本编辑器。", "method": true },
    { "text": "方式二：使用外部的 Python 开发环境引入 Arcpy 模块。", "method": true },
    { "text": "作者选择后者以方便调试：打开 PyCharm，新建 Python 项目，然后将解释器位置设置为 ArcGIS 安装位置处的 Python 2.7.18 环境。" },
    { "text": "接下来的问题是如何编写代码。由于 ArcMap 的【模型构建器】具有一键导出模型为 Python 脚本的功能，因此可以先在 ArcToolBox 中拖动【太阳辐射区域】工具进入【模型构建器】编辑界面，设置好参数后一键生成代码。" },
    { "text": "注意事先在模型属性中设置掩膜为 Building.shp。太阳辐射区域的设置界面如下所示（以计算屋顶区域 2021 年 1 月份太阳辐射为例）：", "image": "https://s1.ax1x.com/2022/07/23/jXwdMT.png" },
    { "text": "设置完工具之后回到【模型构建器】的编辑界面，点击【导出至 Python 脚本】。" },
    { "text": "当然，导出的脚本仍然有一些不完善的地方，例如需要针对每个月晴天天数对结果进行乘法修正，还需要得到每个月太阳辐射的低值和高值。这时可以参照 ArcGIS 的帮助文档修改代码，帮助文档对 Python 脚本也有详细的介绍。" },
    { "text": "脚本的最终版本如下：" },
    { "text": "# -*- coding:UTF-8 -*-\n# Name: AreaSolarRadiation_example02.py\n# Description: Derives incoming solar radiation from a raster surface.\n#              Outputs a global radiation raster and optional direct, diffuse and direct duration rasters\n#              for a specified time period. (April to July).\n# Requirements: Spatial Analyst Extension\n\n# Import system modules\nimport arcpy\nfrom arcpy import env\nfrom arcpy.sa import *\nimport numpy as np\n\n# Set environment settings\nenv.workspace = \"C:/Users/Fangh/Desktop/data\"  # 工作空间，需更改\n\n# Check out the ArcGIS Spatial Analyst extension license\narcpy.CheckOutExtension(\"Spatial\")\n\n# Set Geoprocessing environments\nenv.cellSizeProjectionMethod = \"CONVERT_UNITS\"\nenv.cellSize = \"DTM.tif\"  # 像元大小与DTM.tif一致\nenv.mask = \"Building.shp\"  # 设置屋顶区域Building.shp为掩膜\n\n# Set local variables\ninRaster = \"C:/Users/Fangh/Desktop/data/DSM.tif\"\nlatitude = 41.77686382537  # 纬度\nskySize = 200  # 天空大小\ntimeConfig = [TimeMultipleDays(2021, 1, 31),      # Jenuary\n              TimeMultipleDays(2021, 32, 59),     # February\n              TimeMultipleDays(2021, 60, 90),     # March\n              TimeMultipleDays(2021, 91, 120),    # April\n              TimeMultipleDays(2021, 121, 151),   # May\n              TimeMultipleDays(2021, 152, 181),   # June\n              TimeMultipleDays(2021, 182, 212),   # July\n              TimeMultipleDays(2021, 213, 243),   # August\n              TimeMultipleDays(2021, 244, 273),   # September\n              TimeMultipleDays(2021, 274, 304),   # October\n              TimeMultipleDays(2021, 305, 334),   # November\n              TimeMultipleDays(2021, 335, 365)]   # December\ndayInterval = 14  # 间隔天数\nhourInterval = 0.5  # 间隔小时数\nzFactor = 1  # 地形参数/Z因子\ncalcDirections = 16  # 地形参数/计算方向\nzenithDivisions = 8  # 辐射参数/天顶分割\nazimuthDivisions = 8  # 辐射参数/方位角分割\ndiffuseProp = 0.3  # 辐射参数/散射比例\ntransmittivity = 0.5  # 辐射参数/透射率\noutDirectRad = \"\"  # 无需\"输出直接辐射栅格数据\"\noutDiffuseRad = \"\"  # 无需\"输出散射辐射栅格数据\"\noutDirectDur = \"\"  # 无需\"直接辐射持续时间栅格数据\"\n\n# Sunny days in every month\nSunnyDay = [25.0/31.0, 20.0/28.0, 24.0/31.0,\n            23.0/30.0, 20.0/31.0, 15.0/30.0,\n            22.0/31.0, 26.0/31.0, 27.0/30.0,\n            20.0/31.0, 25.0/30.0, 26.0/31.0]\n\n# statistic the maximum and minimum of every raster\nmni_max_value = np.zeros([2, 12])\noutputcsv = r\"C:/Users/Fangh/Desktop/data/statics.csv\"\noutputfile = open(outputcsv, 'w')\n\nfor i in range(12):\n   # Execute AreaSolarRadiation\n   outGlobalRad = AreaSolarRadiation(inRaster, latitude, skySize, timeConfig[i],\n      dayInterval, hourInterval, \"NOINTERVAL\", zFactor, \"FROM_DEM\",\n      calcDirections, zenithDivisions, azimuthDivisions, \"UNIFORM_SKY\",\n      diffuseProp, transmittivity, outDirectRad, outDiffuseRad, outDirectDur)\n\n   # Consider the sunny day\n   outGlobalRad *= SunnyDay[i]\n\n   # Save the output\n   outGlobalRad.save(\"C:/Users/Fangh/Desktop/data/Rad_\"+str(i+1)+\".tif\")\n\n   # Get the minimum and maximum\n   minimumvalueInfo = arcpy.GetRasterProperties_management(outGlobalRad, \"MINIMUM\")\n   mni_max_value[0, i] = minimumvalueInfo.getOutput(0)\n\n   maximumvalueInfo = arcpy.GetRasterProperties_management(outGlobalRad, \"MAXIMUM\")\n   mni_max_value[1, i] = maximumvalueInfo.getOutput(0)\n\n# Write the outputfile\noutputfile.write('Month'+','+'January'+','+'February'+','+'March'+','+'April'+','+'May'+','+'June'+','+'July'+','+'August'+','+'September'+','+'October'+','+'November'+','+'December'+'\\n')\noutputfile.write('Minimum')\nfor i in range(12):\n    outputfile.write(','+str(mni_max_value[0, i]))\noutputfile.write('\\n')\noutputfile.write('Maximum')\nfor i in range(12):\n    outputfile.write(','+str(mni_max_value[1, i]))\noutputfile.write('\\n')\n\noutputfile.close()\n\nprint(\"All Job Were Done!\")" },
    { "text": "这份代码在计算出 12 个月份的屋顶区域太阳辐射量栅格数据之后，还生成了一份 statistic.csv 逗号分隔值文件（用 Excel 打开），与数据存放在相同文件夹之下。由此得到房屋屋顶区域 2021 年每月的太阳辐射量栅格数据以及每个月的低值和高值：\n低值（WH/m²）：1 月 4.23221254349、2 月 5.31080770493、3 月 9.62105178833、4 月 12.2721033096、5 月 12.555768013、6 月 10.0049877167、7 月 14.2893257141、8 月 14.9097099304、9 月 12.1840105057、10 月 6.18915987015、11 月 4.79556846619、12 月 3.67597270012\n高值（WH/m²）：1 月 39828.0976563、2 月 48683.125、3 月 85742.09375、4 月 106786.398438、5 月 108502.523438、6 月 85074.40625、7 月 123380.328125、8 月 129046.210938、9 月 107483.84375、10 月 56247.484375、11 月 44828.5390625、12 月 28945.9609375" },
    { "text": "最后，手动拖入 12 份栅格数据进入 ArcMap 查看有无错误，并修改中文名称为 \"太阳辐射 1 月\" 至 \"太阳辐射 12 月\"。" }
  ],
  [
    { "text": "这一要求可以使用\"与或非\"逻辑解决，借助【ArcToolBox】|【Spatial Analyst】|【地图代数】|【栅格计算器】工具。满足以下任一条件即为可用屋顶：当坡度位于 [0, 15] 度时，可以在任意坡向方向安装太阳能电池板；或者坡度位于 (15, 30] 度之间、且坡向位于 (22.5, 337.5) 度之间；或者坡度位于 (30, 45] 度之间、且坡向位于 (67.5, 292.5) 度之间。" },
    { "text": "计算坡度", "heading": true },
    { "text": "打开【ArcToolBox】|【Spatial Analyst】|【表面分析】|【坡度】，输入 DSM，并在环境中设置 Building 为掩膜。", "image": "https://s1.ax1x.com/2022/07/23/jXwrdJ.png" },
    { "text": "计算 8 月份可用房屋屋顶范围内的太阳辐射量", "heading": true },
    { "text": "在【栅格计算器】中输入逻辑表达式，提取可用房屋屋顶范围内的太阳辐射（其中\"太阳辐射量\\\"表示图层组）。表达式的全文如下：", "image": "https://s1.ax1x.com/2022/07/23/jXwcJ1.png" },
    { "text": "( (\"Slope_DSM.tif\" <= 15)\n + (\"Slope_DSM.tif\" > 15)*(\"Slope_DSM.tif\" <= 30)*(\"Aspect_DSM.tif\" > 22.5)*(\"Aspect_DSM.tif\" < 337.5)\n + (\"Slope_DSM.tif\" > 30)*(\"Slope_DSM.tif\" <= 45)*(\"Aspect_DSM.tif\" > 67.5)*(\"Aspect_DSM.tif\" < 292.5)\n) * \"太阳辐射量\\太阳辐射8月.tif\"" },
    { "text": "将 0 值转化为 NoData", "heading": true },
    { "text": "因为上述逻辑表达式的结果是 \"0\" 或者 \"1\" 与 \"太阳辐射量\\太阳辐射8月.tif\" 进行乘法操作，所以结果中出现了 \"0\"，现在需要将 8 月份可用房屋屋顶范围内的零太阳辐射值变为 NoData。仍然使用【栅格计算器】的 \"SetNull\" 函数，使用之前可查看帮助文档中的语法：", "image": "https://s1.ax1x.com/2022/07/23/jXwgRx.png" },
    { "text": "因此，表达式为：\nSetNull(\"batter_rad_8.tif\", \"batter_rad_8.tif\", \"Value = 0\")\n其中 \"batter_rad_8.tif\" 为上一步的计算结果，此步骤的输出结果为 \"valid_rad_8.tif\"，修改中文名称为 \"可用辐射 8 月\"。" }
  ],
  [
    { "text": "首先为 Building 添加字段【可用面积】与【可用辐射量 8 月】：小数位数为 2 位，数据类型为双精度，精度为 12 位。" },
    { "text": "计算【可用面积】", "heading": true },
    { "text": "上一步骤已经得到可用房屋屋顶范围内的太阳辐射量，此步骤需要计算其面积，而栅格数据计算面积通常是像元总数乘以单个像元大小。因此先查看单个像元大小，发现为 \"1, 1\"，且线性单位为英尺，因此单个像元的面积为 1 平方英尺。" },
    { "text": "对 \"可用辐射 8 月\" 进行区域求和操作（【以表格显示分区统计】），就可以得到每一栋房屋可用屋顶范围内的像元总数，在栅格数据中它通常由 \"COUNT\" 字段来表示。设置界面如下：", "image": "https://s1.ax1x.com/2022/07/23/jXwhLD.png" },
    { "text": "打开 \"area_rad\" 表格可以发现，除了 \"COUNT\" 字段，分区统计工具自动生成了一个 \"AREA\" 属性字段，并且两者相等没有差别，单位是平方英尺，后面使用 \"AREA\" 继续计算。此外，\"SUM\" 字段表示可用房屋屋顶范围内的太阳辐射量之和（此时 SUM 没有乘以面积，因此没有具体意义，但在后续过程会用到）。" },
    { "text": "连接 Building 与 area_rad 表格。" },
    { "text": "使用【字段计算器】将面积的单位从平方英尺转换为平方米（1 平方英尺 = 0.093 平方米），完成【可用面积】的赋值，表达式如下所示：", "image": "https://s1.ax1x.com/2022/07/24/jXjekF.png" },
    { "text": "计算【可用辐射量 8 月】", "heading": true },
    { "text": "首先【按属性选择】可用面积大于 25 平方米的房屋屋顶（可用面积小于 25 平方米的房屋不适合安装太阳能电池板，无需计算可接收太阳辐射量），然后在属性表中点击【显示所选记录】按钮，如下图标注：", "image": "https://s1.ax1x.com/2022/07/24/jXjVTU.png" },
    { "text": "然后右键字段名称【可用辐射量 8 月】，打开【字段计算器】。这里可以理解为使用微积分的思想计算每栋房屋的太阳辐射量，即：\nRadiate_sum = ∮ E(x, y)·dS = Σ E(xi, yi)·ΔS（对屋顶面 S 积分）" },
    { "text": "其中 ΔS 是 1 平方英尺（换算成平方米需乘以 0.093），而前面提到的 SUM 字段则表示 Σ E(xi, yi)。因此【字段计算器】中输出的表达式如下所示（注意输出单位是千瓦时，因此需要乘以 0.001）：", "image": "https://s1.ax1x.com/2022/07/24/jXjAmV.png" },
    { "text": "输出结果后取消【按属性选择】，回到正常的属性表界面，即可看到计算结果。最后取消 Building 与 area_rad 之间的连接。" }
  ]
]

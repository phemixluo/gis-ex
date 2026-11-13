// 第十一届下午 · 小学步行服务绩效 —— 解析摘录
export const note = "来源：微信公众号「小火苗GIS」《全国大学生GIS技能大赛——第十一届下午题》解析文章。解析操作基于 ArcGIS 桌面版（空间连接、频数统计、要素数据集/网络数据集、Network Analyst 最近设施点与 OD 成本矩阵、拓扑检查、方向分布（标准差椭圆）、布局制图等），原文未注明具体软件版本。#非官方答案，仅代表作者个人观点#"
export const overview = [
  { "text": "题目要求", "heading": true },
  { "text": "某地区教育部门正在评估小学空间服务绩效。以学区为单位，通过步行可达性和步行安全性两个标准，评估小学空间服务绩效。" },
  { "text": "题目共设六个任务：\n1. 为各个居住小区分配常住人口数\n2. 创建道路网络\n3. 步行上学可达性评价\n4. 步行上学安全性评价\n5. 小学学区内住宅分布范围分析\n6. 最终成果制图" },
  { "text": "作者复盘提示（文末总结）：在赛题过程中存在几点不足——一方面，最近邻设施点分析中的路径条数仅有291条，与理论条数303条存在差距，但整体流程并无太大影响；再者，在做安全性分析时采用的是可达性数据（OD直线）与主干道进行拓扑检查（考虑到实际情况，可采用第2题生成的原始路径进行分析）；最后，在做小学人口覆盖时的方向分布（标准差椭圆）报错未能解决，作者欢迎读者讨论。" }
]
export const stepBlocks = [
  [
    { "text": "1. 为各个居住小区分配常住人口数", "heading": true },
    { "text": "（1）新建数据库：结果数据库.gdb，要求在此数据库下保留结果。" },
    { "text": "（2）分析需要把各个学区人口平均分配到各个居住小区，计算公式：各个学区人口/小区个数。运用【空间连接】工具，让“居住小区分析”图层得到Name和人口信息。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDNODwP2kA13gyo29Gj9BldgRJ0E0SjtZuRKC9u1l5FwUG6RPkWXbzLw/640?wx_fmt=png" },
    { "text": "（3）运用【频数】工具，根据上步【空间连接】得到的“居住小区分析”，按Name字段进行频数统计，计算每个学区内小区个数。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDvfgvMMNmwiaKaicOY9B2sknibLPicSGRpsicSjoJ5gyG0YuL1yd3icp9UqibQ/640?wx_fmt=png" },
    { "text": "（4）添加小区人口字段，该字段可在属性连接前添加，然后计算每个居住小区平均人口=学区人口*10000/学区内小区个数。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDF6Q3xc3ozia4FZ2qQEvSfjaFuTj9sdWIZwLu6N5QDSgkwfvsKHXW5xg/640?wx_fmt=png" }
  ],
  [
    { "text": "2. 创建道路网络", "heading": true },
    { "text": "（1）由于赛题已经明确不需要对道路数据进行打断等处理，那么我们就不用对数据进行【拓扑检查】。例如，某些试题会“挖坑”，不进行打断相交点以及道路连接等操作时无法正常进行网络数据集构建；本赛题可直接根据道路数据进行网络数据集的创建。" },
    { "text": "（2）数据库中新建要素集，并将道路数据进行导入。" },
    { "text": "（3）设置成本属性时，设置其shape_Length（单位：米）。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDaxdICd5jn2k0oLb03ekiaCibw9uDPMicP8nnPz1ibKdPghXhk7xbWRW8nw/640?wx_fmt=png" },
    { "text": "（4）考虑到该题是求解小区到学校的最近距离，且是多个小区到居住学区内同一所学校的路径分析，选择【最近设施点分析】。设施点为小学，事件点为居住小区。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDIcpcRBMW387rlVopypbl8WG1qRyFlSTeDDxnlTicSqunbplicT5pL4ww/640?wx_fmt=png" },
    { "text": "（5）考虑到仅允许在各自学区范围内的小学进行上学，设置面障碍图层为学区图层，进行求解时发现报错，可以换个思路，将面要素转为线要素后，再作为线障碍进行分析。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDYpVGeiccuAHVa1tp3SZY6lKoOFu4KvsERKGPEqcqdjc3AjoNwKuibtjA/640?wx_fmt=png" },
    { "text": "（6）在进行分析前，查看是否勾选了Oneway。由于赛题中明确指出不考虑单行道条件要求，所以此处不需要进行勾选（如果勾选则某些小区会因单行道因素影响不能形成到达小学的路径）。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDmf2icVAEqhd4pwRoxKUStj5vYZicbIWQg0ExQQhcW4NavczAu7dg42bg/640?wx_fmt=png" },
    { "text": "求解结果发现，整体上能实现对每个小区就近上学的需求，但同时也存在事件点未能找到设施点的问题。如果进行分区块单独进行统计分析，则未发现该问题，但小火始终坚信作为竞赛类题目，最优解、最省时的解法不会是单独分析，该问题也并没有找到实际解决的办法，共有12个小区没有路径。（小火在比赛时采用的是每个学区与每个小学进行单独求解计算，然后对结果进行合并）", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDw5jU6W71qGpcZdhiaGQX6IYRBfQPUaONQRqPMDzBs24iaqlE7y5qcslg/640?wx_fmt=png" }
  ],
  [
    { "text": "3. 步行上学可达性评价", "heading": true },
    { "text": "（1）题目要求居住小区和对应的小学用直线连接。从上一步骤我们可以得知，最邻近设施点分析仅能停留在道路数据上，并不能将小区与小学进行直线连接，涉及直线连接需用OD成本矩阵，但需要考虑的因素在于，该连线是一个小学对应多个居住小区。其中起始点选择居住小区，目的地选择小学（起始点与目的地相反，理论上前后得到的结果是一样的，但编码则不同，为了与上一步的编码保持统一，可以进一步筛选出结果），同样设置学区Line作为线障碍。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDNeqEe9fjZjoEcBKWMU7ndmaNhwgnnKRPNhAOQmjh7kJRwUl2wwsGiaw/640?wx_fmt=png" },
    { "text": "（2）然后根据两个表格中的共同字段进行连接，便可得到其对应的OD矩阵情况。目前小火想到的最佳方案（事后卧龙，比赛时并没有意识到）：OD成本矩阵_编码与步行上学路线OD进行连接。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDcPw8AkVDSX38LH9F6c4P6Gh7aI8YYExKazLbQMI4ibb6S7ZZNMBnayw/640?wx_fmt=png" },
    { "text": "（3）然后【按属性选择】，连接结果中选择非空字段部分即可，并没有固定要求，这里数量为291条，理论上应该303条（这与第一步骤中丢失的12条相关）。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDafwWE7icZ8nEJuVXf31wqpjkv7103GCsNbg473d1khanKqCc0l4ZpbQ/640?wx_fmt=png" },
    { "text": "（4）根据Total_长度字段，按照赛题要求进行赋值（这里运用Python代码块进行）：" },
    { "text": "def num(x):\n    if x < 1000.0:\n        return \"高可达性\"\n    if (x > 1000) and (x <= 2000):\n        return \"中可达性\"\n    if (x > 2000):\n        return \"低可达性\"", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDHYQa0WjwkaKyAlvAsKDBq1pkqf24PX7akJzGewTDJAy7RyNfYfkpVw/640?wx_fmt=png" },
    { "text": "（5）根据赛题公式依次计算高可达性的覆盖率。通过上一步骤得到的步行直线数据（OD成本矩阵），【按属性选择】选中“高可达性路线”，然后再通过【按位置选择】选中与赛题刚开始得到的“居住小区分析”数据。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDKDRFia5D0TL7SgyyibsjEKia7Gr7gia8LSW1On1KGib0XcW4q5EYBZpPFuQ/640?wx_fmt=png" },
    { "text": "（6）然后按照其居住小区“Name”字段进行【汇总统计】。由于赛题仅要求做高可达性的专题图，因此仅对高可达性区域进行统计。" },
    { "text": "（7）对统计结果与学区进行属性连接，根据其Name字段并计算高可达性覆盖率，计算公式：[SUM_小区人口] / ([人口] * 10000)，绘制专题图。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDhRX0lf6GEg9ibhYC5hAwTVqGxxDgDt3c6nPZdIyeo8axstbK2ADTdgA/640?wx_fmt=png" }
  ],
  [
    { "text": "4. 步行上学安全性评价", "heading": true },
    { "text": "（1）运用【按属性选择】工具，提取出城市主干道要素，导出至数据集命名为城市主干道。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDiat6lib111GMRXypoawN5eiclosh7icLawCxrVzQBZMZzGcMwicWKJ5J1Ag/640?wx_fmt=png" },
    { "text": "（2）对提取出来的城市主干道信息，按照其tunnel字段进行【融合】。由于不同主干道类别不同，但基于的穿越次数相同，融合成一个要素便于统计分析。（当然新建一个字段也是可以的）", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDM6M9XTBZm0V7chl8BZIearIKHKSJ0tWbOcbhNtUYht9Guk1SRSnsGQ/640?wx_fmt=png" },
    { "text": "（3）运用【拓扑检查】，对城市主干道_disslove与第三题得到的最短步行直线距离数据进行拓扑检查，添加拓扑规则为“不能与其他要素相交”。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDezNSzJibDHq0s5XEIqDojUIbhOiaud5YLBNHe3MM2L9eVfNRsiadzQ8iaw/640?wx_fmt=png" },
    { "text": "（4）查看拓扑错误器可以发现，共计117个错误，随后通过拓扑错误进而计算去上学时穿越主干道的次数。" },
    { "text": "（5）将拓扑错误进行导出【导出拓扑错误】，得到的错误包括点、线、面错误等。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDEXI0f4qpLCgZKUGMdRNsVImzJypImUmTv1dGBoxXJDUjhLibm2McJmw/640?wx_fmt=png" },
    { "text": "（6）频数统计Feature_1字段中要素编码出现的次数。（OriginObjectID字段）" },
    { "text": "（7）将“最短步行直线距离”的Object与Feature_1字段进行属性连接，并将其导出，其中属性表中为NULL的为高安全区域。" },
    { "text": "（8）与第二题选择居住小区方法相同，通过【按属性选择】得到高安全的通行路线，然后【按位置选择】得到。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDOA1Lrgw6gX6icFUMWgSAVxDvht1rKdwroXgiaLow49ibgDBhcicF7Fc2pw/640?wx_fmt=png" },
    { "text": "（9）与学区进行属性连接，计算得到高安全性覆盖情况。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDI0fHsIfDbSrlRclxzVraiaqa6X1glNqWdADvMmGZicvn65icknmHVNnDQ/640?wx_fmt=png" }
  ],
  [
    { "text": "5. 小学学区内住宅分布范围分析", "heading": true },
    { "text": "（1）针对该问题，小火表示有所歧义，默认为第一题对应的最邻近的分配结果。在“最短步行直线距离”图层中添加“编码”字段，运用【字段计算器】中的截取功能，截取得到“最短步行直线距离”对应的“居住小区”编码，对应表达式：Left( [Name], 3 )，截取前三位编码。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDQ8CuhevF95kopW9bKuOQfhnG7ohsePcy88E2xXGqQoYVWxD7WC1ANg/640?wx_fmt=png" },
    { "text": "（2）然后根据上一步骤得到的编码字段，与居住小区分析进行属性连接，将其结果进行导出，命名为小学_居住连线。再次添加“小学名称”字段，得到小学名称。" },
    { "text": "（3）按照小学名称字段进行汇总统计，统计小区人口总数。" },
    { "text": "（4）小学人口总数与小学分析进行属性关联。" },
    { "text": "（5）运用【方向分布】（标准差椭圆）工具时，赛题中要求以椭圆的形式显示，但是小火做了若干次方向分布以后仍然会报错，最后去分析了一下其中原理，发现单个点并不能去表示其趋势和方向，因此保持客观态度，并没有最终的覆盖范围成果图。" }
  ],
  [
    { "text": "6. 最终成果制图", "heading": true },
    { "text": "进行专题图排版制作，【插入数据框】进行格式调整即可。", "image": "https://mmbiz.qpic.cn/mmbiz_png/p9fOfRicuic1fI8VLu6Tv4g97QlPuoCDfDoyzf1apnIBArRlCtQ0pezGkRkw9l8GicKoXiaZ2lSmXujkS73kh3L9FQ/640?wx_fmt=png" }
  ]
]

// 汇总 11 套题的「解析原文摘录」（人工整理版，替代 parsedArticles 运行时粗提取）。
// 每个模块导出 { note, overview, stepBlocks }：
//   note       解析来源与软件说明
//   overview   整题层面的原文内容（题目复述、整体思路等）
//   stepBlocks 按网站任务划分的摘录块数组，顺序与 problems.js 中该题 steps 一一对应

import * as corridor from './excerpts/8-pm-corridor.js'
import * as city from './excerpts/9-pm-city.js'
import * as solar from './excerpts/10-pm-solar.js'
import * as map from './excerpts/11-am-map.js'
import * as school from './excerpts/11-pm-school.js'
import * as base from './excerpts/12-am-base.js'
import * as threeD from './excerpts/12-pm-3d.js'
import * as population from './excerpts/13-am-population.js'
import * as aging from './excerpts/13-pm-aging.js'
import * as wildlife from './excerpts/14-am-wildlife.js'
import * as dam from './excerpts/14-pm-dam.js'

const toEntry = (module) => ({
  note: module.note || '',
  overview: module.overview || [],
  steps: module.stepBlocks || []
})

export const curatedExcerpts = {
  '8-pm-corridor': toEntry(corridor),
  '9-pm-city': toEntry(city),
  '10-pm-solar': toEntry(solar),
  '11-am-map': toEntry(map),
  '11-pm-school': toEntry(school),
  '12-am-base': toEntry(base),
  '12-pm-3d': toEntry(threeD),
  '13-am-population': toEntry(population),
  '13-pm-aging': toEntry(aging),
  '14-am-wildlife': toEntry(wildlife),
  '14-pm-dam': toEntry(dam)
}

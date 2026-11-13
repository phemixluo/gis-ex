import { parsedArticles } from './parsedArticles'

export const articleSources = parsedArticles

export const articleFileByProblem = {
  '8-pm-corridor': 'ArcGIS——第八届全国 GIS 应用技能大赛（下午）_第八届gis应用技能大赛下午-CSDN博客.html',
  '9-pm-city': '第九届全国大学生GIS应用技能大赛下午（试题及参考答案含数据）_第九届全国大学生 gis 技能大赛 下午-CSDN博客.html',
  '10-pm-solar': '第十届全国大学生GIS应用技能大赛试题及参考解题过程(A下午) - 北极洲的小卖部 - 博客园.html',
  '11-am-map': '全国大学生GIS技能大赛 _ 第十一届上午题.html',
  '11-pm-school': '全国大学生GIS技能大赛 _ 第十一届下午题.html',
  '12-am-base': '2023年全国大学生 GIS应用技能大赛试题详解（第一题）.html',
  '12-pm-3d': '2023年全国大学生 GIS应用技能大赛试题详解（第三题）.html',
  '13-am-population': '2024全国大学生GIS应用技能大赛试题详解（上午题目）.html',
  '13-pm-aging': '2024全国大学生GIS应用技能大赛试题详解（下午题目）.html',
  '14-am-wildlife': '2025年全国大学生GIS应用技能大赛（上午）题目详解.html',
  '14-pm-dam': '2025全国大学生GIS应用技能大赛（下午）试题详解.html'
}

const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim()

const romanTask = (value) => {
  const map = { 一: 0, 二: 1, 三: 2, 四: 3, 五: 4, 六: 5, 七: 6, 八: 7, 九: 8, 十: 9 }
  return map[value] ?? null
}

const taskIndexFromText = (text, fallback) => {
  const explicit = text.match(/(?:任务|题目|要求)\s*([一二三四五六七八九十]|\d+)/)
  if (explicit) {
    const raw = explicit[1]
    return /^\d+$/.test(raw) ? Number(raw) - 1 : romanTask(raw)
  }
  const numbered = text.match(/^(\d+)\.(\d+)/)
  if (numbered) return Number(numbered[2]) - 1
  return fallback
}

const isHeading = (text) => /^(?:任务|题目|要求)\s*[一二三四五六七八九十\d]/.test(text) || /^\d+\.\d+(?:\.\d+)?\s/.test(text) || /^\d+[、.]\s?[^。]{2,}$/.test(text)

export function parseArticleHtml(html) {
  if (Array.isArray(html)) return html
  if (!html || typeof DOMParser === 'undefined') return []
  const document = new DOMParser().parseFromString(html, 'text/html')
  const root = document.querySelector('#js_content') || document.querySelector('.article_content') || document.querySelector('.postBody') || document.body
  const candidates = [...root.querySelectorAll('section, p, h1, h2, h3, h4, h5, h6, li')]
    .filter((node) => node.tagName !== 'SECTION' || !node.querySelector('section'))
  const blocks = []
  let currentTask = null
  const seen = new Set()
  for (const node of candidates) {
    const text = normalize(node.textContent)
    if (!text || text.length < 3 || seen.has(text)) continue
    seen.add(text)
    const nextTask = taskIndexFromText(text, currentTask)
    if (isHeading(text) || /^(?:任务|题目|要求)/.test(text)) currentTask = nextTask
    const image = node.querySelector('img')
    blocks.push({
      text,
      taskIndex: currentTask,
      heading: isHeading(text),
      method: /^方法\s*[一二三四五六七八九十\d]/.test(text),
      image: image?.getAttribute('data-src') || image?.getAttribute('src') || ''
    })
  }
  return blocks
}

const parsedCache = new Map()
export function getArticleBlocks(problemId) {
  const file = articleFileByProblem[problemId]
  if (!file) return []
  if (!parsedCache.has(problemId)) parsedCache.set(problemId, parseArticleHtml(articleSources[file]))
  return parsedCache.get(problemId)
}

// 校验 src/data/excerpts/<problemId>.js 的结构完整性与内容量
// 用法: node scripts/validate-excerpts.mjs [problemId ...]   (无参数 = 全部)
import { pathToFileURL } from 'node:url'
import { problems } from '../src/data/problems.js'
import { curatedExcerpts } from '../src/data/analysisExcerpts.js'

const ids = process.argv.slice(2)
const targets = ids.length ? ids : problems.map((p) => p.id)
let failed = 0

for (const id of targets) {
  const problem = problems.find((p) => p.id === id)
  const entry = curatedExcerpts[id]
  const issues = []
  if (!problem) { console.log(`✗ ${id}: problems.js 中不存在`); failed++; continue }
  if (!entry) { console.log(`✗ ${id}: curatedExcerpts 缺少该条目`); failed++; continue }
  if (typeof entry.note !== 'string') issues.push('note 不是字符串')
  if (!Array.isArray(entry.overview)) issues.push('overview 不是数组')
  if (!Array.isArray(entry.steps)) issues.push('steps 不是数组')
  else {
    if (entry.steps.length !== problem.steps.length)
      issues.push(`steps 数量 ${entry.steps.length} ≠ 网站任务数 ${problem.steps.length}`)
    entry.steps.forEach((blocks, i) => {
      if (!Array.isArray(blocks)) { issues.push(`steps[${i}] 不是数组`); return }
      blocks.forEach((b, j) => {
        if (!b || typeof b.text !== 'string' || !b.text.trim())
          issues.push(`steps[${i}][${j}] 缺 text`)
      })
    })
  }
  const stepChars = entry.steps.map((b) => (b || []).reduce((n, x) => n + (x.text || '').length, 0))
  const overviewChars = (entry.overview || []).reduce((n, x) => n + (x.text || '').length, 0)
  const total = stepChars.reduce((a, b) => a + b, 0) + overviewChars
  const emptySteps = stepChars.map((c, i) => (c === 0 ? i + 1 : 0)).filter(Boolean)
  if (issues.length) { console.log(`✗ ${id}: ${issues.join('; ')}`); failed++ }
  else {
    console.log(`✓ ${id}: steps=${entry.steps.length} 块数=[${stepChars.map((c, i) => entry.steps[i].length).join(',')}] 字数=[${stepChars.join(',')}] overview=${overviewChars}字 总计=${total}字${emptySteps.length ? ` 空步骤:${emptySteps.join(',')}` : ''}`)
  }
}
process.exit(failed ? 1 : 0)

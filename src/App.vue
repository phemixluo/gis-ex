<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { methodGroups, problems } from './data/problems'
import { curatedExcerpts } from './data/analysisExcerpts'

const selectedYear = ref('全部届次')
const selectedSession = ref('全部场次')
const selectedType = ref('全部方法')
const selectedQuestionId = ref('')

const years = ['全部届次', ...[...new Set(problems.map((problem) => problem.year))].sort((a, b) => Number(b) - Number(a))]
const sessions = ['全部场次', '上午', '下午']
const filteredProblems = computed(() => problems.filter((problem) =>
  (selectedYear.value === '全部届次' || problem.year === selectedYear.value) &&
  (selectedSession.value === '全部场次' || problem.session === selectedSession.value) &&
  (selectedType.value === '全部方法' || problem.type === selectedType.value)
))
const questionCards = computed(() => filteredProblems.value.flatMap((problem) => problem.steps.map((step, index) => ({
  id: `${problem.id}-${index}`, problem, step, index
}))))
const selectedQuestion = computed(() => {
  const match = selectedQuestionId.value.match(/^(.+)-(\d+)$/)
  if (!match) return null
  const problem = problems.find((item) => item.id === match[1])
  const index = Number(match[2])
  return problem?.steps[index] ? { problem, step: problem.steps[index], index } : null
})
const selectedExcerpt = computed(() => {
  const question = selectedQuestion.value
  if (!question) return null
  return curatedExcerpts[question.problem.id] || null
})
const selectedArticleOverview = computed(() => selectedExcerpt.value?.overview || [])
const selectedArticleBlocks = computed(() => {
  const question = selectedQuestion.value
  if (!question || !selectedExcerpt.value) return []
  let counter = 0
  return (selectedExcerpt.value.steps[question.index] || [])
    .map((block) => ({ ...block, displayIndex: block.heading || block.method ? null : ++counter }))
})
const selectedArticleNote = computed(() => selectedExcerpt.value?.note || '')

function blockImages(block) {
  return Array.isArray(block.image) ? block.image : (block.image ? [block.image] : [])
}

function openQuestion(id) {
  selectedQuestionId.value = id
  window.location.hash = `question=${id}`
  window.setTimeout(() => document.querySelector('#detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20)
}

function closeProblem() {
  selectedQuestionId.value = ''
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
}

function resetFilters() {
  selectedYear.value = '全部届次'
  selectedSession.value = '全部场次'
  selectedType.value = '全部方法'
}

function readHash() {
  const id = new URLSearchParams(window.location.hash.slice(1)).get('question')
  const match = id?.match(/^(.+)-(\d+)$/)
  if (match && problems.some((problem) => problem.id === match[1])) selectedQuestionId.value = id
}

onMounted(() => {
  readHash()
  window.addEventListener('hashchange', readHash)
})
onUnmounted(() => window.removeEventListener('hashchange', readHash))
</script>

<template>
  <main>
    <section class="hero" aria-labelledby="page-title">
      <nav class="topbar" aria-label="站点导航">
        <a class="brand" href="#top" aria-label="返回首页"><span class="brand-mark">◇</span> GIS 解题地图集</a>
        <span class="nav-note">全国大学生 GIS 应用技能大赛 · 备赛复习</span>
      </nav>
      <div class="hero-contours" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="hero-copy" id="top">
        <p class="eyebrow">从数据到决策，把题目读成一条空间分析路径</p>
        <h1 id="page-title">把每一道 GIS 题<br><em>走成一张地图</em></h1>
        <p class="hero-description">11 道真题，覆盖第八至第十四届。点击题目，沿着数据、工具、判断与成果，一步步复盘解题思路。</p>
        <a class="hero-link" href="#atlas">开始复习 <span>↓</span></a>
      </div>
      <div class="hero-orbit" aria-hidden="true">
        <div class="orbit-ring ring-one"></div><div class="orbit-ring ring-two"></div>
        <div class="orbit-node origin">数据</div><div class="orbit-node process">模型</div><div class="orbit-node result">成果</div>
      </div>
    </section>

    <section class="atlas" id="atlas" aria-labelledby="atlas-title">
      <header class="section-heading">
        <div><p class="eyebrow ink">题目索引</p><h2 id="atlas-title">选择你的复习路线</h2></div>
        <p>{{ questionCards.length }} 个任务 · {{ filteredProblems.length }} 套题</p>
      </header>

      <div class="filter-panel" aria-label="题目筛选">
        <label><span>届次</span><select v-model="selectedYear"><option v-for="year in years" :key="year" :value="year">{{ year === '全部届次' ? year : `第${year}届` }}</option></select></label>
        <label><span>场次</span><select v-model="selectedSession"><option v-for="session in sessions" :key="session">{{ session }}</option></select></label>
        <label><span>方法</span><select v-model="selectedType"><option v-for="type in methodGroups" :key="type">{{ type }}</option></select></label>
        <button class="reset" type="button" @click="resetFilters">清除筛选</button>
      </div>

      <div class="timeline" aria-label="届次时间轨道">
        <button v-for="year in years.slice(1)" :key="year" type="button" :class="{ active: selectedYear === year }" @click="selectedYear = selectedYear === year ? '全部届次' : year">
          <b>第{{ year }}届</b>
        </button>
      </div>

      <div v-if="questionCards.length" class="card-grid">
        <article v-for="question in questionCards" :key="question.id" class="problem-card question-card" tabindex="0" @click="openQuestion(question.id)" @keydown.enter="openQuestion(question.id)">
          <div class="card-top"><span class="edition">第{{ question.problem.year }}届 · {{ question.problem.session }} · 任务 {{ String(question.index + 1).padStart(2, '0') }}</span></div>
          <div class="card-map" :class="`map-${question.problem.type}`" aria-hidden="true"><span></span><span></span><span></span></div>
          <p class="card-accent">{{ question.problem.accent }} · {{ question.problem.title }}</p><h3>{{ question.step.title }}</h3><p class="scenario">{{ question.step.detail }}</p>
          <div class="tags"><span>{{ question.step.tool }}</span><span>{{ question.problem.type }}</span></div>
          <button type="button" class="card-action" tabindex="-1">查看任务拆解 <span>→</span></button>
        </article>
      </div>
      <div v-else class="empty-state"><p>没有匹配的题目。</p><button type="button" @click="resetFilters">恢复全部题目</button></div>
    </section>

    <section v-if="selectedQuestion" id="detail" class="detail" aria-live="polite">
      <div class="detail-inner">
        <button class="back" type="button" @click="closeProblem">← 返回任务索引</button>
        <header class="detail-header"><div><p class="eyebrow">第{{ selectedQuestion.problem.year }}届 · {{ selectedQuestion.problem.session }} · {{ selectedQuestion.problem.type }} · 任务 {{ String(selectedQuestion.index + 1).padStart(2, '0') }}</p><h2>{{ selectedQuestion.step.title }}</h2><p>{{ selectedQuestion.problem.title }}：{{ selectedQuestion.problem.scenario }}</p></div></header>
        <div class="detail-shell">
          <aside class="detail-sidebar" aria-label="本套题任务目录">
            <p class="sidebar-kicker">本套题任务目录</p>
            <button v-for="(task, index) in selectedQuestion.problem.steps" :key="task.title" type="button" :class="{ active: index === selectedQuestion.index }" @click="openQuestion(`${selectedQuestion.problem.id}-${index}`)"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ task.title.replace(/^任务[一二三四五六七八九十]+：|^题目[一二三四五六七八九十]+：/, '') }}</button>
          </aside>
          <article class="detail-reading">

        <section class="route-section" aria-labelledby="route-title"><div class="detail-label"><span>01</span><h3 id="route-title">所在任务路线</h3><p>当前任务在整套题目中的位置。</p></div><div class="route-track"><div class="route-line"></div><div v-for="(step, index) in selectedQuestion.problem.steps" :key="step.title" class="route-point" :class="{ current: index === selectedQuestion.index }"><i>{{ String(index + 1).padStart(2, '0') }}</i><strong>{{ step.title }}</strong><small>{{ step.tool }}</small></div></div></section>

        <section class="steps-section" aria-labelledby="steps-title"><div class="detail-label"><span>02</span><h3 id="steps-title">任务内小问拆解</h3><p>按题目小问与解析中的执行顺序复习。</p></div><article class="question-focus"><h4>{{ selectedQuestion.step.title }}</h4><p>{{ selectedQuestion.step.detail }}</p><div v-if="selectedQuestion.step.methods?.length" class="method-stack"><div v-for="method in selectedQuestion.step.methods" :key="method.name" class="method-card"><b>{{ method.name }}</b><p>{{ method.detail }}</p></div></div><ol class="operation-list"><li v-for="operation in selectedQuestion.step.operations || []" :key="operation.text"><span class="operation-text">{{ operation.text }}</span><span class="operation-tool">{{ operation.tool }}</span></li></ol><div class="focus-tool">任务主线工具：{{ selectedQuestion.step.tool }}</div></article></section>

        <section v-if="selectedArticleOverview.length || selectedArticleBlocks.length" class="source-reading" aria-labelledby="source-reading-title"><div class="detail-label"><span>03</span><h3 id="source-reading-title">对应解析原文摘录</h3><p>整理自对应解析文章，保留原文的具体操作、参数提示与多解方法，仅作格式与文字上的轻度梳理。</p><p v-if="selectedArticleNote" class="source-note">{{ selectedArticleNote }}</p></div><div class="source-reading-body"><div v-if="selectedArticleOverview.length" class="source-overview"><p class="source-overview-kicker">整题导读</p><div v-for="(block, blockIndex) in selectedArticleOverview" :key="`overview-${blockIndex}`" class="source-block-item" :class="{ 'source-heading': block.heading, 'source-method': block.method }"><div><h4 v-if="block.heading || block.method">{{ block.text }}</h4><p v-else>{{ block.text }}</p><img v-for="url in blockImages(block)" :key="url" :src="url" alt="解析文章中的操作示意图" loading="lazy" /></div></div></div><div v-for="(block, blockIndex) in selectedArticleBlocks" :key="`${block.text}-${blockIndex}`" class="source-block-item" :class="{ 'source-heading': block.heading, 'source-method': block.method }"><div v-if="block.displayIndex" class="source-block-marker" aria-hidden="true">{{ String(block.displayIndex).padStart(2, '0') }}</div><div><p v-if="block.method" class="source-block-label">方法分支</p><h4 v-if="block.heading || block.method">{{ block.text }}</h4><p v-else>{{ block.text }}</p><img v-for="url in blockImages(block)" :key="url" :src="url" alt="解析文章中的操作示意图" loading="lazy" /></div></div></div></section>

        <div class="detail-columns"><section><div class="detail-label"><span>04</span><h3>整题关键工具</h3></div><div class="tool-cloud"><span v-for="tool in selectedQuestion.problem.tools" :key="tool">{{ tool }}</span></div></section><section class="pitfalls"><div class="detail-label"><span>05</span><h3>易错点</h3></div><ul><li v-for="pitfall in selectedQuestion.problem.pitfalls" :key="pitfall">{{ pitfall }}</li></ul></section></div>

        <footer class="source-block"><div><p class="eyebrow">资料来源</p><p>原题与对应解析按届次、场次严格匹配。</p></div><div class="source-links"><a v-for="item in selectedQuestion.problem.sources" :key="item.url" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} <span>↗</span></a></div></footer>
          </article>
        </div>
      </div>
    </section>

    <footer class="site-footer"><span>GIS Solution Atlas</span><span>为复盘而设计 · 题解为学习整理，非官方标准答案</span></footer>
  </main>
</template>

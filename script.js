// 题目数据
const quizData = [
    {
        question: "HTML代表什么？",
        options: ["超文本标记语言", "高级编程语言", "数据库语言", "样式表语言"],
        answer: 0
    },
    {
        question: "哪个标签用来引入外部CSS？",
        options: ["<script>", "<link>", "<meta>", "<style>"],
        answer: 1
    },
    {
        question: "JS中console.log作用是？",
        options: ["弹出提示框", "控制台打印信息", "修改网页样式", "跳转页面"],
        answer: 1
    },
    {
        question: "CSS是用来做什么的？",
        options: ["页面结构", "页面样式美化", "交互逻辑", "存储数据"],
        answer: 1
    }
];

// 获取元素
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const tipEl = document.getElementById('tip');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

let currentIndex = 0;
let score = 0;

// 渲染当前题目
function renderQuestion(){
    // 清空
    tipEl.textContent = "";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    const current = quizData[currentIndex];
    questionEl.textContent = current.question;

    // 生成选项
    current.options.forEach((opt, idx)=>{
        const div = document.createElement('div');
        div.className = "option-item";
        div.textContent = opt;
        div.dataset.index = idx;
        div.addEventListener('click', selectAnswer);
        optionsEl.appendChild(div);
    })
}

// 选择答案
function selectAnswer(e){
    const allOpts = document.querySelectorAll('.option-item');
    // 禁止再次点击
    allOpts.forEach(item=> item.style.pointerEvents = "none");

    const selectedIdx = Number(e.target.dataset.index);
    const correctIdx = quizData[currentIndex].answer;

    if(selectedIdx === correctIdx){
        e.target.classList.add('right');
        tipEl.textContent = "✅回答正确！";
        score += 10;
        scoreEl.textContent = score;
    }else{
        e.target.classList.add('wrong');
        tipEl.textContent = "❌回答错误";
        // 标出正确答案
        allOpts[correctIdx].classList.add('right');
    }
    nextBtn.style.display = "block";
}

// 下一题按钮
nextBtn.addEventListener('click', ()=>{
    currentIndex++;
    if(currentIndex >= quizData.length){
        tipEl.textContent = `游戏结束！你的总分：${score}`;
        nextBtn.style.display = "none";
    }else{
        renderQuestion();
    }
})

// 初始化加载第一题
renderQuestion();


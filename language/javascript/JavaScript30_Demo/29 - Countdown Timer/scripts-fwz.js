let timer = null
const buttons = document.querySelectorAll('button')
const timeLeft = document.querySelector('.display__time-left')
const timeEnd = document.querySelector('.display__end-time')

function startTimer(seconds) {
    clearInterval(timer);
    // 计算时间
    const now = Date.now()
    const then = now + seconds * 1000
    showLeftTime(seconds);
    showEndTime(then)
    timer = setInterval(() => {
        seconds--;
        showLeftTime(seconds);
        if (seconds < 1) {
            clearInterval(timer);
            return;
        }
    }, 1000)
}

function formatTime(sec) {
    let i = Math.floor(sec / 3600);
    let i2 = i % 24;
    const hours = Math.floor(sec / 3600) % 24;
    sec = sec % 3600;
    const min = Math.floor(sec / 60);
    sec = sec % 60;
    const res = (hours > 0 ? hours + ':' : '') +
        formatUnit(min) + ':' +
        formatUnit(sec)
    return res;
}

function formatUnit(num) {
    return num < 10 ? '0' + num : num
}

function showLeftTime(seconds) {
    let str = formatTime(seconds);
    document.title = str;
    timeLeft.innerText = str;
}

function showEndTime(seconds) {
    // 新建date对象
    const end = new Date(seconds);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    // 注意新写法
    timeEnd.innerText = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function setTime() {
    let leftTime = parseInt(this.dataset.time);
    startTimer(leftTime);
}

buttons.forEach(button => button.addEventListener('click', setTime));
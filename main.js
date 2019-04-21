var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5

//新建画板
autoSetCanvasSize(yyy)
//监听用户
listenToUser(yyy)
//橡皮擦功能
var eraserEnabled = false
pencil.onclick = function(){
  eraserEnabled = false
  pencil.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pencil.classList.remove('active')
}
//清理页面功能
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height)
}
//保存功能
save.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画板'
  a.target = '_blank'
  a.click()
}
//画笔颜色功能
black.onclick = function(){
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  orange.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  cyan.classList.remove('active')
  blue.classList.remove('active')
  purple.classList.remove('active')
}
red.onclick = function(){
  context.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  orange.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  cyan.classList.remove('active')
  blue.classList.remove('active')
  purple.classList.remove('active')
}
orange.onclick = function(){
  context.strokeStyle = 'orange'
  orange.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  cyan.classList.remove('active')
  blue.classList.remove('active')
  purple.classList.remove('active')
}
yellow.onclick = function(){
  context.strokeStyle = 'yellow'
  yellow.classList.add('active')
  black.classList.remove('active')
  orange.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  cyan.classList.remove('active')
  blue.classList.remove('active')
  purple.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green'
  green.classList.add('active')
  black.classList.remove('active')
  orange.classList.remove('active')
  yellow.classList.remove('active')
  red.classList.remove('active')
  cyan.classList.remove('active')
  blue.classList.remove('active')
  purple.classList.remove('active')
}
cyan.onclick = function(){
  context.strokeStyle = 'cyan'
  cyan.classList.add('active')
  black.classList.remove('active')
  orange.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  purple.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  black.classList.remove('active')
  orange.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  cyan.classList.remove('active')
  red.classList.remove('active')
  purple.classList.remove('active')
}
purple.onclick = function(){
  context.strokeStyle = 'purple'
  purple.classList.add('active')
  black.classList.remove('active')
  orange.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  cyan.classList.remove('active')
  blue.classList.remove('active')
  red.classList.remove('active')
}
//选择画笔粗细
thin.onclick = function(){
  lineWidth = 5
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function(){
  lineWidth = 10
  thick.classList.add('active')
  thin.classList.remove('active')
}
/***工具函数***/
//新建画板
function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
    context.fillStyle = 'white'
    context.fillRect(0,0,yyy.width,yyy.height)
  }
}
//画圆和线
function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.stroke()
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}
//监听
function listenToUser(canvas){
  var using = false
  var lastPoint = { x: undefined, y: undefined }
  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (aaa) {
      using = false
    }
  } else {
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (aaa) {
      using = false
    }
  }
}





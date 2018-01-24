Initvariable()

drawInit(canvas, context)

colorInit(context)

BrushSize_Init()

autoSetCanvas(canvas)

creatBackground(canvas)

listenTo_User(canvas)

//--------------------------------------------------------------------工具函数------------------------------------------------------------------//
//变量初始化
function Initvariable() {
  window.canvas = document.getElementById('canvas')
  window.context = canvas.getContext('2d')
  window.using = false
  window.userEraser = false
  window.lastPoint = { x: 'null', y: 'null' }
  window.lineWidth = 2
  window.circlewidth = 1
}

//绘图按键初始化
function drawInit(canvas, context) {
  eraser.onclick = function() {
    userEraser = true
    actions.className = 'actions x'
    eraser.classList.add('active')
    pen.classList.remove('active')
  }

  pen.onclick = function() {
    userEraser = false
    actions.className = 'actions '
    pen.classList.add('active')
    eraser.classList.remove('active')
  }

  clear.onclick = function() {
    clear.classList.add('active1')
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  Save.onclick = function() {
    var Url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = Url
    a.download = '你的作品'
    a.click()
  }

  //撤销功能待完善
  cancel.onclick = function(context) {
    context.Save()
    context.restore()
  }
}

//颜色按键初始化

function colorInit(context,a) {
  red.onclick = function(a) {
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
  }

  orange.onclick = function or(a) {
    context.strokeStyle = 'orange'
    context.fillStyle = 'orange'
  }
  green.onclick = function(a) {
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    console.log(a.path[0].id)
  }
  blue.onclick = function(a) {
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    console.log(a.path[0].id)
  }
  yellow.onclick = function(a) {
    context.strokeStyle = 'yellow'
    context.fillStyle = 'yellow'
    console.log(a.path[0].id)
  }
  purple.onclick = function(a) {
    context.strokeStyle = 'purple'
    context.fillStyle = 'purple'
    console.log(a.path[0].id)
  }
  grey.onclick = function(a) {
    context.strokeStyle = 'grey'
    context.fillStyle = 'grey'
    console.log(a.path[0].id)
  }
  black.onclick = function(a) {
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    console.log(a.path[0].id)
  }
}

//画笔粗细初始化
function BrushSize_Init() {
  thin.onclick = function() {
    lineWidth = 2
    circlewidth = 1
    thin.classList.add('active2')
    thick.classList.remove('active2')
    thicker.classList.remove('active2')
  }
  thick.onclick = function() {
    lineWidth = 4
    circlewidth = 2
    thick.classList.add('active2')
    thin.classList.remove('active2')
    thicker.classList.remove('active2')
  }
  thicker.onclick = function() {
    lineWidth = 6
    circlewidth = 3
    thicker.classList.add('active2')
    thick.classList.remove('active2')
    thin.classList.remove('active2')
  }
}

//画圆
function drawCircle(x, y, radiuse) {
  context.beginPath()
  context.arc(x, y, radiuse, 0, Math.PI * 2)
  context.fill()
}

//连线
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

//自动设置Canvas宽高
function autoSetCanvas(canvas) {
  setCanvas_Width_Height()
  //监听用户缩放窗口
  window.onresize = setCanvas_Width_Height()
  //获取以及设置用户窗口宽高
  function setCanvas_Width_Height() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
function creatBackground(canvas) {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

//监听用户使用移动or pc端口 （特性检测）
function listenTo_User(canvas) {
  if (document.body.ontouchstart !== undefined) {
    //触屏
    canvas.ontouchstart = function(touch) {
      clear.classList.remove('active1')
      var x = touch.touches[0].clientX
      var y = touch.touches[0].clientY
      using = true
      if (userEraser) {
        context.clearRect(x - 5, y - 5, 15, 15)
      } else {
        drawCircle(x, y, circlewidth)
        lastPoint = { x: x, y: y }
      }
    }
    canvas.ontouchmove = function(touch) {
      clear.classList.remove('active1')
      var x = touch.touches[0].clientX
      var y = touch.touches[0].clientY
      if (using) {
        if (userEraser) {
          context.clearRect(x - 5, y - 5, 15, 15)
        } else {
          var newPoint = { x: x, y: y }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      } else {
      }
    }
    canvas.ontouchend = function(touch) {
      using = false
    }
  } else {
    //非触屏设备
    //按下鼠标
    canvas.onmousedown = function(circle) {
      var x = circle.clientX
      var y = circle.clientY
      using = true
      if (userEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y }
        drawCircle(x, y, circlewidth)
      }
    }
    //移动鼠标
    canvas.onmousemove = function(circle) {
      var x = circle.clientX
      var y = circle.clientY
      if (using) {
        if (userEraser) {
          context.clearRect(x - 5, y - 5, 15, 15)
        } else {
          var newPoint = { x: x, y: y }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      } else {
      }
    }
    //松开鼠标
    canvas.onmouseup = function(circle) {
      using = false
    }
  }
}

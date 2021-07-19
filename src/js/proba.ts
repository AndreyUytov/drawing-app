const uiCanvas= document.getElementById('interface') as HTMLCanvasElement

const width = uiCanvas.width = innerWidth
const height = uiCanvas.height = innerHeight

if (uiCanvas.getContext){
  const ctx = uiCanvas.getContext('2d')
  ctx.strokeStyle = '#333'
  ctx.strokeRect(30, 10, 100, 200)
} else {
  alert('Use Chrome')
}


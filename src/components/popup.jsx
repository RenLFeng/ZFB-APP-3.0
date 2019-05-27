import '../assets/css/Popup.css'
export let toastIt = function(text) {
  let toast = document.createElement('DIV')
  toast.classList.add('toast-it')
  let content = document.createTextNode(text)
  toast.appendChild(content)
  toast.style.animationDuration = 2 + 's'
  document.body.appendChild(toast)
  setTimeout(function() {
    document.body.removeChild(toast)
  }, 2000)
}

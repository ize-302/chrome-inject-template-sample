console.log("Content Script initialized.");

let show = false

const injectFunc = () => {
  fetch(chrome.runtime.getURL('/template.html')).then(r => r.text()).then(html => {
    const container_el = document.getElementById("extension_container")
    const container_inner_el = document.getElementById("extension_container_inner")
    if (show && container_el === null) {
      document.body.insertAdjacentHTML('beforeend', html);
    }
    if (html) {
      if (!show) {
        container_el.style.display = 'none'
        container_inner_el.style.display = 'none'
      } else {
        container_el.style.display = 'grid'
        container_inner_el.style.display = 'block'
      }
    }
  });
}

// initially inject template.html
injectFunc()

// Listen for messages from the background.js
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'toggle_container') {
    show = !show
    injectFunc()
    if (show) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
    // not using innerHTML as it would break js event listeners of the page
  }
});


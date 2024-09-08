let currentUrl = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Popup收到消息:", request);
  if (request.action === "showQRContent") {
    const contentElem = document.getElementById('content');
    const jumpBtn = document.getElementById('jumpBtn');
    
    contentElem.textContent = request.content;
    currentUrl = request.content;
    
    if (isValidUrl(currentUrl)) {
      jumpBtn.style.display = 'block';
      jumpBtn.onclick = () => chrome.tabs.create({ url: currentUrl });
    } else {
      jumpBtn.style.display = 'none';
    }
  }
});

function updatePopupContent(content) {
  console.log("更新 Popup 内容:", content);
  const contentElem = document.getElementById('content');
  const jumpBtn = document.getElementById('jumpBtn');
  
  contentElem.textContent = content;
  
  if (isValidUrl(content)) {
    jumpBtn.style.display = 'block';
    jumpBtn.onclick = () => chrome.tabs.create({ url: content });
  } else {
    jumpBtn.style.display = 'none';
  }
}

// 初始化 UI
document.addEventListener('DOMContentLoaded', () => {
  console.log("Popup DOM加载完成");
  
  // 尝试读取存储的二维码内容
  chrome.storage.local.get(['qrContent'], (result) => {
    if (result.qrContent) {
      updatePopupContent(result.qrContent);
    } else {
      document.getElementById('content').textContent = "请右键点击图片并选择\"读取二维码\"";
    }
  });
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
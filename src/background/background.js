chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "readQRCode",
    title: "读取二维码",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "readQRCode") {
    console.log("右键菜单点击，发送消息到content script");
    chrome.tabs.sendMessage(tab.id, { action: "readQRCode", imgSrc: info.srcUrl }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("发送消息时出错:", chrome.runtime.lastError.message);
        chrome.action.setBadgeText({text: "错误"});
        chrome.action.setBadgeBackgroundColor({color: "#FF0000"});
      } else {
        console.log("收到content script的响应:", response);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showQRContent") {
    console.log("收到二维码内容:", request.content);
    
    // 存储二维码内容
    chrome.storage.local.set({ qrContent: request.content }, () => {
      console.log('二维码内容已保存');
    });

    // 打开 popup
    chrome.action.openPopup();
  }
});
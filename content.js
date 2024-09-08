console.log("Content script 已加载");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("收到消息:", request);
  if (request.action === "readQRCode") {
    console.log("开始处理二维码");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      console.log("图片加载成功");
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log("开始解码二维码");
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        console.log("二维码解码成功:", code.data);
        chrome.runtime.sendMessage({ action: "showQRContent", content: code.data });
      } else {
        console.log("无法识别二维码");
        chrome.runtime.sendMessage({ action: "showQRContent", content: "无法识别二维码" });
      }
    };
    img.onerror = function() {
      console.error("图片加载失败");
      chrome.runtime.sendMessage({ action: "showQRContent", content: "图片加载失败" });
    };
    img.src = request.imgSrc;
    console.log("设置图片源:", request.imgSrc);
    
    // 添加这行来发送响应
    sendResponse({status: "正在处理二维码"});
    
    // 返回 true 表示我们将异步发送响应
    return true;
  }
});
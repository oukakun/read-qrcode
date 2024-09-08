[中文](./README.md)
# Web QR Code Reader

This is a Chrome extension that can quickly read QR codes on web pages and navigate to the corresponding web pages.

## Features

- Right-click on an image on a web page and select the "Read QR Code" option
- Automatically parse QR code content
- Provide a quick jump button if the QR code content is a valid URL

## Installation

1. Clone or download this repository
2. Open Chrome browser, go to the extension management page (chrome://extensions/)
3. Enable "Developer mode"
4. Click "Load unpacked extension" and select the project root directory

## Usage

1. Find an image containing a QR code on a web page
2. Right-click on the image and select the "Read QR Code" option
3. View the parsing result, if it's a valid URL, you can click the "Jump" button to visit

## Tech Stack

- JavaScript
- Chrome Extension API
- jsQR (QR code parsing library)
const JSZip = require("jszip")
const str = "hello"
const utf16String = "\u0068\u0065\u006c\u006c\u006f"
const utf8String = "\x68\x65\x6c\x6c\x6f"

function ab2str(buf) {
  // using array buffer from UInt16Array can be decoded using UInt8Array
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char for utf-16
  var bufView = new Uint16Array(buf)
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

function stringToUInt8Array(str) {
  let arr = new Array(str.length)
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i)
  }
  let view = Uint8Array.from(arr)
  return view
}

function uint8arrayToStringMethod(myUint8Arr) {
  return String.fromCharCode.apply(null, myUint8Arr)
}

//browser methods
function largeuint8ArrToStringBrowser(uint8arr, callback) {
  var bb = new Blob([uint8arr])
  var f = new FileReader()
  // f.onload = function (e) {
  //     callback(e.target.result);
  // };

  return f.readAsText(bb)
}

/**
 * Convert an Uint8Array into a string.
 *
 * @returns {String}
 */
function Decodeuint8arr(uint8array) {
  return new TextDecoder("utf-8").decode(uint8array)
}

/**
 * Convert a string into a Uint8Array.
 *
 * @returns {Uint8Array}
 */
function Encodeuint8arr(myString) {
  return new TextEncoder().encode(myString)
}
function genZip(str) {
  var zip = new JSZip()
  zip.file("Hello.txt", str)
  zip.generateAsync({ type: "blob" }).then(function (content) {
    // FileSaver.saveAs(content, "download.zip")
    console.log({ content })
  })
}

// var img = zip.folder("images")
// img.file("smile.gif", imgData, { base64: true })

// zip.generateAsync({ type: "blob" }).then(function (content) {
//   // see FileSaver.js
//   saveAs(content, "example.zip")
// })
genZip(str)
console.log("hello")
// console.log(ab2str(str2ab(str)))
// console.log(ab2str(str2ab(utf16String)))
// console.log(ab2str(str2ab(utf8String)))
console.log(uint8arrayToStringMethod(stringToUInt8Array(str)))

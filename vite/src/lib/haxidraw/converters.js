export function floatsToBytes(arr) {
  var data = new Float32Array(arr)
  var buffer = new ArrayBuffer(data.byteLength)
  var floatView = new Float32Array(buffer).set(data)
  var byteView = new Uint8Array(buffer)

  return byteView
}

export function intsToBytes(arr) {
  var data = new Uint32Array(arr)
  var buffer = new ArrayBuffer(data.byteLength)
  var intView = new Uint32Array(buffer).set(data)
  var byteView = new Uint8Array(buffer)

  return byteView
}

export function uint16ToBytes(arr) {
  var data = new Uint16Array(arr)
  var buffer = new ArrayBuffer(data.byteLength)
  var uint16View = new Uint16Array(buffer).set(data)
  var byteView = new Uint8Array(buffer)

  return byteView
}

import { patchStore } from './state.ts'

export async function saveFile(content, { filename, fileHandle } = {}) {
  if (!isChrome()) {
    alert(
      'To save files to computer must use updated Chrome based browser. Please download files to store them.'
    )
    return
  }

  try {
    // Request a file handle.
    fileHandle =
      fileHandle ??
      (await window.showSaveFilePicker({
        types: [
          {
            description: 'JavaScript Art',
            accept: {
              'text/js': ['.js']
            }
          }
        ],
        suggestedName: filename ?? 'anon'
      }))

    patchStore({ fileHandle })

    // Create a FileSystemWritableFileStream to write to.
    const writableStream = await fileHandle.createWritable()

    // Write the contents of the file.
    await writableStream.write(content)

    // Close the file and write the contents to disk.
    await writableStream.close()

    // Here, you can only print the file name, not the full path
    console.log(`File saved: ${fileHandle.name}`)
  } catch (err) {
    console.error('File save failed', err)
  }
}

function isChrome() {
  // Please note that the 'window.navigator.userAgent' check can be manipulated by the client and is not 100% reliable
  var userAgent = window.navigator.userAgent
  var isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor)

  // Additionally, checking for 'window.chrome' may help in some cases, but this property can also be spoofed
  if (isChrome && typeof window.chrome !== 'undefined') {
    return true
  } else {
    return false
  }
}

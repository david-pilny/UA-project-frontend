export function prepareFiles(files: Array<any>) {
  return files.map((file) => {
    return {
      // image: Uint8Array.from(atob(file.getFileEncodeBase64String()), (char) =>
      //   char.charCodeAt(0)
      // ),
      image: file.getFileEncodeBase64String(),
      imageType: 'image/png',
    }
  })
}

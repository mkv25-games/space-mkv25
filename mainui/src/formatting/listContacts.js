function listContacts (contactList) {
  const contacts = contactList.map(file => {
    file.name = file.filepath
      .replace('/savedata/', '')
      .replace('\\savedata\\', '')
      .replace('.json', '')
    return file
  }).sort((a, b) => {
    const mtimea = Date.parse(a.fileinfo.mtime)
    const mtimeb = Date.parse(b.fileinfo.mtime)
    return mtimeb - mtimea
  })

  return contacts
}

export default listContacts

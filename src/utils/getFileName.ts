export function getFileName(path: string) {
    const pathArr = path.split('/')
    const filenameArr = pathArr[pathArr.length - 1].split('?')
    const filename = filenameArr[0]

    if (filename.includes("_FIL_")) return 'Vídeo'
    if (filename.includes("_ACI_")) return 'Texto'
    if (filename.includes("_FIN_")) return 'Texto'
    if (filename.includes("_MAP_")) return 'Mapa'
    if (filename.includes("_ICO_")) return 'Imagem'
    
    return filename
}
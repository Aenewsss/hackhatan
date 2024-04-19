export function getDocIcon(type:string) {
    if (type == 'Vídeo') return 'video'
    else if (type == 'Texto') return 'text'
    else if (type == 'Mapa') return 'map'
    else if (type == 'Imagem') return 'image'
    else if (type == 'Áudio') return 'audio'
    else return 'image'

}
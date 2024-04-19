export function formatDate(date: string) {
    const dateArr = date.split('-')
    const year = Number(dateArr[0])
    const month = Number(dateArr[1])
    const day = Number(dateArr[2])

    return new Date(year, month, day).toLocaleDateString('pt-BR')
}
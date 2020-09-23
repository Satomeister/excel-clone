const CODES = {
    A: 65,
    Z: 90
}

function createCol(char) {
    return `
        <div class="column">${char}</div>
    `
}

function createCell() {
    return `
        <div class="cell" contenteditable=""></div>
    `
}

function createRow(info, content) {
    return `
        <div class="row">

        <div class="row-info">${info || ''}</div>

        <div class="row-data">${content}</div>

      </div>
    `
}

function getCharByIndex(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount) {
    const colsCount = CODES.Z - CODES.A + 1

    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(getCharByIndex)
        .map(createCol)
        .join('')

    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 1; i <= rowsCount; i++) {
        rows.push(createRow(i, cells))
    }

    return rows.join('')
}

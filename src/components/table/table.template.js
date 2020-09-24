const CODES = {
    A: 65,
    Z: 90
}

function createCol(char, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${char}
            <div class="col-resizing" data-resize="col"></div>
        </div>
    `
}

function createCell(_, col) {
    return `
        <div class="cell" data-col="${col}" contenteditable></div>
    `
}

function createRow(info, content) {
    const resizing = info ? `<div class="row-resizing" data-resize="row"></div>` : ''
    return `
        <div class="row" data-type="resizable">

        <div class="row-info">
            ${info || ''}
            ${resizing}
        </div>

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

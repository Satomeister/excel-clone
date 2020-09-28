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

function createCell(row) {
    return function(_, col) {
        return `
        <div 
            class="cell"
            data-col="${col}"
            data-id="${row}:${col}"
            data-type="cell"
            contenteditable
           >
        </div>
`
    }
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


    rows.push(createRow(null, cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('')

        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}

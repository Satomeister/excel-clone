import { parse, toInlineStyles } from '@core/utils'
import { defaultStyles } from '@/constants'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = '120px'
const DEFAULT_HEIGHT = '24px'

function getWidth(state, index) {
    return state[index] ?
        `width:${state[index]}` :
        `width:${DEFAULT_WIDTH}`
}

function getHeight(state, index) {
    return state[index] ?
        `height:${state[index]}` :
        `height:${DEFAULT_HEIGHT}`
}

function getStyles(styles, id) {
    const cellStyle = styles[id]
    if (cellStyle) {
        return toInlineStyles(cellStyle)
    } else {
        return toInlineStyles(defaultStyles)
    }
}

function createCol(state) {
    return (char, index) => {
        return `
        <div
         class="column"
         data-type="resizable"
         data-col="${index}"
         style="${getWidth(state, index)}"
         >
             ${char}
             <div class="col-resizing" data-resize="col"></div>
        </div>
    `
    }
}

function createCell(row, state) {
    return function(_, col) {
        const id = `${row}:${col}`
        const value = state.cellsData[id] || ''
        const style = `${getStyles(state.stylesData, id)};${getWidth(state.colsResize, col)}`
        return `
        <div 
            class="cell"
            data-col="${col}"
            data-id="${id}"
            data-type="cell"
            data-value="${value}"
            style="${style}"
            contenteditable
            spellcheck="false"
        >
           ${parse(value)}
        </div>
`
    }
}

function createRow(info, content, state) {
    const resizing = info ? `<div class="row-resizing" data-resize="row"></div>` : ''
    return `
    <div
     class="row" 
     data-type="resizable"
     data-row="${info}"
     style="${getHeight(state, info)}"
     >
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

export function createTable(rowsCount, state) {
    const colsCount = CODES.Z - CODES.A + 1

    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(getCharByIndex)
        .map(createCol(state.colsResize))
        .join('')


    rows.push(createRow(null, cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row, state))
            .join('')

        rows.push(createRow(row + 1, cells, state.rowsResize))
    }

    return rows.join('')
}

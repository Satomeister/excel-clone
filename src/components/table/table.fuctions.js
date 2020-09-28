import { range } from '@core/utils'

export function matrix($current, $target) {
    const currentId = $current.id(true)
    const targetId = $target.id(true)

    const rows = range(+currentId.row, +targetId.row)
    const cols = range(+currentId.col, +targetId.col)

    return rows.reduce((acc, row) => {
        cols.map(col => {
            acc.push(`${row}:${col}`)
        })
        return acc
    }, [])
}

export function selector(key, { row, col }) {
    switch (key) {
    case 'Enter':
    case 'ArrowDown':
        row++
        break
    case 'Tab':
    case 'ArrowRight':
        col++
        break
    case 'ArrowLeft':
        col--
        break
    case 'ArrowUp':
        row--
    }
    return `[data-id="${row}:${col}"]`
}

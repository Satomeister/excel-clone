export function capitalize(string) {
    return string.trim().charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles) {
    return Object.keys(styles)
        .map(key => {
            return `${camelToDashCase(key)}: ${styles[key]}`
        })
        .join(';')
}

export function parse(value) {
    try {
        if (value.startsWith('=')) {
            return eval(value.slice(1))
        }
    } catch {
        return value
    }
    return value
}

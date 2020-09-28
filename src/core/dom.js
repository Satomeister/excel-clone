class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(listener, callback) {
        this.$el.removeEventListener(listener, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        return this.$el.classList.remove(className)
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    focus() {
        this.$el.focus()
        return this
    }

    id(parse) {
        if (parse) {
            const [row, col] = this.id().split(':')
            return { row, col }
        } else {
            return this.data.id
        }
    }

    get data() {
        return this.$el.dataset
    }

    get text() {
        return this.$el.textContent.trim()
    }

    set text(data) {
        this.$el.textContent = data
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        this.$el.append(node)
        return this
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}

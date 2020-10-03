import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubs = []
        this.store = options.store
        this.subscribes = options.subscribes || []
    }

    toHTML() {
        return ``
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, callback) {
        const unsub = this.emitter.subscribe(event, callback)
        this.unsubs.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.store.subscribe(fn)
    }

    storeChanged(changes) {}

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubs.forEach(unsub => unsub())
    }
}

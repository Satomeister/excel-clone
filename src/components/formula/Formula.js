import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribes: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="input" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('.input')
        this.$on('table:select', $cell => {
            this.$formula.text = $cell.data.value
        })
    }

    storeChanged(changes) {
        this.$formula.text = changes.currentText
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text)
    }

    onKeydown(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}

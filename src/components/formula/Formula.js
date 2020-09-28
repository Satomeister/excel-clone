import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        const $formula = this.$root.find('.input')
        this.$on('cell:input', text => {
            $formula.text = text
        })
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

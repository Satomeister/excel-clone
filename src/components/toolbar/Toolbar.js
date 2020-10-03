import { createToolbar } from '@/components/toolbar/tolbar.template'
import { $ } from '@core/dom'
import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { isButton } from '@/components/toolbar/toolbar.functions'
import { defaultStyles } from '@/constants'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribes: ['currentStyles'],
            ...options
        })

        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target).closest('[data-type="button"]')
        if (isButton($target)) {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:styles', value)
        }
    }
}

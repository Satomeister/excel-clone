import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import { matrix, selector } from '@/components/table/table.fuctions'
import { TableSelection } from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'
import { defaultStyles } from '@/constants'
import { parse } from '@core/utils'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: Table,
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(15, this.store.getState())
    }

    init() {
        super.init()

        this.selections = new TableSelection()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula:input', (text) => {
            this.selections.current.attr('data-value', text)
            this.selections.current.text = parse(text)
            this.cellsUpdate(text)
        })
        this.$on('formula:done', () => this.selections.current.focus())

        this.$on('toolbar:styles', styles => {
            this.selections.applyStyle(styles)
            this.$dispatch(actions.applyStyles({
                ids: this.selections.selectedIds,
                styles
            }))
        })
    }

    selectCell($cell) {
        this.selections.select($cell)
        this.$emit('table:select', $cell)
        this.$dispatch(actions.changeStyles($cell.getStyles(Object.keys(defaultStyles))))
    }

    cellsUpdate(value) {
        this.$dispatch(actions.cellsUpdate({
            id: this.selections.current.id(),
            value
        }))
    }

    tableResize(event) {
        resizeHandler(this.$root, event, this.$dispatch.bind(this))
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            this.tableResize(event)
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix(this.selections.current, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selections.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ]
        const id = this.selections.current.id(true)
        const { key } = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const $next = this.$root.find(selector(key, id))
            if ($next.$el) {
                this.selectCell($next)
            }
        }
    }

    onInput(event) {
        this.cellsUpdate($(event.target).text)
    }
}

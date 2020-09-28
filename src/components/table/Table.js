import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import { matrix, selector } from '@/components/table/table.fuctions'
import { TableSelection } from '@/components/table/TableSelection'

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
        return createTable(15)
    }

    init() {
        super.init()

        this.selections = new TableSelection()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        const currentCell = this.selections.current
        this.$on('formula:input', (text) => currentCell.text = text)
        this.$on('formula:done', () => currentCell.focus())
    }

    selectCell($cell) {
        this.selections.select($cell)
        this.$emit('cell:input', $cell.text)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(this.$root, event)
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
        this.$emit('cell:input', $(event.target).text)
    }
}

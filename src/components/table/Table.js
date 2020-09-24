import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: Table,
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(15)
    }

    onMousedown(event) {
        resizeHandler(this.$root, event)
    }
}

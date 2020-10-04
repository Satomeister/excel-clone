import { Page } from '@core/Page'
import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { normalizeInitialState } from '@/redux/initialState'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'

function storageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    constructor(params) {
        super(params)
    }

    getRoot() {
        const param = this.params ? this.params : Date.now().toString()
        const state = localStorage.getItem(storageName(param))
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)

        store.subscribe(state => {
            localStorage.setItem(storageName(param), JSON.stringify(state))
        })

        this.excel = new Excel( {
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}

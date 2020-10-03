import { ExcelComponent } from '@core/ExcelComponent'
import { changeTitle } from '@/redux/actions'
import { $ } from '@core/dom'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    toHTML() {
        const title = this.store.getState().tableTitle
        return `
            <input type="text" class="input" id="table-input" value="${title}" />
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                      <i class="material-icons">exit_to_app</i>
                </div>
            </div>
          `
    }

    onInput(event) {
        this.$dispatch(changeTitle($(event.target).text))
    }
}

import { ExcelComponent } from '@core/ExcelComponent'
import { changeTitle } from '@/redux/actions'
import { $ } from '@core/dom'
import { ActiveRoute } from '@core/Route/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    toHTML() {
        const title = this.store.getState().tableTitle
        return `
            <input type="text" class="input" id="table-input" value="${title}" />
            <div>
                <div class="button" data-button="delete">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button" data-button="exit">
                      <i class="material-icons">exit_to_app</i>
                </div>
            </div>
          `
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.closest('[data-button="delete"]').$el) {
            const decision = confirm('Вы действительно хотите удалить эту таблицу?')

            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.closest('[data-button="exit"]').$el) {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        this.$dispatch(changeTitle($(event.target).text))
    }
}

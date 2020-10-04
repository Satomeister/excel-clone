function createItems(key) {
    const model = JSON.parse(localStorage.getItem(key))
    const id = key.split(':')[1]
    const date = new Date(+id)
    return `
        <li class="db__record">
             <a href="#excel/${id}">${model.tableTitle}</a>
             <strong>
                ${new Date(date).toLocaleDateString()}
                ${new Date(date).toLocaleTimeString()}
             </strong> 
        </li>
  `
}

function getKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createList() {
    const keys = getKeys()

    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="db__list">
            ${keys.map(createItems).join('')}
        </ul>
    `
}

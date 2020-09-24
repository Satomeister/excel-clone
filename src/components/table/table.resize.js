import { $ } from '@core/dom'

export function resizeHandler($root, event) {
    if (event.target.dataset.resize) {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const parentCoords = $parent.getCoords()
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let value

        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })

        document.onmousemove = (e) => {
            if (type === 'col') {
                const delta = e.clientX - parentCoords.right
                value = delta + parentCoords.width + 'px'

                const right = -delta + 'px'
                $resizer.css({ right })
            } else {
                console.log(e.pageY)
                console.log(e.clientY)
                const delta = e.clientY - parentCoords.bottom
                value = delta + parentCoords.height + 'px'

                const bottom = -delta + 1 + 'px'
                $resizer.css({ bottom })
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if (type === 'col') {
                $root.selectAll(`[data-col='${$parent.data.col}']`)
                    .forEach(el => el.style.width = value)
            }

            if (type === 'row') {
                $parent.css({ height: value })
            }

            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    }
}

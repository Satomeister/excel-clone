import {
    APPLY_STYLES,
    CELLS_UPDATE,
    CHANGE_STYLES, CHANGE_TITLE,
    COL_RESIZE,
    ROW_RESIZE
} from '@/redux/actionsTypes'

export const colResize = (id, width) => ({ type: COL_RESIZE, payload: { id, width } })
export const rowResize = (id, height) => ({ type: ROW_RESIZE, payload: { id, height } })
export const cellsUpdate = (payload) => ({ type: CELLS_UPDATE, payload })
export const changeStyles = (payload) => ({ type: CHANGE_STYLES, payload })
export const applyStyles = (payload) => ({ type: APPLY_STYLES, payload })
export const changeTitle = (title) => ({ type: CHANGE_TITLE, title })

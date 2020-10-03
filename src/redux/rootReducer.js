import {
    APPLY_STYLES,
    CELLS_UPDATE,
    CHANGE_STYLES, CHANGE_TITLE,
    COL_RESIZE,
    ROW_RESIZE
} from '@/redux/actionsTypes'

export function rootReducer(state, action) {
    let prevState
    switch (action.type) {
        case 'TEST':
            return { ...state, test: 'test' }
        case COL_RESIZE:
            prevState = state.colsResize || {}
            prevState[action.payload.id] = action.payload.width
            return { ...state, colsResize: prevState }
        case ROW_RESIZE:
            prevState = state.rowsResize || {}
            prevState[action.payload.id] = action.payload.height
            return { ...state, rowsResize: prevState }
        case CELLS_UPDATE:
            prevState = state.cellsData || {}
            prevState[action.payload.id] = action.payload.value
            return { ...state, currentText: action.payload.value, cellsData: prevState }
        case CHANGE_STYLES:
            prevState = state.currentStyles
            return { ...state, currentStyles: action.payload }
        case APPLY_STYLES:
            prevState = state.stylesData || {}
            action.payload.ids.forEach(id => {
                prevState[id] = { ...prevState[id], ...action.payload.styles }
            })
            return {
                ...state,
                stylesData: prevState,
                currentStyles: { ...state.currentStyles, ...action.payload.styles }
            }
        case CHANGE_TITLE:
            return {
                ...state,
                tableTitle: action.title
            }
        default:
            return state
    }
}

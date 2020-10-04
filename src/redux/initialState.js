import { defaultStyles } from '@/constants'

const defaultState = {
    tableTitle: 'Новая таблица',
    colsResize: {},
    rowsResize: {},
    cellsData: {},
    currentText: '',
    currentStyles: defaultStyles,
    stylesData: {}
}

function normalize(state) {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ''
    }
}

export const initialState = JSON.parse(localStorage.getItem('excel-state')) ?
    normalize(JSON.parse(localStorage.getItem('excel-state'))) :
    defaultState


export function normalizeInitialState(state) {
    return state ? normalize(JSON.parse(state)) : defaultState
}

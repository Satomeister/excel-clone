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

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export const initialState = JSON.parse(localStorage.getItem('excel-state')) ?
    normalize(JSON.parse(localStorage.getItem('excel-state'))) :
    defaultState

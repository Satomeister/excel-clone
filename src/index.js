import { ExcelPage } from '@/pages/ExcelPage'

import('./scss/index.scss')

import { Router } from '@core/Route/Router'
import { DashboardPage } from '@/pages/DashboardPage'

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

import Header from './Header.vue'
import LeftNav from './LeftNav.vue'

import Dropdown from './Dropdown.vue'

export default function install(app) {
    app.component('Header', Header)
    app.component('LeftNav', LeftNav)

    app.component('Dropdown', Dropdown)
}
  
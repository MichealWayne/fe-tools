/*
 * global install components
 */


import Alert from '../Alert'
import Toast from '../Toast'
import Icon from '../IconMin'
import Button from '../Button'

const components = [
    Icon,
    Button,
    Alert,
    Toast
];


if (typeof window !== 'undefined' && window.Vue) {
    components.forEach(Component => {
        window.Vue.use(Component);
    });
    window.Vue.prototype.$alert = Alert();
    window.Vue.prototype.$toast = Toast();
} else throw new Error('Error! ijijin-ui/vue need Vue.js(version>2.4).');
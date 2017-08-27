import AOS from 'aos';
require('aos/dist/aos.css');

export default function aos() {

    function init() {
        AOS.init();
    }

    return { init };
}
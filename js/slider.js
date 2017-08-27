import Swiper from 'swiper';
require('swiper/dist/css/swiper.min.css');

export default function slider() {

    let swiper, root, dotNav = null;

    const swiperContainer = '.swiper-container';

    const config = {
        nextButton: '.slides__control-next',
        prevButton: '.slides__control-prev'
    }

    function toggleDotNav(index = 0) {
        dotNav.forEach(dot => dot.classList.remove('slides__dot--is-active'));
        dotNav[index].classList.add('slides__dot--is-active');
    }

    function toggleSlide(index = 0) {
        if (index === swiper.activeIndex) return;
        swiper.slideTo(index);
    }

    function handleAction(e, action) {
        switch(action) {
            case 'DOT_NAV_TOGGLE':
                toggleSlide(dotNav.indexOf(e.target));
                break;
            case 'SLIDE_CHANGE_START':
                toggleDotNav(swiper.activeIndex);
                break;
        }
    }

    function bindEvents() {
        dotNav.forEach(dot => dot.addEventListener('click', (e) => handleAction(e, 'DOT_NAV_TOGGLE')));
        swiper.on('slideChangeStart', () => handleAction(null, 'SLIDE_CHANGE_START'));
    }

    function cacheDom() {
        root = document.getElementById('js-slides');

        try {
            dotNav = Array.from(root.querySelectorAll('.slides__dot'));
        } catch(err) {
            console.error('SLIDER: Unable to cache nodes!', err);
            return false;
        }

        return true;
    }

    function init() {
        swiper = new Swiper(swiperContainer, config);
        if (swiper && cacheDom()) bindEvents();
    }

    return { init };
}
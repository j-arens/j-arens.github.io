export default function accordion() {

    let accordion, spoilers = null;

    const activeClass = 'faq__spoiler--is-active';

    const state = {
        activeIndex: 0
    }

    function toggleSpoiler(e) {
        const index = spoilers.indexOf(e.target.closest('.js-spoiler'));

        if (index === state.activeIndex) {
            spoilers[index].classList.toggle(activeClass);
        } else {
            spoilers.forEach(spoiler => spoiler.classList.remove(activeClass));
            spoilers[index].classList.add(activeClass);
        }

        state.activeIndex = index;
    }

    function bindEvents() {
        spoilers.forEach(spoiler => spoiler.firstElementChild.addEventListener('click', toggleSpoiler));
    }

    function cacheDom() {
        accordion = document.getElementById('js-accordion');

        try {
            spoilers = Array.from(accordion.querySelectorAll('.js-spoiler'));
        } catch(err) {
            console.error('ACCORDION: Unable to cache nodes!', err);
            return false;
        }

        return true;
    }

    function init() {
        if (cacheDom()) bindEvents();
    }

    return { init };
}
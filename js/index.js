import docReady from './docReady';
import slider from './slider';
import accordion from './accordion';
import aos from './aos';

const modules = [aos, slider, accordion];

docReady(() => modules.forEach(module => module().init()));
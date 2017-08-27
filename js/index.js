import docReady from './docReady';
import slider from './slider';
import accordion from './accordion';

const modules = [slider, accordion];

docReady(() => modules.forEach(module => module().init()));
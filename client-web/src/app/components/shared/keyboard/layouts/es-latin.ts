import { Layout } from '../keyboard.interfaces';

export const ES_LATIN: Layout = {
  name: 'Spanish Latin America',
  rows: [
    [
      { default: '{esc}' },
      { default: '|', shift: '°', altGr: '¬', size: 0.5 },
      { default: '1', shift: '!' },
      { default: '2', shift: '"' },
      { default: '3', shift: '#' },
      { default: '4', shift: '$' },
      { default: '5', shift: '%' },
      { default: '6', shift: '&' },
      { default: '7', shift: '/' },
      { default: '8', shift: '(' },
      { default: '9', shift: ')' },
      { default: '0', shift: '=' },
      { default: '\'', shift: '?', altGr: '\\' },
      { default: '¿', shift: '?', altGr: '¡' },
      { default: '{back}' }
    ],
    [
      { default: '{tab}' },
      { default: 'q', altGr: '@' },
      { default: 'w' },
      { default: 'e' },
      { default: 'r' },
      { default: 't' },
      { default: 'y' },
      { default: 'u' },
      { default: 'i' },
      { default: 'o' },
      { default: 'p' },
      { default: '´', shift: '¨' },
      { default: '+', shift: '*', altGr: '~' },
      { default: '}', shift: ']', altGr: '`' }
    ],
    [
      { default: '{caps}' },
      { default: 'a' },
      { default: 's' },
      { default: 'd' },
      { default: 'f' },
      { default: 'g' },
      { default: 'h' },
      { default: 'j' },
      { default: 'k' },
      { default: 'l' },
      { default: 'ñ' },
      { default: '{', shift: '[', altGr: '^' },
      { default: '{enter}', size: 2 }
    ],
    [
      { default: '{shift}' },
      { default: '<', shift: '>' },
      { default: 'z' },
      { default: 'x' },
      { default: 'c' },
      { default: 'v' },
      { default: 'b' },
      { default: 'n' },
      { default: 'm' },
      { default: ',', shift: ';' },
      { default: '.', shift: ':' },
      { default: '-', shift: '_' },
      { default: '{shift}' }
    ],
    [
      // { default: '{ctrl}' },
      // { default: '{alt}' },
      { default: '{space}', size: 5 },
      { default: '{altgr}' },
      // { default: '{ctrl}' }
    ]
  ]
};

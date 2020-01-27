import { Layout } from '../layout';
import SYS from '../system-keys';

export const LAYOUT_ES_LATIN: Layout = {
  name: 'Spanish - Latin American',
  rows: [
    [
      {
        default:  { label: '|', value: '|' },
        shift:    { label: '°', value: '°' },
        altgr:    { label: '¬', value: '¬' },
        size: 0.5
      },
      {
        default:  { label: '1', value: '1' },
        shift:    { label: '!', value: '!' }
      },
      {
        default:  { label: '2', value: '2' },
        shift:    { label: '"', value: '"' }
      },
      {
        default:  { label: '3', value: '3' },
        shift:    { label: '#', value: '#' }
      },
      {
        default:  { label: '4', value: '4' },
        shift:    { label: '$', value: '$' }
      },
      {
        default:  { label: '5', value: '5' },
        shift:    { label: '%', value: '%' }
      },
      {
        default:  { label: '6', value: '6' },
        shift:    { label: '&', value: '&' }
      },
      {
        default:  { label: '7', value: '7' },
        shift:    { label: '/', value: '/' }
      },
      {
        default:  { label: '8', value: '8' },
        shift:    { label: '(', value: '(' }
      },
      {
        default:  { label: '9', value: '9' },
        shift:    { label: ')', value: ')' }
      },
      {
        default:  { label: '0', value: '0' },
        shift:    { label: '=', value: '=' }
      },
      {
        default:  { label: '\'', value: '\'' },
        shift:    { label: '?', value: '?' },
        altgr:    { label: '\\', value: '\\' }
      },
      {
        default:  { label: '¿', value: '¿' },
        shift:    { label: '¡', value: '¡' }
      },
      {
        default:  SYS.BACK,
        shift:    SYS.BACK,
        altgr:    SYS.BACK,
        size: 1.25
      }
    ],
    [
      {
        default:  SYS.TAB,
        shift:    SYS.TAB,
        altgr:    SYS.TAB
      },
      {
        default:  { label: 'q', value: 'q' },
        shift:    { label: 'Q', value: 'Q' },
        altgr:    { label: '@', value: '@' }
      },
      {
        default:  { label: 'w', value: 'w' },
        shift:    { label: 'W', value: 'W' }
      },
      {
        default:  { label: 'e', value: 'e' },
        shift:    { label: 'E', value: 'E' }
      },
      {
        default:  { label: 'r', value: 'r' },
        shift:    { label: 'R', value: 'R' }
      },
      {
        default:  { label: 't', value: 't' },
        shift:    { label: 'T', value: 'T' }
      },
      {
        default:  { label: 'y', value: 'y' },
        shift:    { label: 'Y', value: 'Y' }
      },
      {
        default:  { label: 'u', value: 'u' },
        shift:    { label: 'U', value: 'U' }
      },
      {
        default:  { label: 'i', value: 'i' },
        shift:    { label: 'I', value: 'I' }
      },
      {
        default:  { label: 'o', value: 'o' },
        shift:    { label: 'O', value: 'O' }
      },
      {
        default:  { label: 'p', value: 'p' },
        shift:    { label: 'P', value: 'P' }
      },
      {
        default:  { label: '´', value: '´' },
        shift:    { label: '¨', value: '¨' }
      },
      {
        default:  { label: '+', value: '+' },
        shift:    { label: '*', value: '*' },
        altgr:    { label: '~', value: '~' }
      },
      {
        default:  { label: '}', value: '}' },
        shift:    { label: ']', value: ']' },
        altgr:    { label: '`', value: '`' }
      }
    ]
  ]
};

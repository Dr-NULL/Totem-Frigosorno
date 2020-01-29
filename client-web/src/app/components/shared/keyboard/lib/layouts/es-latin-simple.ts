import { Layout } from '../layout';
import SYS, { ALTGR } from '../system-keys';

export const LAYOUT_ES_LATIN_SIMPLE: Layout = {
  name: 'Spanish - Latin American',
  rows: [
    [
      {
        default:  { label: '@', value: '@' },
        shift:    { label: '@', value: '@' }
      },
      {
        default:  { label: '1', value: '1' }
      },
      {
        default:  { label: '2', value: '2' }
      },
      {
        default:  { label: '3', value: '3' }
      },
      {
        default:  { label: '4', value: '4' }
      },
      {
        default:  { label: '5', value: '5' }
      },
      {
        default:  { label: '6', value: '6' }
      },
      {
        default:  { label: '7', value: '7' }
      },
      {
        default:  { label: '8', value: '8' }
      },
      {
        default:  { label: '9', value: '9' }
      },
      {
        default:  { label: '0', value: '0' }
      },
      {
        default:  { label: '\'', value: '\'' }
      },
      {
        default:  { label: '´', value: '´' },
        shift:    { label: '`', value: '`' },
        altgr:    { label: '¨', value: '¨' }
      }
    ],
    [
      {
        default:  SYS.TAB,
        shift:    SYS.TAB,
        altgr:    SYS.TAB,
        size: 1.4
      },
      {
        default:  { label: 'q', value: 'q' },
        shift:    { label: 'Q', value: 'Q' }
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
        default:  SYS.BACK,
        shift:    SYS.BACK,
        altgr:    SYS.BACK,
        size: 1.8
      }
    ],
    [
      {
        default:  SYS.CAPS,
        shift:    SYS.CAPS,
        altgr:    SYS.CAPS,
        size: 1.4
      },
      {
        default:  { label: 'a', value: 'a' },
        shift:    { label: 'A', value: 'A' }
      },
      {
        default:  { label: 's', value: 's' },
        shift:    { label: 'S', value: 'S' }
      },
      {
        default:  { label: 'd', value: 'd' },
        shift:    { label: 'D', value: 'D' }
      },
      {
        default:  { label: 'f', value: 'f' },
        shift:    { label: 'F', value: 'F' }
      },
      {
        default:  { label: 'g', value: 'g' },
        shift:    { label: 'G', value: 'G' }
      },
      {
        default:  { label: 'h', value: 'h' },
        shift:    { label: 'H', value: 'H' }
      },
      {
        default:  { label: 'j', value: 'j' },
        shift:    { label: 'J', value: 'J' }
      },
      {
        default:  { label: 'k', value: 'k' },
        shift:    { label: 'K', value: 'K' }
      },
      {
        default:  { label: 'l', value: 'l' },
        shift:    { label: 'L', value: 'L' }
      },
      {
        default:  { label: 'ñ', value: 'ñ' },
        shift:    { label: 'Ñ', value: 'Ñ' }
      },
      {
        default:  SYS.ENTER,
        shift:    SYS.ENTER,
        altgr:    SYS.ENTER,
        size: 1.8
      }
    ],
    [
      {
        default:  SYS.SHIFT,
        shift:    SYS.SHIFT,
        altgr:    SYS.SHIFT,
        size: 1.4
      },
      {
        default:  { label: 'z', value: 'z' },
        shift:    { label: 'Z', value: 'Z' }
      },
      {
        default:  { label: 'x', value: 'x' },
        shift:    { label: 'X', value: 'X' }
      },
      {
        default:  { label: 'c', value: 'c' },
        shift:    { label: 'C', value: 'C' }
      },
      {
        default:  { label: 'v', value: 'v' },
        shift:    { label: 'V', value: 'V' }
      },
      {
        default:  { label: 'b', value: 'b' },
        shift:    { label: 'B', value: 'B' }
      },
      {
        default:  { label: 'n', value: 'n' },
        shift:    { label: 'N', value: 'N' }
      },
      {
        default:  { label: 'm', value: 'm' },
        shift:    { label: 'M', value: 'M' }
      },
      {
        default:  { label: '.', value: '.' }
      },
      {
        default:  { label: '-', value: '-' }
      },
      {
        default:  { label: '_', value: '_' }
      },
      {
        default:  SYS.SHIFT,
        shift:    SYS.SHIFT,
        altgr:    SYS.SHIFT,
        size: 1.8
      }
    ],
    [
      {
        default:  SYS.SPACE,
        shift:    SYS.SPACE,
        altgr:    SYS.SPACE,
        size: 12
      },
      {
        default:  SYS.LEFT,
        shift:    SYS.LEFT,
        altgr:    SYS.LEFT
      },
      {
        default:  SYS.RIGHT,
        shift:    SYS.RIGHT,
        altgr:    SYS.RIGHT
      }
    ]
  ]
};

import { Layout } from '../layout';
import SYS from '../system-keys';

export const LAYOUT_NUMPAD: Layout = {
  name: 'Numpad',
  rows: [
    [
      {
        default: { label: '1', value: '1' }
      },
      {
        default: { label: '2', value: '2' }
      },
      {
        default: { label: '3', value: '3' }
      }
    ],
    [
      {
        default: { label: '4', value: '4' }
      },
      {
        default: { label: '5', value: '5' }
      },
      {
        default: { label: '6', value: '6' }
      }
    ],
    [
      {
        default: { label: '7', value: '7' }
      },
      {
        default: { label: '8', value: '8' }
      },
      {
        default: { label: '9', value: '9' }
      }
    ],
    [
      {
        default: SYS.TAB
      },
      {
        default: { label: '0', value: '0' }
      },
      {
        default: SYS.BACK
      }
    ],
    [
      {
        default: SYS.ENTER
      },
      {
        default: SYS.LEFT
      },
      {
        default: SYS.RIGHT
      }
    ]
  ]
};

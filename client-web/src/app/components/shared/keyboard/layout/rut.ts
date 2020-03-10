import { Layout } from '../lib/layout';
import SYS from '../lib/system-keys';

export const LAYOUT_RUT: Layout = {
  name: 'R.U.T.',
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
        default: { label: 'k', value: 'k' }
      },
      {
        default: { label: '0', value: '0' }
      },
      {
        default: SYS.TAB
      }
    ],
    [
      {
        default: SYS.BACK
      },
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

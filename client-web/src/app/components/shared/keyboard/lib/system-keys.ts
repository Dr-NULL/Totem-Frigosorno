import { Key } from './layout';

export const ENTER: Key = {
  label: '<i class="fas fa-level-down-alt fa-rotate-90"></i>',
  value: '{enter}'
};

export const SPACE: Key = {
  label: '<i class="far fa-window-minimize"></i>',
  value: ' '
};

export const TAB: Key = {
  label: '<i class="fas fa-exchange-alt"></i>',
  value: '{tab}'
};

export const ESC: Key = {
  label: 'esc',
  value: '{esc}'
};

export const BACK: Key = {
  label: '<i class="fas fa-long-arrow-alt-left"></i>',
  value: '{back}'
};

export const CAPS: Key = {
  label: 'mayús',
  value: '{caps}'
};

export const SHIFT: Key = {
  label: '<i class="fas fa-chevron-up"></i>',
  value: '{shift}'
};

export const CTRL: Key = {
  label: 'ctrl',
  value: '{ctrl}'
};

export const ALT: Key = {
  label: 'alt',
  value: '{alt}'
};

export const ALTGR: Key = {
  label: 'alt gr',
  value: '{altgr}'
};

export const UP: Key = {
  label: '<i class="fas fa-caret-up"></i>',
  value: '{up}'
};

export const DOWN: Key = {
  label: '<i class="fas fa-caret-down"></i>',
  value: '{down}'
};

export const LEFT: Key = {
  label: '<i class="fas fa-caret-left"></i>',
  value: '{left}'
};

export const RIGHT: Key = {
  label: '<i class="fas fa-caret-right"></i>',
  value: '{right}'
};

export function isSystemKey(key: Key) {
  switch (key.value) {
    case ALT.value:
    case ALTGR.value:
    case BACK.value:
    case CAPS.value:
    case CTRL.value:
    case ENTER.value:
    case UP.value:
    case DOWN.value:
    case LEFT.value:
    case RIGHT.value:
    case ESC.value:
    case SHIFT.value:
    case TAB.value:
      return true;
    default:
      return false;
  }
}

export default {
  ALT,
  ALTGR,
  BACK,
  CAPS,
  CTRL,
  ENTER,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ESC,
  SHIFT,
  SPACE,
  TAB,
};

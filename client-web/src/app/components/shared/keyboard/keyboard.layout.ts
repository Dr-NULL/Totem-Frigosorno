import { Layout, LayoutBtn, KeyBtn, Key } from './keyboard.interfaces';

export function stylizeLayout(input: Layout) {
  const output: LayoutBtn = {
    name: input.name,
    rows: []
  };

  for (const row of input.rows) {
    const btns: KeyBtn[] = [];
    for (const key of row) {
      btns.push(
        getBtn(key)
      );
    }
    output.rows.push(btns);
  }
  return output;
}

function getBtn(key: Key): KeyBtn {
  // Agregar letras mayúsculas
  if (
    (key.default.length === 1) &&
    (key.default.match(/[a-z]/gi) != null)
  ) {
    key.shift = key.default.toUpperCase();
  }

  // Setear tamaño por defecto
  if (key.size == null) {
    key.size = 1;
  }

  // Duplicar funciones
  if (key.default.match(/^\{[a-z]+\}$/gi) !== null) {
    key.shift = key.default;
    key.altGr = key.default;
  }

  return {
    size: key.size,
    label: {
      default: generateLabel(key.default),
      shift: generateLabel(key.shift),
      altGr: generateLabel(key.altGr)
    },
    value: {
      default: key.default,
      shift: key.shift,
      altGr: key.altGr
    }
  };
}

function generateLabel(input: string) {
  if (input == null) {
    input = '';
  }

  switch (input.trim().toLowerCase()) {
    case '{esc}':
      return 'esc';
    case '{back}':
      return '<i class="fas fa-long-arrow-alt-left"></i>';
    case '{enter}':
      return '<i class="fas fa-level-down-alt fa-rotate-90"></i>';
    case '{tab}':
      return '<i class="fas fa-exchange-alt"></i>';
    case '{caps}':
      return 'Mayús';
    case '{space}':
      return '<i class="far fa-window-minimize"></i>';
    case '{shift}':
      return '<i class="fas fa-caret-up"></i>';
    case '{ctrl}':
      return 'ctrl';
    case '{alt}':
      return 'alt';
    case '{altgr}':
      return 'alt gr';
    default:
      return input;
  }
}

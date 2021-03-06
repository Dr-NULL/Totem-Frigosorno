export interface Key {
  label: string;
  value?: string;
}

export interface KeyButton {
  default: Key;
  shift?: Key;
  altgr?: Key;
  size?: number;
}

export interface Layout {
  name: string;
  rows: KeyButton[][];
}

export function normalize(input: Layout) {
  for (const yAxis of input.rows) {
    for (const xAxis of yAxis) {
      // Agregar tamaño por defecto
      if (xAxis.size == null) {
        xAxis.size = 1;
      }

      // Agregar botones vacíos
      if (xAxis.shift == null) {
        xAxis.shift = {
          label: ''
        };
      }

      if (xAxis.altgr == null) {
        xAxis.altgr = {
          label: ''
        };
      }
    }
  }

  return input;
}

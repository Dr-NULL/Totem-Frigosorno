export interface Key {
  size?: number;
  default: string;
  shift?: string;
  altGr?: string;
}

export interface Layout {
  name: string;
  rows: Key[][];
}

export interface KeyBtnParam {
  default: string;
  shift?: string;
  altGr?: string;
}

export interface KeyBtn {
  size: number;
  label: KeyBtnParam;
  value: KeyBtnParam;
}

export interface LayoutBtn {
  name: string;
  rows: KeyBtn[][];
}

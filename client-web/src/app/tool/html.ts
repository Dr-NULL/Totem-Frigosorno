export class Html<T extends Element = HTMLElement> {
  private self: T;
  public get raw(): T {
    return this.self;
  }

  public static create(nodeName: string = null) {
    if (nodeName == null) {
      nodeName = 'div';
    }
    return new Html(document.createElement(nodeName));
  }

  constructor(ref: T | string) {
    if (typeof ref === 'string') {
      const node: T = document.querySelector(ref);
      this.self = node;
    } else if (typeof ref === 'object') {
      this.self = ref as T;
    } else {
      throw new Error('The "ref" parameter is invalid.');
    }
  }

  public isSameNode(other: Element) {
    return this.self.isSameNode(other);
  }

  public contains(other: Element) {
    return this.self.contains(other);
  }

  public isInsideOf(selector: string, isSame: boolean = false) {
    // Llenar Lista de Elementos
    const nodeList: Element[] = [];
    document
      .querySelectorAll(selector)
      .forEach((obj: T) => {
        nodeList.push(obj);
      });

    for (const node of nodeList) {
      if (
        (isSame) &&
        (node.isSameNode(this.self))
      ) {
        // El elemento es el mismo que el nodo seleccionado
        return true;
      } else {
        // Comparar el padre del elemento propio
        let ref = node;
        while (ref != null) {
          if (ref.contains(this.self)) {
            return true;
          } else {
            ref = ref.parentElement;
          }
        }
      }
    }

    return false;
  }

  public get outerHTML(): string {
    return this.self.outerHTML;
  }
  public set outerHTML(v: string) {
    this.self.outerHTML = v;
  }

  getAncestor(selector: string) {
    let out: Element = this.self;

    while (out != null) {
      const tmp = out
        .parentElement;

      if (tmp != null) {
        let found: HTMLElement = null;
        const query = tmp.querySelectorAll(selector);

        query.forEach((item: HTMLElement) => {
            if (item.contains(this.self)) {
              found = item;
            }
          });

        if (found != null) {
          return new Html(found);
        } else {
          out = out.parentElement;
        }
      } else {
        out = null;
      }
    }
  }
}

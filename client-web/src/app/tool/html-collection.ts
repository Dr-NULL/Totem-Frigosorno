export class HtmlCollection<T extends Element, K extends keyof HTMLElementEventMap> {
  private elements: T[];
  public get count(): number {
    return this.elements.length;
  }

  private events: Array<{
    name: string;
    callback: (ev: DocumentEventMap[K]) => any
  }>;

  constructor(selector: string) {
    // Llenar array de Referencias del selector
    this.elements = [];
    this.events = [];
    document
      .querySelectorAll(selector)
      .forEach((obj: T) => {
        this.elements.push(obj);
      });
  }

  public addEvent(event: K, callback: (ev: DocumentEventMap[K]) => any) {
    for (const item of this.elements) {
      item.addEventListener(event, callback);
      this.events.push({
        name: event,
        callback
      });
    }
  }

  public clearEvent(event: K) {
    let i = 0;

    while (i < this.events.length) {
      if (this.events[i].name !== event) {
        i++;
      } else {
        for (const elem of this.elements) {
          elem.removeEventListener(
            this.events[i].name,
            this.events[i].callback
          );
        }

        this.events.splice(i, 1);
      }
    }

    console.log(this.events);
  }

  public rawNodes(callback: (node: T) => void) {
    for (const node of this.elements) {
      callback(node);
    }
  }
}

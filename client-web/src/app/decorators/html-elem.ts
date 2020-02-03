/**
 * Permite obtener una referencia de un input dentro de la clase. Su estructura básica:
 * `<input h="name" [...] />`
 * @param name valor que tendrá el selector (por defecto "h") del input a seleccionar.
 * @param selector [ default = "h" ] nombre del selector a usar.
 */
export function HtmlElem(name: string = null, selector: string = 'h') {
    return (target: object, key: string | symbol) => {
      // Armar Query
      let query = '';
      let constr = target.constructor.name;
      constr = constr.replace(/component$/gi, '');
      constr.match(/[A-Z][a-z]+/g).forEach((a, i) => {
        if (i > 0) {
          query += '-';
        }
        query += a.toLowerCase();
      });
      if (name === null) {
        query = `app-${query} *[${selector}=${key as string}]`;
      } else {
        query = `app-${query} *[${selector}=${name}]`;
      }

      // Bindear Propiedad
      Object.defineProperty(target, key, {
        get: () => {
          const ref: HTMLElement = document.querySelector(query);
          if (ref === null) {
            console.error(`No existe el elemento <input ${selector}="${name}" [...] />`);
          } else {
            return ref;
          }
        }
      });
    };
  }

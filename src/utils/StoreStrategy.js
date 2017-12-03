// @flow

export default class StoreStrategy {
  state: { [string]: any };
  current: { [string]: any };
  isChanged: boolean;

  constructor(data: { [string]: any } = {}) {
    this.current = { ...data };
    this.isChanged = false;
    this.state = Object.create(null);

    /*::`*/
    const props = Object.keys(data).reduce((data, name) => {
      const gname = `_${name}Getter`;

      const prop = data[ name ] = {
        enumerable: true
      };

      prop.get = (gname in this) ?
        () => this[ gname ]() :
        () => this.current[ name ];

      prop.get.displayName = gname;

      if (name !== name.toUpperCase()) {
        const sname = `_${name}Setter`;

        prop.set = (sname in this) ?
          (value) => this[ sname ](value) :
          (value) => {
            this.current[ name ] = value;
            this.isChanged = true;
          };

        prop.set.displayName = sname;
      }

      return data;
    }, {});

    Object.defineProperties(this.state, props);
    /*::`;*/
  }

  destroy () {
    this.current = undefined;
    this.state = undefined;
  }

  update (data: { [ string ]: any }): boolean {
    this.isChanged = false;

    if (!data) {
      return this.isChanged;
    }

    for (const name in data) {
      if (
        data.hasOwnProperty(name) &&
        name in this.state &&
        data[ name ] !== this.state[ name ]
      ) {
        this.state[ name ] = data[ name ];
      }
    }

    return this.isChanged;
  }
}

/**
 * Вывод:
 * - 12 часов во вьюпорте
 */

import { Component } from '../../utils/Component';

export default class Year extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {};
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>

      </div>
    );
  }
}

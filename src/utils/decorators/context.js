import React from 'react';
import Datetime from '../Datetime';
import Events from '../Events';
import CommonStore from '../../store/CommonStore';

const PropTypes = React.PropTypes;

export default function context (component) {
  component.contextTypes = {
    datetime: PropTypes.instanceOf(Datetime),
    events: PropTypes.instanceOf(Events),
    store: PropTypes.instanceOf(CommonStore),
  };
}

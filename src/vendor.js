import _preact from 'preact'
import _preact_compat from 'preact-compat'
import _classnames from 'classnames'
import _raf from 'raf'
import _setimmediate2 from 'setimmediate2'
import _prop_types from 'prop-types'

import 'es6-symbol/implement'

import './vendor.less'

_raf.polyfill()
_setimmediate2.polifill()

export default {
  _classnames,
  _preact_compat,
  _preact,
  _prop_types,
}

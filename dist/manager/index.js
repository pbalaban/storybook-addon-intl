'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = register;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _LocalePanel = require('./containers/LocalePanel');

var _LocalePanel2 = _interopRequireDefault(_LocalePanel);

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register() {
    _addons2.default.register(_shared.ADDON_ID, function () {
        _addons2.default.addPanel(_shared.PANEL_ID, {
            title: 'Locales',
            render: function render() {
                return _react2.default.createElement(_LocalePanel2.default, { channel: _addons2.default.getChannel() });
            }
        });
    });
}
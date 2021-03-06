'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withIntl = exports.setIntlConfig = exports._config = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _WithIntl = require('./containers/WithIntl');

var _WithIntl2 = _interopRequireDefault(_WithIntl);

var _shared = require('../shared');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config = exports._config = null;

var setIntlConfig = exports.setIntlConfig = function setIntlConfig(config) {
    exports._config = _config = config;

    var channel = _addons2.default.getChannel();
    channel.emit(_shared.EVENT_SET_CONFIG_ID, {
        locales: config.locales,
        defaultLocale: config.defaultLocale
    });
};

var withIntl = exports.withIntl = function withIntl(story) {
    var channel = _addons2.default.getChannel();

    var intlConfig = (0, _utils.omit)(_config, ['locales', 'getMessages']);

    return _react2.default.createElement(
        _WithIntl2.default,
        { intlConfig: intlConfig, locales: _config.locales, getMessages: _config.getMessages, channel: channel },
        story()
    );
};
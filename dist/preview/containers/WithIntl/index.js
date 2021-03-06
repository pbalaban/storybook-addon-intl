'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _shared = require('../../../shared');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithIntl = function (_React$Component) {
    _inherits(WithIntl, _React$Component);

    function WithIntl(props) {
        _classCallCheck(this, WithIntl);

        var _this = _possibleConstructorReturn(this, (WithIntl.__proto__ || Object.getPrototypeOf(WithIntl)).call(this, props));

        _this.state = {
            locale: props.intlConfig.defaultLocale || null
        };

        _this.setLocale = _this.setLocale.bind(_this);

        var channel = _this.props.channel;

        // Listen for change of locale

        channel.on(_shared.EVENT_SET_LOCALE_ID, _this.setLocale);

        // Request the current locale
        channel.emit(_shared.EVENT_GET_LOCALE_ID);
        return _this;
    }

    _createClass(WithIntl, [{
        key: 'setLocale',
        value: function setLocale(locale) {
            this.setState({
                locale: locale
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.channel.removeListener(_shared.EVENT_SET_LOCALE_ID, this.setLocale);
        }
    }, {
        key: 'render',
        value: function render() {
            // If the component is not initialized we don't want to render anything
            if (!this.state.locale) {
                return null;
            }

            var _props = this.props,
                children = _props.children,
                getMessages = _props.getMessages,
                intlConfig = _props.intlConfig;
            var locale = this.state.locale;

            var messages = getMessages(locale);

            return _react2.default.createElement(
                _reactIntl.IntlProvider,
                _extends({}, intlConfig, { key: locale, locale: locale, messages: messages }),
                children
            );
        }
    }]);

    return WithIntl;
}(_react2.default.Component);

WithIntl.propTypes = {
    intlConfig: _propTypes2.default.shape({
        locale: _propTypes2.default.string,
        formats: _propTypes2.default.object,
        messages: _propTypes2.default.object,
        textComponent: _propTypes2.default.any,
        defaultLocale: _propTypes2.default.string,
        initialNow: _propTypes2.default.any,
        defaultFormats: _propTypes2.default.object
    }).isRequired,
    locales: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
    getMessages: _propTypes2.default.func.isRequired,
    channel: _propTypes2.default.shape({
        emit: _propTypes2.default.func.isRequired,
        on: _propTypes2.default.func.isRequired,
        removeListener: _propTypes2.default.func.isRequired
    }).isRequired
};

exports.default = WithIntl;
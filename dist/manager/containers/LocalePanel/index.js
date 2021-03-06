'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shared = require('../../../shared');

var _LocaleButton = require('../../components/LocaleButton');

var _LocaleButton2 = _interopRequireDefault(_LocaleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelStyle = {
    flexGrow: 0,
    display: 'flex',
    alignSelf: 'flex-start'
};

var LocalePanel = function (_React$Component) {
    _inherits(LocalePanel, _React$Component);

    function LocalePanel(props) {
        _classCallCheck(this, LocalePanel);

        var _this = _possibleConstructorReturn(this, (LocalePanel.__proto__ || Object.getPrototypeOf(LocalePanel)).call(this, props));

        _this.state = {
            locales: [],
            activeLocale: null
        };

        _this.setConfig = _this.setConfig.bind(_this);
        _this.getLocale = _this.getLocale.bind(_this);
        _this.handleClickLocaleButton = _this.handleClickLocaleButton.bind(_this);

        _this.props.channel.on(_shared.EVENT_SET_CONFIG_ID, _this.setConfig);
        _this.props.channel.on(_shared.EVENT_GET_LOCALE_ID, _this.getLocale);
        return _this;
    }

    _createClass(LocalePanel, [{
        key: 'setConfig',
        value: function setConfig(config) {
            var locales = config.locales,
                defaultLocale = config.defaultLocale;


            var activeLocale = this.state.activeLocale;
            // If active locale is not in the list of available locales use default locale as new active
            if (!activeLocale || !~locales.indexOf(activeLocale)) {
                activeLocale = defaultLocale;
            }

            this.setState({
                locales: locales,
                activeLocale: activeLocale
            });
        }
    }, {
        key: 'getLocale',
        value: function getLocale() {
            this.props.channel.emit(_shared.EVENT_SET_LOCALE_ID, this.state.activeLocale);
        }
    }, {
        key: 'handleClickLocaleButton',
        value: function handleClickLocaleButton(locale) {
            this.setState({
                activeLocale: locale
            });

            this.props.channel.emit(_shared.EVENT_SET_LOCALE_ID, locale);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.channel.removeListener(_shared.EVENT_SET_CONFIG_ID, this.setConfig);
            this.props.channel.removeListener(_shared.EVENT_GET_LOCALE_ID, this.getLocale);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                activeLocale = _state.activeLocale,
                locales = _state.locales;


            if (!locales.length) {
                return null;
            }

            var items = locales.map(function (locale) {
                return _react2.default.createElement(_LocaleButton2.default, {
                    key: locale,
                    locale: locale,
                    active: locale === activeLocale,
                    onClick: _this2.handleClickLocaleButton
                });
            });

            return _react2.default.createElement(
                'div',
                { style: panelStyle },
                items
            );
        }
    }]);

    return LocalePanel;
}(_react2.default.Component);

LocalePanel.propTypes = {
    channel: _propTypes2.default.shape({
        emit: _propTypes2.default.func.isRequired,
        on: _propTypes2.default.func.isRequired,
        removeListener: _propTypes2.default.func.isRequired
    }).isRequired
};

exports.default = LocalePanel;
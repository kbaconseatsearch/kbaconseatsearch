'use strict';

var pick = require('lodash.pick');
var union = require('lodash.union');
var React11 = require('react');
var reactDom = require('react-dom');
var isEqual = require('lodash.isequal');
var fetchPonyfill = require('fetch-ponyfill');
var reselect = require('reselect');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var pick__default = /*#__PURE__*/_interopDefault(pick);
var union__default = /*#__PURE__*/_interopDefault(union);
var React11__default = /*#__PURE__*/_interopDefault(React11);
var isEqual__default = /*#__PURE__*/_interopDefault(isEqual);
var fetchPonyfill__default = /*#__PURE__*/_interopDefault(fetchPonyfill);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function Button({
  icon,
  text,
  style,
  isMobile,
  ...props
}) {
  return /* @__PURE__ */ React11__default.default.createElement(
    "div",
    {
      ...props,
      style: {
        backgroundColor: "transparent",
        borderRadius: 0,
        padding: isMobile ? "0.25em 0.5em" : "0.5em 1em",
        outline: "none",
        cursor: "pointer",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "4px" : "6px",
        ...style || {}
      }
    },
    icon,
    text
  );
}
__name(Button, "Button");
var swatch_default = /* @__PURE__ */ __name((props) => /* @__PURE__ */ React11__default.default.createElement(
  "div",
  {
    style: {
      ...props.style || {},
      height: 14,
      width: 14,
      borderRadius: 4,
      backgroundColor: props.color,
      display: "inline-block"
    }
  }
), "default");
var IconChevronDown = /* @__PURE__ */ __name(() => /* @__PURE__ */ React11__default.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 512 512" }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
  }
)), "IconChevronDown");
var IconChevronUp = /* @__PURE__ */ __name(() => /* @__PURE__ */ React11__default.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 512 512" }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
  }
)), "IconChevronUp");

// src/Legend/index.tsx
var formatCurrency = new Intl.NumberFormat(void 0, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
}).format;
var _Legend = class _Legend extends React11.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      isOpen: this.props.openLegendInitially || false
    });
  }
  render() {
    const { isOpen } = this.state;
    const { ranges, isMobile, showLegendOpenAlwaysForDesktop } = this.props;
    return showLegendOpenAlwaysForDesktop && !isMobile ? /* @__PURE__ */ React11__default.default.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React11__default.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          backgroundColor: "white",
          right: -2,
          border: "2px solid lightgray",
          borderRadius: "0 0 5px 5px"
        }
      },
      /* @__PURE__ */ React11__default.default.createElement("h3", { style: { padding: "0 0 0 8px", textAlign: "left" } }, "Map Legend"),
      ranges.map((range) => /* @__PURE__ */ React11__default.default.createElement("div", { key: range.color, style: { padding: 8, textAlign: "left" } }, /* @__PURE__ */ React11__default.default.createElement(swatch_default, { color: range.color, style: { marginRight: 8 } }), /* @__PURE__ */ React11__default.default.createElement("span", null, formatCurrency(Math.floor(range.min)), " - ", formatCurrency(Math.ceil(range.max)))))
    )) : /* @__PURE__ */ React11__default.default.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React11__default.default.createElement(
      Button,
      {
        onClick: () => this.setState({ isOpen: !isOpen }),
        icon: isOpen ? /* @__PURE__ */ React11__default.default.createElement(IconChevronUp, null) : /* @__PURE__ */ React11__default.default.createElement(IconChevronDown, null),
        text: `${isOpen ? "Hide " : "Show "}Map Legend`,
        isMobile
      }
    ), ranges.length > 0 && isOpen && /* @__PURE__ */ React11__default.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          backgroundColor: "white",
          right: -2,
          border: "2px solid lightgray",
          borderRadius: "0 0 5px 5px"
        }
      },
      ranges.map((range) => /* @__PURE__ */ React11__default.default.createElement("div", { key: range.color, style: { padding: 8, textAlign: "left" } }, /* @__PURE__ */ React11__default.default.createElement(swatch_default, { color: range.color, style: { marginRight: 8 } }), /* @__PURE__ */ React11__default.default.createElement("span", null, formatCurrency(Math.floor(range.min)), " - ", formatCurrency(Math.ceil(range.max)))))
    ));
  }
};
__name(_Legend, "Legend");
__publicField(_Legend, "defaultProps", {
  isMobile: false,
  showLegendOpenAlwaysForDesktop: false,
  openLegendInitially: false
});
var Legend = _Legend;
function ActionGroup_default(props) {
  return /* @__PURE__ */ React11__default.default.createElement(
    "div",
    {
      ...props,
      style: {
        pointerEvents: "all",
        border: "2px solid lightgray",
        borderRadius: 5,
        display: "flex",
        backgroundColor: "white",
        ...props.style || {}
      }
    }
  );
}
__name(ActionGroup_default, "default");
var IconPlus = /* @__PURE__ */ __name(() => /* @__PURE__ */ React11__default.default.createElement("svg", { width: "14", height: "16", viewBox: "0 0 448 512" }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
  }
)), "IconPlus");
var IconMinus = /* @__PURE__ */ __name(() => /* @__PURE__ */ React11__default.default.createElement("svg", { width: "14", height: "16", viewBox: "0 0 448 512" }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M432 256c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32h352c17.7 0 32 14.3 32 32z"
  }
)), "IconMinus");
var IconUndo = /* @__PURE__ */ __name(() => /* @__PURE__ */ React11__default.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 512 512" }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2S50.1 48.1 57 55l41.6 41.6c87.6-86.5 228.7-86.2 315.8 1 87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2S177.7 224 168 224H48.5z"
  }
)), "IconUndo");
var IconClose = /* @__PURE__ */ __name(() => /* @__PURE__ */ React11__default.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 512 512" }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-81-337c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
  }
)), "IconClose");

// src/Actions/index.tsx
var _Actions = class _Actions extends React11__default.default.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "container", React11__default.default.createRef());
    __publicField(this, "timer");
    __publicField(this, "state", {
      // initial value, would correct itself after first render
      // TODO: we should refactor this to an FC component and some variant of useMediaQuery
      isMobile: false
    });
    __publicField(this, "updateIsMobile", /* @__PURE__ */ __name(() => {
      const currentContainer = this.getCurrentContainer();
      if (!currentContainer) {
        return;
      }
      const isMobile = window.innerWidth < 520 || currentContainer.clientWidth < 400;
      if (this.state.isMobile !== isMobile) {
        this.setState({ isMobile });
      }
    }, "updateIsMobile"));
    __publicField(this, "getCurrentContainer", /* @__PURE__ */ __name(() => {
      return this.container.current;
    }, "getCurrentContainer"));
  }
  get styles() {
    return {
      container: {
        position: "absolute",
        top: this.state.isMobile ? 0 : 10,
        left: this.state.isMobile ? 0 : 10,
        right: this.state.isMobile ? 0 : 10,
        bottom: this.state.isMobile ? 0 : 10,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        opacity: 0.9,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        maxWidth: "100%",
        fontSize: "0.75em"
      },
      icon: {
        display: "inline-block",
        fontSize: "inherit",
        height: "1.333333333em",
        overflow: "visible",
        verticalAlign: "-0.125em"
      }
    };
  }
  componentDidMount() {
    this.timer = window.setInterval(this.updateIsMobile, 200);
  }
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
  render() {
    const { isMobile } = this.state;
    const { showControls, showLegend } = this.props;
    const showLeftActions = showControls || isMobile && showLegend;
    const showRightActions = !isMobile && showLegend;
    return /* @__PURE__ */ React11__default.default.createElement(
      "div",
      {
        style: this.styles.container,
        ref: this.container,
        "data-testid": "seatmaps-actions-menu"
      },
      showLeftActions && /* @__PURE__ */ React11__default.default.createElement(ActionGroup_default, null, !isMobile && showControls && /* @__PURE__ */ React11__default.default.createElement(React11__default.default.Fragment, null, /* @__PURE__ */ React11__default.default.createElement(
        Button,
        {
          "data-rh": "Default",
          "data-custom-at": "right",
          onClick: this.props.onZoomIn,
          icon: /* @__PURE__ */ React11__default.default.createElement(IconPlus, null),
          isMobile,
          style: { borderRight: "2px solid lightgray" },
          name: "zoom-in",
          "data-testid": "zoom-in"
        }
      ), /* @__PURE__ */ React11__default.default.createElement(
        Button,
        {
          onClick: this.props.onZoomOut,
          icon: /* @__PURE__ */ React11__default.default.createElement(IconMinus, null),
          isMobile,
          style: { borderRight: "2px solid lightgray" },
          name: "zoom-out",
          "data-testid": "zoom-out"
        }
      ), /* @__PURE__ */ React11__default.default.createElement(
        Button,
        {
          onClick: this.props.onResetZoom,
          icon: /* @__PURE__ */ React11__default.default.createElement(IconUndo, null),
          text: "Reset Zoom",
          isMobile,
          style: { borderRight: "2px solid lightgray" },
          name: "reset-zoom",
          "data-testid": "reset-zoom"
        }
      )), showControls && /* @__PURE__ */ React11__default.default.createElement(
        Button,
        {
          className: "clear-selection",
          onClick: this.props.onClearSelection,
          icon: /* @__PURE__ */ React11__default.default.createElement(IconClose, null),
          text: `Clear${isMobile ? "" : " All"}`,
          isMobile,
          style: {
            borderRight: isMobile ? "2px solid lightgray" : void 0
          },
          name: "clear-selection"
        }
      ), isMobile && showLegend && /* @__PURE__ */ React11__default.default.createElement(Legend, { isMobile: true, ranges: this.props.ranges })),
      showRightActions && /* @__PURE__ */ React11__default.default.createElement(ActionGroup_default, null, /* @__PURE__ */ React11__default.default.createElement(
        Legend,
        {
          ranges: this.props.ranges,
          showLegendOpenAlwaysForDesktop: this.props.showLegendOpenAlwaysForDesktop,
          openLegendInitially: this.props.openLegendInitially
        }
      ))
    );
  }
};
__name(_Actions, "Actions");
__publicField(_Actions, "defaultProps", {
  showLegend: true,
  showLegendOpenAlwaysForDesktop: false,
  showControls: true,
  openLegendInitially: false,
  onClearSelection: () => {
  }
});
var Actions = _Actions;
var defaultDirection = ["up", "right"];
var formatCurrency2 = new Intl.NumberFormat(void 0, {
  style: "currency",
  currency: "USD"
}).format;
var _Tooltip = class _Tooltip extends React11.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "container", React11__default.default.createRef());
  }
  direction() {
    const container = this.container.current;
    const { x, y } = this.props;
    const direction = [...defaultDirection];
    if (!container || !container.parentElement) {
      return direction;
    }
    if (x + container.clientWidth > container.parentElement.clientWidth) {
      direction[1] = "left";
    }
    if (y < container.clientHeight) {
      direction[0] = "down";
    }
    return direction;
  }
  position() {
    const direction = this.direction();
    const point = {
      x: this.props.x,
      y: this.props.y
    };
    const container = this.container.current;
    if (container) {
      if (direction[0] === "up") {
        point.y -= container.clientHeight;
      }
      if (direction[1] === "left") {
        point.x -= container.clientWidth;
      }
    }
    return point;
  }
  tipStyle() {
    const direction = this.direction();
    const style = {
      width: 0,
      height: 0,
      borderStyle: "solid"
    };
    if (direction[0] === "down") {
      if (direction[1] === "right") {
        style.borderWidth = "10px 0 0 10px";
        style.borderColor = "transparent transparent transparent white";
      } else {
        style.borderWidth = "0 0 10px 10px";
        style.borderColor = "transparent transparent white transparent";
      }
    } else {
      if (direction[1] === "right") {
        style.borderWidth = "10px 10px 0 0";
        style.borderColor = "white transparent transparent transparent";
      } else {
        style.borderWidth = "0 10px 10px 0";
        style.borderColor = "transparent white transparent transparent";
      }
    }
    return style;
  }
  containerStyle() {
    const { isActive } = this.props;
    const direction = this.direction();
    const position = this.position();
    return {
      position: "fixed",
      zIndex: 1,
      transition: "top .1s, left .1s",
      opacity: isActive ? 1 : 0,
      padding: 5,
      display: "flex",
      flexDirection: direction[0] === "down" ? "column" : "column-reverse",
      alignItems: direction[1] === "right" ? "flex-start" : "flex-end",
      filter: "drop-shadow(rgba(0, 0, 0, 0.5) 0 2px 2px)",
      pointerEvents: "none",
      top: position.y,
      left: position.x
    };
  }
  swatchStyle() {
    return {
      width: 10,
      height: 10,
      backgroundColor: this.props.color,
      display: "inline-block",
      marginRight: 5
    };
  }
  contentStyle() {
    return {
      backgroundColor: "white",
      padding: 20
    };
  }
  nameStyle() {
    return {
      display: "flex",
      alignItems: "center"
    };
  }
  priceStyle() {
    return {
      fontWeight: 700
    };
  }
  render() {
    const prices = this.props.ticketGroups.map((ticketGroup) => ticketGroup.price).sort((a, b) => a - b);
    return /* @__PURE__ */ React11__default.default.createElement(
      "div",
      {
        ref: this.container,
        style: this.containerStyle(),
        "data-testid": "seatmaps-tooltip"
      },
      /* @__PURE__ */ React11__default.default.createElement("div", { style: this.tipStyle() }),
      /* @__PURE__ */ React11__default.default.createElement("div", { style: this.contentStyle() }, /* @__PURE__ */ React11__default.default.createElement("div", { style: this.nameStyle() }, /* @__PURE__ */ React11__default.default.createElement("div", { style: this.swatchStyle() }), this.props.name), /* @__PURE__ */ React11__default.default.createElement("div", null, this.props.ticketGroups.length, " listing", prices.length !== 1 ? "s" : "", " \u25CF ", "Starting at", " ", /* @__PURE__ */ React11__default.default.createElement("span", { style: this.priceStyle() }, formatCurrency2(prices[0]))))
    );
  }
};
__name(_Tooltip, "Tooltip");
__publicField(_Tooltip, "defaultProps", {
  isActive: false,
  ticketGroups: [],
  name: "",
  x: 0,
  y: 0,
  color: "#000000"
});
var Tooltip = _Tooltip;
var IconPinchZoomIn = /* @__PURE__ */ __name((props) => /* @__PURE__ */ React11__default.default.createElement("svg", { viewBox: "0 0 50 62.5", ...props }, /* @__PURE__ */ React11__default.default.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M18.343 7.009a1.92 1.92 0 0 1 2.498 1.035l6.576 15.882c.173.427.72.658 1.152.478a.88.88 0 0 0 .478-1.151l-2.317-5.597a1.901 1.901 0 0 1 .004-1.457 1.89 1.89 0 0 1 1.031-1.035 1.889 1.889 0 0 1 1.461.002c.475.197.841.562 1.035 1.032l2.68 6.475A.881.881 0 1 0 34.57 22l-1.698-4.107c-.18-.433-.18-.917.004-1.358.181-.439.52-.782.955-.963a1.781 1.781 0 0 1 2.321.962l1.897 4.581a.887.887 0 0 0 1.152.478.883.883 0 0 0 .478-1.154l-.917-2.213a1.78 1.78 0 0 1 .965-2.313 1.735 1.735 0 0 1 1.356.004c.441.181.782.522.963.955l5.132 12.506.074.213c.458 1.86.492 4.098.524 6.263.028 1.86.056 3.633.331 5.194l-13.916 5.761c-3.021-1.824-4.788-2.568-6.21-3.16-1.615-.674-2.781-1.159-5.071-2.885-1.056-.794-2.195-1.872-3.296-2.913-1.345-1.269-2.61-2.469-3.774-3.229-1.196-.781-2.433-2.207-2.301-3.003.115-.655 1.347-.787 1.872-.813a5.642 5.642 0 0 1 1.858.222c.509.151.989.369 1.426.65 1.071.689 4.72 2.929 7.577 3.424.356.059.651.067.932-.204.248-.231.365-.653.223-.969L17.312 9.506a1.914 1.914 0 0 1 1.031-2.497m4.127.361c-.777-1.87-2.933-2.767-4.799-1.988a3.68 3.68 0 0 0-1.99 4.799l9.432 22.783c-2.331-.805-4.881-2.392-5.467-2.769a7.432 7.432 0 0 0-4.329-1.152c-2.746.138-3.382 1.484-3.519 2.277-.333 1.974 1.866 3.988 3.075 4.779 1.03.672 2.241 1.818 3.527 3.031 1.136 1.077 2.314 2.187 3.445 3.039 2.469 1.861 3.788 2.409 5.452 3.105 1.502.626 3.204 1.336 6.357 3.27a.882.882 0 0 0 .462.128c.11 0 .227-.022.337-.066l15.001-6.211a.881.881 0 0 0 .52-1.023c-.377-1.539-.407-3.487-.439-5.549-.032-2.263-.068-4.602-.574-6.656a2.938 2.938 0 0 0-.152-.459l-5.135-12.51a3.497 3.497 0 0 0-1.918-1.912 3.493 3.493 0 0 0-4.188 1.174c-.874-1.521-2.752-2.211-4.411-1.519a3.518 3.518 0 0 0-1.483 1.178 3.63 3.63 0 0 0-1.776-1.581 3.639 3.639 0 0 0-2.809-.004 3.609 3.609 0 0 0-1.554 1.24L22.47 7.37zm-6.233-5.449a7.673 7.673 0 0 0-4.184 4.185 7.663 7.663 0 0 0 0 5.92c.176.43.389.836.629 1.214a.882.882 0 0 0 1.485-.95 5.867 5.867 0 0 1-.487-.939 5.956 5.956 0 0 1 0-4.563 5.952 5.952 0 0 1 3.232-3.241 5.945 5.945 0 0 1 4.572.002 5.939 5.939 0 0 1 3.229 3.232c.14.339.249.686.323 1.031a.875.875 0 0 0 1.051.674.884.884 0 0 0 .674-1.047 8.235 8.235 0 0 0-.418-1.332 7.69 7.69 0 0 0-4.184-4.186 7.677 7.677 0 0 0-5.922 0zm2.993 23.885a7.382 7.382 0 0 0-5.642-.783 7.386 7.386 0 0 0-4.542 3.436 7.381 7.381 0 0 0-.78 5.641 7.38 7.38 0 0 0 3.435 4.542c.387.227.786.413 1.19.564.447.18.965-.068 1.133-.517a.879.879 0 0 0-.517-1.132 5.757 5.757 0 0 1-.913-.435 5.652 5.652 0 0 1-2.624-3.465 5.641 5.641 0 0 1 .598-4.305 5.64 5.64 0 0 1 3.466-2.624 5.65 5.65 0 0 1 4.304.598c.303.176.58.377.837.595a.88.88 0 0 0 1.244-.094.885.885 0 0 0-.096-1.245 7.708 7.708 0 0 0-1.093-.776zM3.39 6.724a.882.882 0 0 0 1.056 1.412l.752-.562L2.15 28.582l-.564-.755a.88.88 0 1 0-1.411 1.055l1.836 2.457a.882.882 0 0 0 1.232.179L5.7 29.685a.882.882 0 0 0-1.055-1.413l-.753.562L6.94 7.827l.564.755a.884.884 0 0 0 1.232.178.879.879 0 0 0 .179-1.234L7.079 5.069a.88.88 0 0 0-1.232-.179L3.39 6.724z",
    clipRule: "evenodd",
    fill: "#fff"
  }
)), "IconPinchZoomIn");
var IconTwoFingerSlide = /* @__PURE__ */ __name((props) => /* @__PURE__ */ React11__default.default.createElement("svg", { xmlSpace: "preserve", viewBox: "0 0 48 60", ...props }, /* @__PURE__ */ React11__default.default.createElement(
  "g",
  {
    fill: "none",
    stroke: "#FFF",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2"
  },
  /* @__PURE__ */ React11__default.default.createElement("path", { d: "M19 32V6a3 3 0 0 1 6 0v17M25 13V4a3 3 0 0 1 6 0v20M31 26v-7a3 3 0 0 1 6 0v10" }),
  /* @__PURE__ */ React11__default.default.createElement("path", { d: "M37 29v-6a3 3 0 0 1 6 0v9c0 8.284-6.716 15-15 15s-15-6.716-15-15v-7c0-3.313 2.688-6 6-6M9 14l-2 2-2-2M9 5 7 3 5 5M7 3v13" })
)), "IconTwoFingerSlide");

// src/ZoomHelper/index.tsx
var containerStyle = {
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  width: "100%",
  height: "100%",
  padding: "20% 30%",
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: "50% 50%",
  justifyItems: "center",
  alignItems: "top",
  color: "white",
  fontFamily: "Nunito Sans",
  fontSize: "2vw",
  fontWeight: 700,
  textTransform: "uppercase",
  textAlign: "center",
  opacity: 1,
  visibility: "visible",
  lineHeight: "initial"
};
var discoveredStyle = {
  transition: "opacity .4s, visibility .4s",
  opacity: 0,
  visibility: "hidden"
};
var imageStyle = {
  width: "10vw",
  alignSelf: "end"
};
var _ZoomHelper = class _ZoomHelper extends React11__default.default.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      discovered: false
    });
    __publicField(this, "container", React11__default.default.createRef());
    __publicField(this, "hide", /* @__PURE__ */ __name(() => {
      this.setState({
        discovered: true
      });
    }, "hide"));
    __publicField(this, "getCurrentContainer", /* @__PURE__ */ __name(() => {
      return this.container.current;
    }, "getCurrentContainer"));
    __publicField(this, "shouldHide", /* @__PURE__ */ __name((bounds) => {
      return bounds.top < window.innerHeight && bounds.top + bounds.height > 0 && bounds.left <= window.innerWidth && bounds.left + bounds.width > 0;
    }, "shouldHide"));
    __publicField(this, "handleViewportChange", /* @__PURE__ */ __name(() => {
      if (this.state.discovered) {
        return;
      }
      const currentContainer = this.getCurrentContainer();
      if (!currentContainer) {
        return;
      }
      const bounds = currentContainer.getBoundingClientRect();
      if (this.shouldHide(bounds)) {
        setTimeout(this.hide, 4e3);
      }
    }, "handleViewportChange"));
  }
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener("wheel", this.handleViewportChange);
      window.addEventListener("resize", this.handleViewportChange);
      this.handleViewportChange();
    }, 500);
  }
  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleViewportChange);
    window.removeEventListener("resize", this.handleViewportChange);
  }
  render() {
    const style = {
      ...containerStyle,
      ...this.state.discovered ? discoveredStyle : {}
    };
    return /* @__PURE__ */ React11__default.default.createElement("div", { style, ref: this.container, onClick: this.hide }, /* @__PURE__ */ React11__default.default.createElement(
      "link",
      {
        href: "https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap",
        rel: "stylesheet"
      }
    ), /* @__PURE__ */ React11__default.default.createElement(IconPinchZoomIn, { className: "zoom-in-icon", style: imageStyle }), /* @__PURE__ */ React11__default.default.createElement(IconTwoFingerSlide, { className: "slide-icon", style: imageStyle }), /* @__PURE__ */ React11__default.default.createElement("div", null, "pinch to zoom in/out"), /* @__PURE__ */ React11__default.default.createElement("div", null, "use two fingers to move map"));
  }
};
__name(_ZoomHelper, "ZoomHelper");
var ZoomHelper = _ZoomHelper;
function MissingSeatMapLogo() {
  return /* @__PURE__ */ React11__default.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      "data-name": "Layer 2",
      viewBox: "0 0 551.25 356.37",
      width: "145",
      height: "145"
    },
    /* @__PURE__ */ React11__default.default.createElement(
      "path",
      {
        d: "M551.25 199.17c-2.23 4.39-4.41 9.15-9.58 10.46-4.67 1.18-9.61 1.29-15.05 1.95 0 9.76-.04 19.67.08 29.59.01.81 1.08 1.75 1.86 2.38 2.87 2.33 4.24 5.22 3.05 8.8-1.2 3.61-3.73 5.82-7.77 5.82-12.04 0-24.07.03-36.11-.02-3.75-.02-6.89-1.98-7.34-5.5-.35-2.73 1.25-5.75 2.18-8.57.54-1.65 2.08-3.15 2.12-4.75.22-8.07-.05-16.16.17-24.23.09-3.5-1.35-4.23-4.49-4.2-11.4.14-22.81.15-34.21 0-3.33-.05-4.4 1.08-4.36 4.38.15 12.2.15 24.4 0 36.59-.04 3.33 1.11 4.22 4.36 4.4 10.32.59 15.74 6.55 15.82 16.88.05 6.34.05 12.67 0 19.01-.09 10.67-5.99 16.66-16.74 17.07q-7.93.3-7.93 8.22c0 5.07-.03 10.14.01 15.21.03 3.98-.77 7.96 3.59 10.95 1.48 1.01 2.09 5.37 1.17 7.25-1.12 2.28-4.14 4.75-6.58 5.04-6.41.75-12.95.38-19.45.41-5.54.03-11.09 0-16.63-.02-3.83 0-6.89-1.48-8.29-5.17-1.37-3.65-.26-6.72 2.66-9.38 1.01-.92 1.79-2.62 1.82-3.98.17-8.23.21-16.48-.05-24.71-.04-1.29-1.81-3.61-2.79-3.62-19.46-.22-38.92-.16-59.16-.16v6.8c0 6.81-.17 13.63.11 20.43.08 1.87 1.61 3.65 2.29 5.54 1.01 2.79 2.8 5.73 2.55 8.45-.33 3.55-3.48 5.64-7.2 5.67-12.35.09-24.71.28-37.04-.21-2.36-.09-5.85-2.71-6.56-4.9-.79-2.42.89-5.73 1.73-8.57.58-1.95 2.21-3.77 2.26-5.67.25-8.98.11-17.98.11-26.85-10.43-2.03-20.39-1.77-30.33-.54-.92.11-2.3 2-2.32 3.09-.19 8.55-.2 17.11-.01 25.66.03 1.31 1.11 2.83 2.12 3.82 2.64 2.59 3.78 5.49 2.46 9.01-1.3 3.49-3.98 5.24-7.7 5.25-11.88.03-23.76.06-35.63 0-3.84-.02-6.73-1.85-7.98-5.59-1.2-3.58.19-6.36 2.91-8.86 1.09-1 1.94-2.83 1.97-4.3.19-8.07-.04-16.16.15-24.23.08-3.18-1.08-4.07-4.12-4.05-18.06.1-36.11.1-54.17 0-3.02-.02-4.25.86-4.14 4.05.2 6.33.03 12.67.07 19.01.03 4.13-.38 7.86 3.63 11.37 4.69 4.1 1.08 11.87-5.48 12.45-5.19.45-10.44.22-15.67.23-6.97.01-13.94 0-20.91-.07-3.68-.03-6.47-1.7-7.8-5.16-1.33-3.47-.21-6.41 2.37-9.06 1.08-1.1 2.07-2.84 2.1-4.31.2-8.23 0-16.47.15-24.71.05-2.91-.99-3.97-3.87-3.81-2.36.13-4.76.01-7.1-.33-7.82-1.16-13.1-7-13.3-14.89-.18-7.12-.14-14.26-.06-21.38.11-9.71 5.69-15.83 15.43-16.27 3.88-.18 4.77-1.49 4.71-5.06-.18-11.72-.19-23.45 0-35.16.06-3.78-.84-5.33-4.97-5.23-11.24.27-22.49.2-33.73.03-3.52-.06-4.76 1.09-4.64 4.62.22 6.33.05 12.67.06 19.01 0 4.02-.28 7.6 3.61 10.96 4.47 3.86 1.05 12.23-5.01 12.44-12.81.46-25.66.4-38.46-.1-2.25-.09-5.51-3.04-6.25-5.33-.74-2.28.3-6.15 2.01-7.96 2-2.12 2.55-3.99 2.53-6.59-.07-8.7-.03-17.4-.03-26.64-2.78-.13-5.24-.27-7.7-.34-10.7-.36-16.63-6.31-16.72-17.01-.05-6.49-.07-12.99 0-19.48.11-9.69 5.75-15.97 15.38-16.38 4.09-.17 4.95-1.61 4.89-5.36-.2-12.83-.15-25.66-.03-38.49.06-6.33 3.4-9.67 8.8-9.28 4.66.34 7.24 3.69 7.28 9.9.08 12.2.02 24.4.03 36.59q0 6.45 6.37 6.46c20.43 0 40.86-.11 61.29.09 4.15.04 5.57-1.06 5.35-5.31-.52-10.36.23-20.59 5.37-29.99 8.18-14.95 20.93-22.81 37.78-24.27 1.42-.12 2.84-.22 4.26-.34.14-.01.28-.13.94-.44.12-1.04.4-2.38.4-3.72.03-15.68.16-31.37-.02-47.05-.2-17.59-11.42-29.92-28.62-30.32-22-.51-44.03-.42-66.03.15-14.28.37-25.71 11.81-26.71 26.1-.67 9.62-.25 19.31-.41 28.97-.03 2.03.24 4.65-.86 5.96-1.85 2.21-4.5 4.56-7.16 5.07-3.39.66-7.26-1.57-7.38-5.22-.58-17.45-3.94-35.41 4.15-51.92C32.78 10.06 45.93 1.01 63.62.56c22-.56 44.05-.89 66.02-.07 26.79 1 44.35 20 44.66 46.88.17 15.05.03 30.1.04 45.15v5.76c7.58 0 14.65.17 21.69-.21.9-.05 2.36-2.88 2.38-4.44.18-14.89.04-29.78.14-44.67.05-8.3 1.14-16.5 5.14-23.9C212.22 9.26 225.61.64 243.57.39c22.64-.32 45.3-.43 67.92.35 20.65.71 39.1 18.73 40.31 39.3 1.03 17.52.75 35.13.77 52.7 0 4.18.9 5.98 5.5 5.67 5.98-.42 12.01-.1 18.59-.1.1-2.11.26-3.94.26-5.77.02-15.05-.11-30.1.05-45.15.23-22.86 12.92-39.73 34.32-45.65 3.47-.96 7.19-1.39 10.79-1.4 22.49-.03 44.99-.38 67.45.38 20.74.7 38.92 18.24 40.78 38.97 1.03 11.48.66 23.1.6 34.65-.03 5.22-3.26 8.16-7.95 8.17-4.66.02-7.81-2.89-7.97-8.18-.26-8.7-.07-17.42-.13-26.13-.13-19.71-11.99-31.73-31.67-31.79-20.9-.07-41.82-.26-62.71.3-13.96.37-25.85 10.66-26.65 24.4-1.09 18.76-.27 37.63-.27 56.79 1.15.15 2.35.39 3.57.47 26.63 1.82 44.28 20.42 44.72 47.15.05 3.01.1 6.02 0 9.03-.09 2.4.83 3.43 3.3 3.42 22.17-.04 44.35-.06 66.52.02 3.5.01 3.21-2.16 3.21-4.43 0-12.99-.06-25.98.03-38.97.04-6.1 2.78-9.43 7.53-9.65 5.26-.24 8.48 2.96 8.55 9.06.14 11.88.05 23.76.05 35.64v8.18c9.64-.56 16.65 2.96 20.21 11.9v29.47Zm-364.89 56.98c18.68 0 37.36-.07 56.03.06 3.54.03 5.02-.72 5-4.7-.15-35.3.02-70.61-.13-105.91-.08-18.95-12.42-31.05-31.37-31.12-19.63-.08-39.25-.08-58.88 0-18.94.07-31.39 12.19-31.48 31.04-.16 35.3 0 70.61-.13 105.91-.01 3.85 1.26 4.82 4.92 4.79 18.68-.15 37.35-.07 56.03-.07Zm178.5 0c18.52 0 37.04-.12 55.55.09 4.13.05 5.41-1.04 5.39-5.29-.16-34.82-.04-69.65-.11-104.48-.04-19.79-12.24-31.94-31.96-31.99-19.31-.05-38.62-.05-57.93 0-19.56.05-31.79 12.08-31.85 31.6-.1 34.98.05 69.97-.13 104.95-.02 4.37 1.48 5.24 5.48 5.2 18.52-.19 37.04-.08 55.55-.08ZM275.63 16.63v-.26c-9.66 0-19.32-.05-28.98.01-19.83.12-31.91 12.18-32 32-.07 14.57.2 29.14-.14 43.7-.12 4.98 1.42 6.29 6.28 6.53 18.87.94 35.04 13.36 40.12 31.61 2.08 7.47 2.02 15.6 2.46 23.45.19 3.3 1.1 4.45 4.4 4.32 5.53-.22 11.08-.13 16.62-.04 2.39.04 3.49-.79 3.4-3.3-.12-3.16-.09-6.34 0-9.5.39-14.26 4.96-26.62 16.26-35.97 8.21-6.79 17.58-10.46 28.24-10.83 2.01-.07 4.3.32 4.27-2.93-.17-18.05.37-36.13-.65-54.13-.75-13.27-12.75-23.98-26.09-24.58-11.37-.51-22.79-.1-34.18-.1Zm170.03 255.56h-63.1c-31.35 0-62.7.05-94.04-.06-3.64-.01-5.23.96-4.92 4.8.28 3.46.35 6.99-.01 10.44-.49 4.63 1.24 5.82 5.8 5.8 50.35-.16 100.69-.1 151.04-.1h5.23v-20.88Zm-340.04 20.63c1.51.1 2.59.24 3.67.24 51.28.01 102.56-.03 153.84.09 3.72 0 4.65-1.35 4.42-4.72-.23-3.47-.33-6.99.02-10.44.45-4.51-1.06-5.91-5.73-5.89-50.33.17-100.66.1-150.99.11-1.68 0-3.36.17-5.23.26v20.35Zm-89.23-98.05c30.22 0 59.97-.02 89.72.03 2.53 0 3.31-1.1 3.25-3.45-.1-3.8-.28-7.62.05-11.39.4-4.45-.96-6-5.7-5.96-27.38.22-54.76.1-82.14.12-1.67 0-3.34.16-5.18.26v20.4Zm518.45-.21v-19.78c-.52-.26-.79-.5-1.06-.5-29.61-.06-59.23-.14-88.84-.02-1.02 0-2.81 1.91-2.91 3.05-.36 4.09.14 8.25-.24 12.34-.4 4.36 1.38 5.25 5.41 5.22 27.72-.16 55.43-.08 83.15-.09 1.4 0 2.79-.13 4.48-.21Zm-247.07 38.82c0-6.32-.04-12.64.02-18.96.02-2.28-.63-3.54-3.21-3.49-6 .1-12.01-.12-18 .17-1.07.05-2.93 1.91-2.95 2.96-.2 12.95-.1 25.91-.16 38.87-.01 2.51 1.16 2.99 3.44 3.31 5.57.78 10.97 1.15 16.64.16 3.61-.63 4.38-1.76 4.28-5-.19-6-.05-12.01-.06-18.01Zm-12.13-38.6c2.84 0 5.68-.11 8.51.03 2.57.12 3.75-.74 3.66-3.48-.15-4.57-.14-9.15 0-13.72.08-2.71-1.07-3.61-3.66-3.53-3.94.12-7.88-.02-11.82.04-10.14.13-8.76-1.39-8.82 8.71-.08 11.96-.02 11.96 12.14 11.96Zm234.53 47.01v-30.81c-2.41 0-4.61-.22-6.73.1-.89.13-2.3 1.39-2.31 2.16-.16 9.43-.1 18.87-.1 28.55h9.15ZM40.98 211.23v30.5h8.57v-30.5h-8.57Zm267.39 98.26v30.34h8.68v-30.34h-8.68Zm-65.41 30.41v-24.26q0-6.73-6.92-6.35c-.6.03-1.2.2-2.06.35v30.26h8.97Zm177.82-.13v-30.23h-8.89v24.29q0 6.62 6.44 6.3c.76-.04 1.5-.22 2.45-.36Zm-290.32-30.25c-.28.67-.6 1.1-.61 1.53-.07 7.58-.12 15.16-.14 22.74-.02 6.6 0 6.61 6.44 6.34.76-.03 1.51-.17 2.49-.29v-30.33h-8.18Z",
        "data-name": "Layer 1"
      }
    )
  );
}
__name(MissingSeatMapLogo, "MissingSeatMapLogo");

// src/utils/utils.ts
function getReferencePoint(svg) {
  return svg.createSVGPoint();
}
__name(getReferencePoint, "getReferencePoint");
function getScreenCTM(svg) {
  return svg.getScreenCTM();
}
__name(getScreenCTM, "getScreenCTM");
function getViewBox(svg) {
  return svg.viewBox.baseVal;
}
__name(getViewBox, "getViewBox");

// src/utils/zoom.ts
var ZOOM_COEFFICIENT = 5;
var SCROLL_PAN_COEFFICIENT = 0.5;
var MOUSE_MOVEMENT_TRAP_LOWER_BOUND = 50;
function magnitude(ax, ay, bx, by) {
  return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
}
__name(magnitude, "magnitude");
function preventDefault(event) {
  event.preventDefault();
}
__name(preventDefault, "preventDefault");
function getScrollLineHeight() {
  const iframe = document.createElement("iframe");
  iframe.src = "#";
  document.body.appendChild(iframe);
  if (!iframe.contentDocument) {
    throw new Error("unable to create an iframe to test for line height");
  }
  iframe.contentDocument.open();
  iframe.contentDocument.write(
    "<!DOCTYPE html><html><head></head><body><span>a</span></body></html>"
  );
  iframe.contentDocument.close();
  const testElement = iframe.contentDocument.querySelector("span");
  if (!testElement) {
    throw new Error("unable to find test element for line height test");
  }
  const lineHeight = testElement.offsetHeight;
  document.body.removeChild(iframe);
  return lineHeight;
}
__name(getScrollLineHeight, "getScrollLineHeight");
function initializeZoom(svg) {
  const referencePoint = getReferencePoint(svg);
  function svgPoint(x, y) {
    const matrix = getScreenCTM(svg);
    if (!matrix) {
      throw new Error(
        "cannot convert dom point to svg point due to missing conversion matrix"
      );
    }
    referencePoint.x = x;
    referencePoint.y = y;
    const p = referencePoint.matrixTransform(matrix.inverse());
    return [p.x, p.y];
  }
  __name(svgPoint, "svgPoint");
  let iTouchAX;
  let iTouchAY;
  let iTouchBX;
  let iTouchBY;
  let initialViewboxX;
  let initialViewboxY;
  let initialViewboxHeight;
  let initialViewboxWidth;
  const viewbox = getViewBox(svg);
  function updateInitialViewbox() {
    initialViewboxX = viewbox.x;
    initialViewboxY = viewbox.y;
    initialViewboxWidth = viewbox.width;
    initialViewboxHeight = viewbox.height;
  }
  __name(updateInitialViewbox, "updateInitialViewbox");
  const originalViewboxX = viewbox.x;
  const originalViewboxY = viewbox.y;
  const originalViewboxWidth = viewbox.width;
  const originalViewboxHeight = viewbox.height;
  function constrainPan() {
    const minX = originalViewboxX;
    const maxX = originalViewboxX + originalViewboxWidth - viewbox.width;
    const minY = originalViewboxY;
    const maxY = originalViewboxY + originalViewboxHeight - viewbox.height;
    viewbox.x = Math.max(minX, Math.min(maxX, viewbox.x));
    viewbox.y = Math.max(minY, Math.min(maxY, viewbox.y));
  }
  __name(constrainPan, "constrainPan");
  function translate(x, y) {
    viewbox.x += x;
    viewbox.y += y;
    constrainPan();
  }
  __name(translate, "translate");
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 1;
  function scale(scaleFactor) {
    const newHeight = viewbox.height * scaleFactor;
    const newWidth = viewbox.width * scaleFactor;
    const minViewboxHeight = originalViewboxHeight * MIN_ZOOM;
    const maxViewboxHeight = originalViewboxHeight * MAX_ZOOM;
    if (newHeight < minViewboxHeight || newHeight > maxViewboxHeight) {
      return;
    }
    const initialViewboxHeight2 = viewbox.height;
    const initialViewboxWidth2 = viewbox.width;
    viewbox.height = newHeight;
    viewbox.width = newWidth;
    translate(
      0 - (viewbox.width - initialViewboxWidth2) / 2,
      0 - (viewbox.height - initialViewboxHeight2) / 2
    );
    constrainPan();
  }
  __name(scale, "scale");
  function zoomIn(percent) {
    scale(1 - percent);
  }
  __name(zoomIn, "zoomIn");
  function zoomOut(percent) {
    scale(1 + percent);
  }
  __name(zoomOut, "zoomOut");
  function reset() {
    viewbox.x = originalViewboxX;
    viewbox.y = originalViewboxY;
    viewbox.width = originalViewboxWidth;
    viewbox.height = originalViewboxHeight;
  }
  __name(reset, "reset");
  let touching = false;
  function handleTouchStart(event) {
    if (event.touches.length !== 2) {
      return;
    }
    touching = true;
    event.preventDefault();
    const iTouchA = event.touches.item(0);
    const iTouchB = event.touches.item(1);
    if (!iTouchA || !iTouchB) {
      return;
    }
    iTouchAX = iTouchA.clientX;
    iTouchAY = iTouchA.clientY;
    iTouchBX = iTouchB.clientX;
    iTouchBY = iTouchB.clientY;
    updateInitialViewbox();
  }
  __name(handleTouchStart, "handleTouchStart");
  function handleTouchMove(event) {
    const touchA = event.touches.item(0);
    const touchB = event.touches.item(1);
    if (event.touches.length !== 2 || !touchA || !touchB) {
      return;
    }
    event.preventDefault();
    const touchAX = touchA.clientX;
    const touchAY = touchA.clientY;
    const touchBX = touchB.clientX;
    const touchBY = touchB.clientY;
    const [touchMidX, touchMidY] = svgPoint(
      (touchAX + touchBX) / 2,
      (touchAY + touchBY) / 2
    );
    const [iTouchMidX, iTouchMidY] = svgPoint(
      (iTouchAX + iTouchBX) / 2,
      (iTouchAY + iTouchBY) / 2
    );
    const iTouchMag = magnitude(iTouchAX, iTouchAY, iTouchBX, iTouchBY);
    const touchMag = magnitude(touchAX, touchAY, touchBX, touchBY);
    const magRatio = iTouchMag / touchMag;
    viewbox.height = initialViewboxHeight * magRatio;
    viewbox.width = initialViewboxWidth * magRatio;
    const dvbh = viewbox.height - initialViewboxHeight;
    const dvbw = viewbox.width - initialViewboxWidth;
    viewbox.x = initialViewboxX - touchMidX + iTouchMidX - dvbh / 2;
    viewbox.y = initialViewboxY - touchMidY + iTouchMidY - dvbw / 2;
  }
  __name(handleTouchMove, "handleTouchMove");
  function handleTouchEnd(event) {
    if (event.touches.length < 2) {
      touching = false;
    }
  }
  __name(handleTouchEnd, "handleTouchEnd");
  let iMouseX;
  let iMouseY;
  let dragging = false;
  function handleMouseDown(event) {
    iMouseX = event.clientX;
    iMouseY = event.clientY;
    event.stopPropagation();
    updateInitialViewbox();
    dragging = true;
  }
  __name(handleMouseDown, "handleMouseDown");
  function handleClick(e) {
    if (magnitude(e.clientX, e.clientY, iMouseX, iMouseY) > MOUSE_MOVEMENT_TRAP_LOWER_BOUND) {
      e.stopPropagation();
    }
  }
  __name(handleClick, "handleClick");
  function handleMouseMove(event) {
    if (!dragging) {
      return;
    }
    const [mouseSVGX, mouseSVGY] = svgPoint(event.clientX, event.clientY);
    const [iMouseSVGX, iMouseSVGY] = svgPoint(iMouseX, iMouseY);
    viewbox.x = initialViewboxX - mouseSVGX + iMouseSVGX;
    viewbox.y = initialViewboxY - mouseSVGY + iMouseSVGY;
  }
  __name(handleMouseMove, "handleMouseMove");
  function stopDragging() {
    dragging = false;
  }
  __name(stopDragging, "stopDragging");
  const lineHeight = getScrollLineHeight();
  function handleWheel(event) {
    let deltaX, deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
      deltaX = event.deltaX;
      deltaY = event.deltaY;
    } else if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      deltaX = event.deltaX * lineHeight;
      deltaY = event.deltaY * lineHeight;
    } else {
      return;
    }
    event.preventDefault();
    updateInitialViewbox();
    if (event.ctrlKey) {
      const delta = deltaY;
      const scaleFactor = 1 + delta / window.innerHeight * ZOOM_COEFFICIENT;
      const newHeight = viewbox.height * scaleFactor;
      const newWidth = viewbox.width * scaleFactor;
      const minViewboxHeight = originalViewboxHeight * MIN_ZOOM;
      const maxViewboxHeight = originalViewboxHeight * MAX_ZOOM;
      if (newHeight < minViewboxHeight || newHeight > maxViewboxHeight) {
        return;
      }
      viewbox.height = newHeight;
      viewbox.width = newWidth;
      translate(
        0 - (viewbox.width - initialViewboxWidth) / 2,
        0 - (viewbox.height - initialViewboxHeight) / 2
      );
      constrainPan();
    } else {
      translate(
        deltaX * SCROLL_PAN_COEFFICIENT,
        deltaY * SCROLL_PAN_COEFFICIENT
      );
    }
  }
  __name(handleWheel, "handleWheel");
  function handleGestureChange(event) {
    if (touching) {
      return;
    }
    updateInitialViewbox();
    viewbox.width = originalViewboxWidth * 1 / event.scale;
    viewbox.height = originalViewboxHeight * 1 / event.scale;
    viewbox.x -= (viewbox.width - initialViewboxWidth) / 2;
    viewbox.y -= (viewbox.height - initialViewboxHeight) / 2;
  }
  __name(handleGestureChange, "handleGestureChange");
  function setup() {
    svg.addEventListener("touchstart", handleTouchStart, { passive: false });
    svg.addEventListener("touchmove", handleTouchMove, { passive: false });
    svg.addEventListener("touchend", handleTouchEnd, { passive: false });
    svg.addEventListener("mousedown", handleMouseDown);
    svg.addEventListener("click", handleClick);
    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseup", stopDragging);
    svg.addEventListener("mouseleave", stopDragging);
    svg.addEventListener("wheel", handleWheel);
    svg.addEventListener("gesturestart", preventDefault, { passive: false });
    svg.addEventListener("gesturechange", preventDefault, { passive: false });
    svg.addEventListener("gesturechange", handleGestureChange);
    svg.addEventListener("gestureend", preventDefault, { passive: false });
  }
  __name(setup, "setup");
  function teardown() {
    svg.removeEventListener("touchstart", handleTouchStart);
    svg.removeEventListener("touchmove", handleTouchMove);
    svg.removeEventListener("touchend", handleTouchEnd);
    svg.removeEventListener("mousedown", handleMouseDown);
    svg.removeEventListener("click", handleClick);
    svg.removeEventListener("mousemove", handleMouseMove);
    svg.removeEventListener("mouseup", stopDragging);
    svg.removeEventListener("mouseleave", stopDragging);
    svg.removeEventListener("wheel", handleWheel);
    svg.removeEventListener("gesturestart", preventDefault);
    svg.removeEventListener("gesturechange", preventDefault);
    svg.removeEventListener("gesturechange", handleGestureChange);
    svg.removeEventListener("gestureend", preventDefault);
  }
  __name(teardown, "teardown");
  setup();
  return {
    zoomIn,
    zoomOut,
    reset,
    teardown,
    enable: setup,
    disable: teardown
  };
}
__name(initializeZoom, "initializeZoom");
var $ticketGroups = /* @__PURE__ */ __name((state) => state.ticketGroups, "$ticketGroups");
var $sectionMapping = /* @__PURE__ */ __name((state) => state.sectionMapping, "$sectionMapping");
var $sectionPercentiles = /* @__PURE__ */ __name((_state, props) => props.sectionPercentiles, "$sectionPercentiles");
var createDeepEqualSelector = reselect.createSelectorCreator(reselect.defaultMemoize, isEqual__default.default);
var $missingSectionIds = createDeepEqualSelector(
  $sectionMapping,
  $ticketGroups,
  (sectionMapping, ticketGroups) => ticketGroups.map((ticketGroup) => ticketGroup.tevo_section_name.toLowerCase()).filter((sectionId) => sectionMapping[sectionId] === void 0)
);
var $availableTicketGroups = createDeepEqualSelector(
  $ticketGroups,
  $sectionMapping,
  (ticketGroups, sectionMapping) => ticketGroups.map((ticketGroup) => {
    const section = ticketGroup.tevo_section_name.toLowerCase();
    const isSectionInTheManifest = sectionMapping[section];
    return isSectionInTheManifest && {
      section,
      price: ticketGroup.retail_price
    };
  }).filter((ticketGroup) => ticketGroup)
);
var $priceSortedTicketGroups = createDeepEqualSelector(
  $ticketGroups,
  (ticketGroups) => ticketGroups.sort((a, b) => a.retail_price - b.retail_price)
);
var $costRanges = createDeepEqualSelector(
  $sectionPercentiles,
  $priceSortedTicketGroups,
  (percentiles = {}, ticketGroups) => {
    const costRanges = Object.entries(percentiles).map(
      ([percentile, color]) => ({
        percentile: parseFloat(percentile),
        color,
        min: 0,
        max: 0,
        ticketGroups: []
      })
    ).sort((a, b) => a.percentile - b.percentile);
    if (ticketGroups.length === 1) {
      costRanges[costRanges.length - 1].ticketGroups.push(ticketGroups[0]);
    } else {
      for (let i = 0; i < ticketGroups.length; i++) {
        const percentile = i / ticketGroups.length;
        for (const costRange of costRanges) {
          if (costRange.percentile > percentile) {
            costRange.ticketGroups.push(ticketGroups[i]);
            break;
          }
        }
      }
    }
    costRanges.forEach((costRange) => {
      if (costRange.ticketGroups.length > 0) {
        costRange.min = costRange.ticketGroups[0].retail_price;
        costRange.max = costRange.ticketGroups[costRange.ticketGroups.length - 1].retail_price;
      }
    });
    return costRanges.filter(({ min, max }) => !(min === 0 && max === 0));
  }
);
var $ticketGroupsBySection = createDeepEqualSelector(
  $availableTicketGroups,
  (ticketGroups) => ticketGroups.reduce(
    (memo, ticketGroup) => ({
      ...memo,
      [ticketGroup.section]: [
        ...memo[ticketGroup.section] || [],
        ticketGroup
      ]
    }),
    {}
  )
);
var $venueSections = createDeepEqualSelector(
  $ticketGroupsBySection,
  Object.keys
);

// src/TicketMap/index.tsx
var _MapNotFoundError = class _MapNotFoundError extends Error {
  constructor(message = "This map is not currently available.") {
    super(message);
    __publicField(this, "name", "MapNotFoundError");
  }
};
__name(_MapNotFoundError, "MapNotFoundError");
var MapNotFoundError = _MapNotFoundError;
var highlightedSectionColor = "#4a4a4a";
var unhighlightedSectionColor = "#FFFFFF";
var { fetch: isomorphicFetch } = fetchPonyfill__default.default();
var _TicketMap = class _TicketMap extends React11.Component {
  constructor(props) {
    super(props);
    __publicField(this, "publicApi");
    __publicField(this, "mapRoot", React11__default.default.createRef());
    __publicField(this, "container", React11__default.default.createRef());
    __publicField(this, "zoom");
    __publicField(this, "isTouchDevice", /* @__PURE__ */ __name(() => {
      return "ontouchstart" in document.documentElement;
    }, "isTouchDevice"));
    __publicField(this, "getMapRootElement", /* @__PURE__ */ __name(() => {
      return this.mapRoot.current;
    }, "getMapRootElement"));
    /**
     * Public Methods
     */
    __publicField(this, "highlightSection", /* @__PURE__ */ __name((section) => this.toggleSectionHighlight(section, true), "highlightSection"));
    __publicField(this, "unhighlightSection", /* @__PURE__ */ __name((section) => {
      if (!section) {
        return this.setState({ currentHoveredSection: void 0 });
      }
      return this.toggleSectionHighlight(section, false);
    }, "unhighlightSection"));
    __publicField(this, "selectSection", /* @__PURE__ */ __name((section) => this.toggleSectionSelect(section, true), "selectSection"));
    __publicField(this, "deselectSection", /* @__PURE__ */ __name((section) => {
      if (!section) {
        return this.clearSelection();
      }
      return this.toggleSectionSelect(section, false);
    }, "deselectSection"));
    __publicField(this, "updateTicketGroups", /* @__PURE__ */ __name((ticketGroups = this.props.ticketGroups) => this.setState({ ticketGroups }), "updateTicketGroups"));
    /**
     * Colors
     */
    __publicField(this, "setUnavailableColors", /* @__PURE__ */ __name(() => this.fillPathsForSection((element) => ({
      "data-unavailable-color": element.getAttribute("fill")
    })), "setUnavailableColors"));
    __publicField(this, "fillUnavailableColors", /* @__PURE__ */ __name(() => this.fillPathsForSection((element) => ({
      fill: element.getAttribute("data-unavailable-color"),
      opacity: "1",
      "stroke-width": "1",
      stroke: unhighlightedSectionColor
    })), "fillUnavailableColors"));
    __publicField(this, "fillPathsForSection", /* @__PURE__ */ __name((propertiesForElement, section) => this.getAllPaths(section).forEach(
      (element) => Object.entries(propertiesForElement(element)).forEach(
        ([property, value]) => element.setAttribute(property, value)
      )
    ), "fillPathsForSection"));
    __publicField(this, "getAllPaths", /* @__PURE__ */ __name((id) => {
      const mapRootElement = this.getMapRootElement();
      if (!mapRootElement) {
        return [];
      }
      return Array.from(
        mapRootElement.querySelectorAll(
          `[data-section-id${id ? `="${id}"` : ""}]`
        )
      ).reduce((memo, element) => {
        const children = element.querySelectorAll("path");
        return memo.concat(children.length ? Array.from(children) : [element]);
      }, []);
    }, "getAllPaths"));
    /**
     * Helpers
     */
    __publicField(this, "clearSelection", /* @__PURE__ */ __name(() => {
      this.setState({
        selectedSections: /* @__PURE__ */ new Set()
      });
    }, "clearSelection"));
    __publicField(this, "toggleSectionHighlight", /* @__PURE__ */ __name((section, shouldHighlight = true) => {
      if (!section) {
        return;
      }
      const sectionId = section.toLowerCase();
      const isUnhighlightingSelectedSection = !shouldHighlight && this.state.selectedSections.has(sectionId);
      if (isUnhighlightingSelectedSection) {
        return;
      }
      return this.fillSection(sectionId, shouldHighlight);
    }, "toggleSectionHighlight"));
    __publicField(this, "toggleSectionSelect", /* @__PURE__ */ __name((section, shouldHighlight = true) => {
      if (!section) {
        return;
      }
      const sectionId = section.toLowerCase();
      if (!$venueSections(this.state).includes(sectionId)) {
        return;
      }
      const selectedSections = new Set(this.state.selectedSections);
      if (shouldHighlight) {
        selectedSections.add(sectionId);
      } else {
        selectedSections.delete(sectionId);
      }
      this.setState({ selectedSections });
    }, "toggleSectionSelect"));
    /**
     * Interaction Callbacks
     */
    __publicField(this, "onMouseOver", /* @__PURE__ */ __name(({
      clientX,
      clientY,
      target
    }) => {
      if (this.state.isTouchDevice)
        return;
      this.doHover(target, clientX, clientY);
    }, "onMouseOver"));
    __publicField(this, "onMouseOut", /* @__PURE__ */ __name(({ relatedTarget }) => {
      if (this.state.isTouchDevice)
        return;
      this.doHoverCleanup(relatedTarget);
    }, "onMouseOut"));
    __publicField(this, "onMouseMove", /* @__PURE__ */ __name(({ nativeEvent }) => this.setState({
      tooltipX: nativeEvent.clientX,
      tooltipY: nativeEvent.clientY
    }), "onMouseMove"));
    __publicField(this, "onClick", /* @__PURE__ */ __name(() => this.doSelect(), "onClick"));
    __publicField(this, "onTouchStart", /* @__PURE__ */ __name((e) => {
      const section = this.getSectionFromTarget(e.target);
      if (section) {
        this.setState({
          currentHoveredSection: section
        });
        this.highlightSection(section);
      }
    }, "onTouchStart"));
    __publicField(this, "onTouchMove", /* @__PURE__ */ __name(() => {
      this.setState({ dragging: true });
    }, "onTouchMove"));
    __publicField(this, "onTouchEnd", /* @__PURE__ */ __name((e) => {
      const section = this.state.currentHoveredSection;
      if (section) {
        this.doSelect(section);
        this.setState({ currentHoveredSection: void 0 });
      }
      if (this.state.dragging) {
        e.preventDefault();
      }
      this.setState({ dragging: false });
    }, "onTouchEnd"));
    __publicField(this, "handleZoomIn", /* @__PURE__ */ __name(() => {
      if (this.zoom) {
        this.zoom.zoomIn(0.1);
      }
    }, "handleZoomIn"));
    __publicField(this, "handleZoomOut", /* @__PURE__ */ __name(() => {
      if (this.zoom) {
        this.zoom.zoomOut(0.1);
      }
    }, "handleZoomOut"));
    __publicField(this, "handleResetZoom", /* @__PURE__ */ __name(() => {
      if (this.zoom) {
        this.zoom.reset();
      }
    }, "handleResetZoom"));
    this.state = {
      sectionMapping: {},
      selectedSections: new Set(
        this.props.selectedSections.filter((section) => !!section)
      ),
      tooltipActive: false,
      tooltipSectionName: "",
      tooltipX: 0,
      tooltipY: 0,
      ticketGroups: this.props.ticketGroups,
      mapNotFound: false,
      touchStarts: {},
      dragging: false,
      isTouchDevice: false
    };
    this.publicApi = {
      updateTicketGroups: this.updateTicketGroups,
      highlightSection: this.highlightSection,
      unhighlightSection: this.unhighlightSection,
      selectSection: this.selectSection,
      deselectSection: this.deselectSection
    };
  }
  /**
   * Lifecycle
   */
  async componentDidMount() {
    this.setState({
      isTouchDevice: this.isTouchDevice()
    });
    try {
      await this.fetchMap();
      this.setupMap();
      await this.fetchManifest();
      this.updateMap();
    } catch (error) {
      console.error(error);
      if (error && typeof error === "object" && "name" in error && error.name === "MapNotFoundError") {
        this.setState({ mapNotFound: true });
      }
    }
  }
  componentWillUnmount() {
    if (this.zoom) {
      this.zoom.teardown();
    }
  }
  componentDidUpdate(_prevProps, prevState) {
    const availableTicketGroupsDidChange = $availableTicketGroups(prevState) !== $availableTicketGroups(this.state);
    const isNoLongerHoveringOnSection = prevState.currentHoveredSection !== void 0 && this.state.currentHoveredSection === void 0;
    const selectedSectionsDidChange = !isEqual__default.default(
      this.state.selectedSections,
      prevState.selectedSections
    );
    if (this.mapRoot.current && (isNoLongerHoveringOnSection || availableTicketGroupsDidChange || selectedSectionsDidChange)) {
      this.updateMap();
    }
    if (selectedSectionsDidChange) {
      this.props.onSelection(Array.from(this.state.selectedSections));
    }
    if ($missingSectionIds(prevState) !== $missingSectionIds(this.state) && $missingSectionIds(this.state).length > 0) {
      console.warn(
        "Unknown section names found in ticket groups: %o",
        $missingSectionIds(this.state)
      );
    }
    if (_prevProps.mouseControlEnabled !== this.props.mouseControlEnabled && this.zoom) {
      if (this.props.mouseControlEnabled) {
        this.zoom.enable();
      } else {
        this.zoom.disable();
      }
    }
  }
  async fetchMap() {
    const mapResponse = await isomorphicFetch(`${this.configFilePath}/map.svg`);
    if (!mapResponse.ok) {
      throw new MapNotFoundError();
    }
    const mapHtml = await mapResponse.text();
    if (this.mapRoot.current) {
      this.mapRoot.current.innerHTML = mapHtml;
      const svg = this.mapRoot.current.querySelector("svg");
      if (svg && this.props.mouseControlEnabled) {
        this.zoom = initializeZoom(svg);
      }
    }
  }
  async fetchManifest() {
    const manifestResponse = await isomorphicFetch(
      `${this.configFilePath}/manifest.json`
    );
    if (!manifestResponse.ok) {
      throw Error(
        "There was an error fetching the venue map data, please try again"
      );
    }
    const manifest = await manifestResponse.json();
    this.setState({
      sectionMapping: Object.keys(manifest.sections).reduce(
        (memo, sectionName) => ({
          ...memo,
          [sectionName.toLowerCase()]: {
            sectionName
          }
        }),
        {}
      )
    });
  }
  setupMap() {
    const mapRootElement = this.getMapRootElement();
    if (!mapRootElement) {
      return;
    }
    const mapSvg = mapRootElement.querySelector("svg");
    if (!mapSvg) {
      return;
    }
    Object.assign(mapSvg.style, {
      position: "absolute",
      zIndex: 0,
      top: 0,
      left: 0,
      height: "100%",
      width: "100%"
    });
    this.setUnavailableColors();
    mapSvg.querySelectorAll("*[data-section-id]").forEach((path) => {
      const sectionId = path.getAttribute("data-section-id");
      if (!sectionId) {
        return;
      }
      path.setAttribute("data-section-id", sectionId.toLowerCase());
    });
    mapSvg.querySelectorAll("text").forEach((text) => {
      text.style.pointerEvents = "none";
    });
    this.setState({ mapSvg });
  }
  /**
   * Properties
   */
  get configFilePath() {
    return `${this.props.mapsDomain}/${this.props.venueId}/${this.props.configurationId}`;
  }
  updateMap() {
    this.fillUnavailableColors();
    $venueSections(this.state).forEach((section) => {
      this.fillSection(
        section.toLowerCase(),
        this.state.selectedSections.has(section)
      );
    });
  }
  fillSection(section, shouldHighlight = true) {
    const isAnAvailableSection = $venueSections(this.state).includes(section);
    if (isAnAvailableSection) {
      this.fillPathsForSection(
        () => ({
          fill: this.getDefaultColor(
            $ticketGroupsBySection(this.state)[section]
          ),
          opacity: shouldHighlight ? "1" : "0.6",
          "stroke-width": "1",
          stroke: shouldHighlight ? highlightedSectionColor : unhighlightedSectionColor,
          cursor: "pointer"
        }),
        section
      );
    }
  }
  getSectionFromTarget(target) {
    if (!target) {
      return;
    }
    const element = target.closest("[data-section-id]");
    if (!element) {
      return;
    }
    const sectionId = element.getAttribute("data-section-id");
    if (!sectionId) {
      return;
    }
    return sectionId.toLowerCase();
  }
  /**
   * Coloring
   */
  getDefaultColor(ticketGroups = []) {
    const lowestTicketPriceInSection = ticketGroups.length > 0 ? Math.min(...ticketGroups.map(({ price }) => price)) : 0;
    const ranges = $costRanges(this.state, this.props);
    if (ranges.length === 0)
      return "#CCCCCC";
    for (const range of ranges) {
      if (range.max >= lowestTicketPriceInSection) {
        return range.color;
      }
    }
    return ranges[ranges.length - 1].color;
  }
  /**
   * Interactions
   */
  doHover(target, tooltipX, tooltipY) {
    const section = this.getSectionFromTarget(target);
    if (!section) {
      return;
    }
    if (!$venueSections(this.state).includes(section)) {
      return;
    }
    this.highlightSection(section);
    this.setState({
      tooltipActive: tooltipX !== void 0 && tooltipY !== void 0,
      tooltipX: tooltipX !== void 0 ? tooltipX : 0,
      tooltipY: tooltipY !== void 0 ? tooltipY : 0,
      tooltipSectionName: this.state.sectionMapping[section].sectionName,
      currentHoveredSection: section
    });
  }
  doHoverCleanup(enteringElement) {
    const isEnteringText = !!enteringElement && enteringElement.nodeName.toLowerCase() === "text";
    if (isEnteringText) {
      return;
    }
    const enteringSection = this.getSectionFromTarget(enteringElement);
    const isEnteringTheSameSection = !!enteringSection && enteringSection === this.state.currentHoveredSection;
    if (isEnteringTheSameSection) {
      return;
    }
    this.setState({
      tooltipActive: false,
      currentHoveredSection: void 0
    });
  }
  doSelect(section = this.state.currentHoveredSection) {
    if (!section) {
      return;
    }
    this.toggleSectionSelect(
      section,
      !this.state.selectedSections.has(section)
    );
  }
  render() {
    if (this.state.mapNotFound) {
      return /* @__PURE__ */ React11__default.default.createElement(
        "div",
        {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Nunito Sans"
          }
        },
        /* @__PURE__ */ React11__default.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              flex: "1 0 30%"
            }
          },
          this.props.missingSeatMapLogo || /* @__PURE__ */ React11__default.default.createElement(MissingSeatMapLogo, null),
          /* @__PURE__ */ React11__default.default.createElement(
            "div",
            {
              style: {
                fontWeight: 400,
                fontSize: "1.2em"
              }
            },
            "Seating Chart Coming Soon"
          )
        )
      );
    }
    return /* @__PURE__ */ React11__default.default.createElement(
      "div",
      {
        ref: this.container,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
        onMouseMove: this.onMouseMove,
        onClick: this.onClick,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd,
        onTouchMove: this.onTouchMove,
        style: {
          position: "relative",
          fontFamily: this.props.mapFontFamily,
          height: "100%",
          width: "100%",
          pointerEvents: this.props.mouseControlEnabled ? "initial" : "none"
        }
      },
      !this.state.isTouchDevice && /* @__PURE__ */ React11__default.default.createElement(
        Tooltip,
        {
          isActive: this.state.tooltipActive,
          x: this.state.tooltipX,
          y: this.state.tooltipY,
          name: this.state.tooltipSectionName,
          color: this.state.currentHoveredSection ? this.getDefaultColor(
            $ticketGroupsBySection(this.state)[this.state.currentHoveredSection]
          ) : "",
          ticketGroups: $availableTicketGroups(this.state).filter(
            (ticketGroup) => ticketGroup.section === this.state.currentHoveredSection
          )
        }
      ),
      /* @__PURE__ */ React11__default.default.createElement(
        "div",
        {
          ref: this.mapRoot,
          style: {
            cursor: "-webkit-grab",
            opacity: this.state.mapSvg ? 1 : 0
          }
        }
      ),
      this.state.mapSvg && /* @__PURE__ */ React11__default.default.createElement(
        Actions,
        {
          onClearSelection: this.clearSelection,
          ranges: $costRanges(this.state, this.props),
          showLegend: this.props.showLegend,
          showLegendOpenAlwaysForDesktop: this.props.showLegendOpenAlwaysForDesktop,
          showControls: this.props.showControls,
          openLegendInitially: this.props.openLegendInitially,
          onZoomIn: this.handleZoomIn,
          onZoomOut: this.handleZoomOut,
          onResetZoom: this.handleResetZoom
        }
      ),
      this.state.isTouchDevice && this.props.mouseControlEnabled && this.props.showZoomHelper && /* @__PURE__ */ React11__default.default.createElement(ZoomHelper, null)
    );
  }
};
__name(_TicketMap, "TicketMap");
__publicField(_TicketMap, "defaultProps", {
  mapsDomain: "https://maps.ticketevolution.com",
  onSelection: () => {
  },
  selectedSections: [],
  sectionPercentiles: {
    "0.2": "#FFC515",
    "0.4": "#f2711c",
    "0.6": "#D6226A",
    "0.8": "#a333c8",
    "1": "#2A6EBB"
  },
  ticketGroups: [],
  showLegend: true,
  showLegendOpenAlwaysForDesktop: false,
  showControls: true,
  openLegendInitially: false,
  mouseControlEnabled: true,
  showZoomHelper: true,
  mapFontFamily: "inherit"
});
var TicketMap = _TicketMap;

// src/index.tsx
var requiredConfigKeys = [
  "venueId",
  "configurationId"
];
var optionalConfigKeys = [
  "mapFontFamily",
  "selectedSections",
  "onSelection",
  "ticketGroups",
  "sectionPercentiles",
  "mapsDomain",
  "showControls",
  "showLegendOpenAlwaysForDesktop",
  "showLegend",
  "openLegendInitially",
  "mouseControlEnabled",
  "showZoomHelper"
];
function extractConfigurationFromOptions(options) {
  const keys = union__default.default(requiredConfigKeys, optionalConfigKeys);
  return pick__default.default(options, keys);
}
__name(extractConfigurationFromOptions, "extractConfigurationFromOptions");
function validateOptions(options) {
  for (const key of requiredConfigKeys) {
    if (!(key in options)) {
      throw new Error(`Seatmap configuration requires a '${key}' value.`);
    }
  }
}
__name(validateOptions, "validateOptions");
var _SeatmapFactory = class _SeatmapFactory {
  constructor(options) {
    __publicField(this, "configuration");
    validateOptions(options);
    this.configuration = extractConfigurationFromOptions(options);
  }
  build(rootElementId) {
    if (!rootElementId) {
      throw new Error("Seatmaps must be initialized with a DOM element.");
    }
    const rootElement = document.getElementById(rootElementId);
    if (!rootElement) {
      throw new Error("Seatmaps must be initialized with a DOM element.");
    }
    let map;
    reactDom.render(
      /* @__PURE__ */ React11__default.default.createElement(
        TicketMap,
        {
          ...this.configuration,
          ref: (ref) => {
            map = ref;
          }
        }
      ),
      rootElement
    );
    return map?.publicApi;
  }
};
__name(_SeatmapFactory, "SeatmapFactory");
var SeatmapFactory = _SeatmapFactory;

exports.SeatmapFactory = SeatmapFactory;
exports.TicketMap = TicketMap;
exports.extractConfigurationFromOptions = extractConfigurationFromOptions;
exports.validateOptions = validateOptions;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map
import { Component, createElement } from "react";
import classNames from "classnames";

export class BadgeSample extends Component {
    render() {
        return (
            <span
                className={classNames("widget-enumclass", this.props.className)}
                ref={this.props.elementRef}
                style={this.props.style}
            >
            </span>
        );
    }
}

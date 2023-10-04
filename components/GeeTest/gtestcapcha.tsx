import React from "react";

class GeetestCaptcha extends React.Component {
  componentDidMount() {
    (window as any).initGeetest4(
      (this.props as any)["captcha-config"].config,
      (this.props as any)["captcha-config"].handler
    );
  }
  render() {
    return <div className="captcha"></div>;
  }
}

export default GeetestCaptcha;

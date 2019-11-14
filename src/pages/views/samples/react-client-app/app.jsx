import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import 'moment/locale/zh-cn';

import { ConfigProvider, DatePicker, message } from 'antd/es';
import zhCN from 'antd/es/locale/zh_CN';

moment.locale('zh-cn');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({ date });
  }

  render() {
    const { date } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
            当前日期：{date ? date.format("YYYY-MM-DD") : "未选择"}
          </div>
        </div>
      </ConfigProvider>
    );
  }
}

polyfill(App);

ReactDOM.render(<App />, document.getElementById("app"));

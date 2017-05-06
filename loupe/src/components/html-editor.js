import React, { Component } from 'react';
import EventMixin from  'react-backbone-events-mixin';

import AceEditor from './ace-editor';

export default class HtmlEditor extends Component {
  // mixins: [EventMixin],
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      code: app.store.code,
    };
  }


  registerListeners(props, state) {
    this.listenTo(state.code, 'ready-to-run', function () {
      this.setState({ editing: false });
    });

    //this.listenTo(state.code, 'change:code', function () {
    //    this.forceUpdate();
    //});
  }

  switchMode() {
    var newValue = !this.state.editing;
    this.setState({ editing: newValue });
  }

  onCodeChange(newCode) {
    this.state.code.htmlScratchpad = newCode;
  }

  render() {
    if (this.state.editing) {
      return (
        <div className="flexChild columnParent">
          <div className='editor-switch'><button onClick={this.switchMode}>Save</button></div>
          <AceEditor
            mode="html"
            onBlur={this.onEditBlur}
            onCodeChange={this.onCodeChange}
            initialValue={this.state.code.rawHtmlScratchpad}
          />
        </div>
      );
    };

    var innerHTML = { __html: this.state.code.rawHtmlScratchpad };

    return (
      <div className="flexChild columnParent">
        <div className='editor-switch'><button onClick={this.switchMode}>Edit</button></div>
        <div className='html-scratchpad flexChild' dangerouslySetInnerHTML={innerHTML}></div>
      </div>
    );
  }
};

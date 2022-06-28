import * as React from 'react'

import { PluginComponent, PluginProps } from 'react-markdown-editor-lite'
import Axios from 'axios'

export default class SaveMdFile extends PluginComponent {
  static pluginName = 'savToFile'

  static align = 'left'

  static defaultConfig = {
    start: 0,
  }

  constructor(props: PluginProps | Readonly<PluginProps>) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      num: this.getConfig('start'),
    }
  }

  async handleClick() {
    const mdData = this.editor.getMdValue()
    const saveFile = mdData.match(/(?<=mdFileName:\s)(.*)/gm)
    const saveDirectory = mdData.match(/(?<=mdFileDirectory:\s)(.*)/gm)

    const res = await Axios.post('/api/upload/md', {
      fileData: mdData,
      saveDirectory,
      saveFile,
    })
    if (res.data === 'ok') {
      alert('파일저장이 완료되었습니다.')
    }
  }

  render() {
    return (
      <span
        className="button button-type-counter"
        title="Counter"
        onClick={this.handleClick}
      >
        SaveToFile
      </span>
    )
  }
}

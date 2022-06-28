// import react, react-markdown-editor-lite, and a markdown parser you like
import React from 'react'
import * as ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'

// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import ReactMarkdown from 'react-markdown'
import MdEditor, { Plugins } from 'react-markdown-editor-lite'

import saveToFile from '../utils/editor-plugin-save-file'
import saveToImage from '../utils/editor-plugin-image'
import Axios from 'axios'

MdEditor.use(saveToImage)
MdEditor.use(saveToFile)
MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1,
})
MdEditor.unuse(Plugins.Image)

const mdParser = new MarkdownIt({ html: true })
export default class Demo extends React.Component {
  static mdEditor = undefined
  constructor(props) {
    super(props)
    this.renderHTML = this.renderHTML.bind(this)

    this.state = {
      saveImagePath: './',
      title: '',
      date: new Date().toJSON().slice(0, 10),
      template: 'post',
      slug: '',
      draft: 'false',
      category: '',
      tags: '-',
      description: '',
      socialImage: '/media/gatsby_icon.png',
      value: ``,
    }
  }

  componentDidMount() {
    const {
      title,
      date,
      slug,
      category,
      draft,
      tags,
      template,
      description,
      socialImage,
    } = this.state
    //ToDo: add MataData component
    const initMarkDownMataData = `---\ntitle: ${title}\ndate: "${date}"\ntemplate: "${template}"\ndraft: ${draft}\nslug: "${slug}"\ncategory: "${category}"\ntags: ${tags}\ndescription: "${description}"\nsocialImage: "${socialImage}"\nmdFileName: ${date}---.md\nmdFileDirectory: /content/blog/\n---`
    this.setState({ value: initMarkDownMataData })
  }
  handleRenderHtml = text => mdParser.render(text)

  handleEditorChange = (it, event) => {
    this.setState({
      value: it.text,
    })
  }

  handleImageUpload = async file => {
    const imagehandle = new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = data => {
        resolve(data.target.result)
      }
      reader.readAsDataURL(file)
    })

    return imagehandle
  }

  renderHTML(text) {
    return React.createElement(ReactMarkdown, {
      source: text,
    })
  }

  render() {
    return (
      <div className="demo-wrap">
        <div className="editor-wrap">
          <MdEditor
            ref={node => (this.mdEditor = node || undefined)}
            style={{ height: '900px', width: '100%' }}
            renderHTML={this.handleRenderHtml}
            value={this.state.value}
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
                fullScreen: true,
                hideMenu: true,
              },
              table: {
                maxRow: 5,
                maxCol: 6,
              },
              syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
            }}
            onChange={this.handleEditorChange}
            onImageUpload={this.handleImageUpload}
          />
        </div>
      </div>
    )
  }
}

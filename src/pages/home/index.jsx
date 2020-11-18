import React, { Component } from 'react'
import FilterForm from './FilterForm'
import './index.css'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js)

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
      initialValues: {
        com: 'shunfeng',
        nu: ''
      },
      loadingSubmit: false
    }
    this.editorDidMount = this.editorDidMount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeLoadingSubmit = this.changeLoadingSubmit.bind(this)
  }

  editorDidMount (editor, monaco) {
    console.log('editorMount', editor)
  }

  handleSubmit (list) {
    this.setState({
      code: JSON.stringify(list, null, 2)
    })
  }

  changeLoadingSubmit (flag) {
    this.setState({
      loadingSubmit: flag
    })
  }

  render () {
    return (
      <>
        <section className='hero is-primary'>
          <div className='hero-body'>
            <div className='container'>
              <div className='title'>快递重放</div>
            </div>
          </div>
        </section>

        <section className='section'>
          <div className='container'>
            <FilterForm initialValues={this.state.initialValues} onSubmit={this.handleSubmit} loadingSubmit={this.state.loadingSubmit} changeLoadingSubmit={this.changeLoadingSubmit} />

          </div>
        </section>
        <div className='container'>
          <SyntaxHighlighter
            style={docco}
            language='json'

          >{this.state.code}
          </SyntaxHighlighter>

        </div>

      </>
    )
  }
}

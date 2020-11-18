import { Form, Input, Button } from 'antd'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

// if ('fetch' in window) {
//   const fetch = window.fetch
// }

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (props) => {
  const [form] = Form.useForm()
  const onFinish = values => {
    getData(values).then(data => props.onSubmit(data))
  }

  const getData = (values) => {
    props.changeLoadingSubmit(true)
    // eslint-disable-next-line
    return fetch('https://route.showapi.com/2423-1', {
      body: new URLSearchParams({
        showapi_appid: '427981',
        showapi_sign: '9effd7c7854249eb985ec99b2fffae70',
        ...values
      }),
      method: 'POST'
    })
      .then(res => res.json())
      .then(
        data => {
          props.changeLoadingSubmit(false)
          return Promise.resolve(data)
        },
        (error) => {
          props.changeLoadingSubmit(false)
          console.trace('发生错误' + error)
        })
  }

  return (
    <Form
      size='large'
      layout='inline'
      form={form}
      initialValues={{ layout: layout, ...props.initialValues }}
      onFinish={onFinish}
    >
      <Form.Item label='快递编码' name='com' rules={[{ required: true }]}>
        <Input placeholder='com' />
      </Form.Item>
      <Form.Item label='快递单号' name='nu' rules={[{ required: true }]}>
        <Input placeholder='nu' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={props.loadingSubmit}>提交</Button>
      </Form.Item>
    </Form>
  )
}

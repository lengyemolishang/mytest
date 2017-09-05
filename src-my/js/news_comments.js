
/**
 * Created by lengye on 2017/9/4.
 */
import React,{Component,PropTypes} from 'react'
import {Form, Card, Input, Button, notification} from 'antd'
import axios from 'axios'
const FormItem = Form.Item

class NewsComments extends Component{

    static propTypes = {
        uniquekey: PropTypes.string.isRequired
    }
    state = {
        comments: []
    }
    componentDidMount () {
        const {uniquekey} = this.props
        this.showComments(uniquekey)
    }
    componentWillReceiveProps (newProps) {
        this.showComments(newProps.uniquekey)
    }

    submitclick = () => {
        const userID = localStorage.getItem('userID')
        if(!userID) {
            alert('请先登陆')
            return
        }
        const {uniquekey} = this.props
        const {content} = this.props.form.getFieldsValue()
       const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userID}&uniquekey=${uniquekey}&commnet=${content}`
        axios.get(url)
            .then(response => {
                this.componentDidMount()
                notification.success(
                    {
                        message:'瞎几把评论'
                    }
                )
                this.props.form.resetFields()
            })
    }

    handchange = () =>{
        const userID = localStorage.getItem('userID')
        if(!userID) {
            alert('请先登陆')
            return
        }
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userID}&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message: '收藏文章成功'
                })

            })

    }


    showComments(uniquekey) {
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const comments = response.data
                this.setState({comments})
            })
    }
    render(){
        const commentList = this.state.comments.map((comment, index) => (
            <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        const {getFieldDecorator} = this.props.form
        return(
            <div style={{padding:'10px'}}>
                {commentList}
                <Form onSubmit={this.submitclick}>
                    <FormItem label='您的评论'>
                        {
                            getFieldDecorator('content')(
                                <Input type='textarea' placeholder="请输入评论内容" />
                            )
                        }
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                    <Button type='primary' onClick={this.handchange}>收藏该文章</Button>
                </Form>
            </div>
        )
    }
}
export default Form.create()(NewsComments)
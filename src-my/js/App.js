/**
 * Created by lengye on 2017/9/1.  主页面 加载直接将头尾写上
 */
import React,{Component} from 'react'
import Newshead from './apphead/newshead'
import Newsfoot from './apphead/newsfoot'

export default class App extends Component {
    render() {
        return (
            <div>
                <Newshead/>
                {this.props.children}
                <Newsfoot/>
            </div>
        )
    }
}
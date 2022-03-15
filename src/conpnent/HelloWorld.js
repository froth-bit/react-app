import {Component, createRef} from "react";
import {unmountComponentAtNode} from "react-dom";

class MyReactClass extends Component{

    state = {isHot:true,opacity:1,count:1,newsArr:[]}

    //改变天气
    changeWeather = ()=>{
        let {isHot} = this.state
        this.setState({isHot:!isHot})
    }

    /**
     * 状态由props决定,不推荐使用,会拦截所有的挂载和更新操作
     * @param props
     * @param state
     * @returns {*}
    static getDerivedStateFromProps(props,state){
        return props
    }
    */

    //更新组件前最后一次调用的钩子，用于获取更新之前的信息，并往下传递
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return this.listRef.current.scrollHeight
    }

    //组件更新完毕的钩子
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.listRef.current.scrollTop += this.listRef.current.scrollHeight - snapshot
    }

    //绑定生成的实体DOM节点
    myRef = createRef();

    listRef = createRef();

    //移除组件钩子
    death = ()=>{
        unmountComponentAtNode(document.getElementById("root"))
    }

    //挂载完成后更新定时器
    componentDidMount() {
        this.timer = setInterval(()=>{
            let {opacity} = this.state;
            let {newsArr} = this.state;
            let news = '新闻'+(newsArr.length+1)
            opacity -= 0.1;
            if (opacity<=0){
                opacity = 1;
            }
            this.setState({opacity,newsArr:[news,...newsArr]})
        },1000)
    }


    //移除组件后clear定时器
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    //累加方法
    countFun = ()=>{
        let {count} = this.state;
        this.setState({count: count+1})
    }

    render() {
        const {name,age,sex} = this.props;
        let {count} = this.state;
        let isHot = this.state.isHot;
        return (
            <div>
                <div className="list" ref={this.listRef}>
                    {
                        this.state.newsArr.map((n,index)=>{
                            return <div key={index} className="news">{n}</div>
                        })
                    }
                </div>
                <ul>
                    <li>姓名：{name}</li>
                    <li>年龄：{age}</li>
                    <li>性别：{sex}</li>
                </ul>
                <h2 ref={this.myRef}>今天天气很{isHot?'炎热':'凉爽'}</h2>
                <button onClick={this.changeWeather}>点击改变天气</button>
                <h3 style={{opacity:this.state.opacity}}>学不会啊！</h3>
                <button onClick={this.death}>删除组件</button>
                <h3>点击数字递增={count}</h3>
                <button onClick={this.countFun}>我是累加的按钮</button>
            </div>
        )
    }
}
export default MyReactClass;
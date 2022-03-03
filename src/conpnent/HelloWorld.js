import {Component, createRef} from "react";
import {unmountComponentAtNode} from "react-dom";

class MyReactClass extends Component{
    state = {isHot:true,opacity:1}

    changeWeather = ()=>{
        console.log('@',this.myRef.current)
        let {isHot} = this.state
        this.setState({isHot:!isHot})
    }

    myRef = createRef();

    death = ()=>{
        unmountComponentAtNode(document.getElementById("root"))
    }

    componentDidMount() {
        this.timer = setInterval(()=>{
            let {opacity} = this.state;
            opacity -= 0.1;
            if (opacity<=0){
                opacity = 1;
            }
            this.setState({opacity})
        },200)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {

        const {name,age,sex} = this.props;
        let isHot = this.state.isHot;
        return (
            <div>
                <ul>
                    <li>姓名：{name}</li>
                    <li>年龄：{age}</li>
                    <li>性别：{sex}</li>
                </ul>
                <h2 ref={this.myRef}>今天天气很{isHot?'炎热':'凉爽'}</h2>
                <button onClick={this.changeWeather}>点击改变天气</button>
                <h3 style={{opacity:this.state.opacity}}>学不会啊！</h3>
                <button onClick={this.death}>删除组件</button>
            </div>
        )
    }
}
export default MyReactClass;
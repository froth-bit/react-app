import {Component, createRef} from "react";

class MyReactClass extends Component{
    state = {isHot:true}

    changeWeather = ()=>{
        console.log('@',this.myRef.current)
        let {isHot} = this.state
        this.setState({isHot:!isHot})
    }

    myRef = createRef();

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
            </div>
        )
    }
}
export default MyReactClass;
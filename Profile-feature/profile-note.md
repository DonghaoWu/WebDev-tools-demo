1. 设置 css

`npm install reactstrap`

check the documentation

add bootstrap

`npm install bootstrap`

Import Bootstrap CSS in the src/index.js file:

import 'bootstrap/dist/css/bootstrap.min.css';

`https://reactstrap.github.io/`

import bootstrap in index.js

tachyons 放后面

tachyons icon in tachyons website

修改 App 中的 isSignin 和 route 属性，直接在 sign in 页面编辑 css

2. 增加 ` Navigation.js, signIn.css, signIn.js, App.js, ProfileIcon.js`

import css file to js file.

Profileicon.js component

疑问：要不要 return。
```js
  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
```

```js
import React from 'react';

class ProfileIcon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen:false
        }
    }

    render(){
        return (
            <div> dropdown code here</div>
        )
    }
}

export default ProfileIcon

```

import ProfileIcon component in Navigation component

copy and add dropdown code about Dropdown in reactstrap

edit the code

edit toggle function, arrow function

wrap it in a div tag  pa4 tc


custom dropdown content in reactstrap


class -- className


两个 toggle

- 到目前为止大多代码发生在 Navigation.js ProfileIcon.js App.js

b--transparent shadow-5 ... dropdown menu

删除 Navigation 中的 sign out

onRouteChange 从 Navigation 传到 ProfileIcon

在 ProfileIcon 中加入sign out 按钮功能，function 为 onRouteChange onClick

sign out 之后 转到 sign in page， 在 App.js 修改
同时修改 App.js 中的 state

在sign in 加一个 css 文件 hover black

fix position position of dropdown content
在 dropdownmenu tag 下面加 right，reactstrap



3. 

- Profile modal

react Portals documentation

- index.js

- index.html add a new div id='modal-root'

- import Modal component from Modal

- Modal.js, this is a regular way to create a Portal.

- 这个 Modal 组件相当于一个新层。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount(){
        modalRoot.appendChild(el);
    }

    componentWillUnmount(){
        modalRoot.removeChild(this.el)
    }

    render(){
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Modal;
```

- add Modal.css

- In App.js, 尝试增加 Modal 在 home toute中，是看不到的。

- 增加 state， isProfileOpen，然后增加一个 method toggleModal，他们都传递到 Modal。

- 新的 shorthand 写法，？ ： =》 &&

- Modal 里面包含一个 Profile component，isProfileOpen 和 toggleModal 传递到 Profile，也就是说打算在 Profile 里面控制 Modal 的开关，用来关 Modal。

- Navigation 里面也要传递 toggleModal，用来 开 Modal

- 创建 Profile，

- Profile.js

```js
import React from 'react';
import './Profile.css';

const Profile = ({isProfileOpen, toggleModal})=>{
    return (
        <div className='profile-modal'>
            <button onClick={toggleModal}>Click
        </div>
    )
}

export default Profile;
```

- Import Profile in App.js

- create a Profile.css

- add toggle method in ProfileIcon component to onClick

- pass toggle method from Navigation to ProfileIcon component.

- 到目前为止，实现了点击 view profile 可以弹出 portal 的功能。

- 编辑 Profile.js ，加入表格，修改成显示 Profile 的组件，记得增加一个 X 按钮去关闭 Modal（toggleModal）

- 增加 Profile 获取数据库数据。

- 下面在表格更新资料上面下功夫。


- 在 server.js 中增加一个 route app.post（。。。）

- 在 profile.js 中增加 method handleProfileUpdate，为什么要写 {name, age, pet]} = req.boday.formInput ?

- 在 postman 中测试 new route

- 在 Profile.js 中加入 state 表格控制。加入 onFormChange method。

- 在 Profile.js 中加入 onProfileUpdate method，。(难点)。


- 
```jsx
onClick={()=>someMethod()}
onClick={someMethod}
```











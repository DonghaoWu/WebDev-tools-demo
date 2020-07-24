# Web development tools (Part 24)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Profile feature.`(Basic)

### `Summary`: In this documentation, we learn to add a new feature in full stack.

### `Check Dependencies & Tools:`

- bootstrap
- reactstrap

------------------------------------------------------------

#### `本章背景: `
1. 本章用到的全部资料：

    1. [Reactstrap](https://reactstrap.github.io/)

    2. [React Portal](https://reactjs.org/docs/portals.html#gatsby-focus-wrapper)

------------------------------------------------------------

### <span id="24.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [24.1 Design from scratch.](#24.1)
- [24.2 Install dependencies.](#24.2)
- [24.3 Featrue Entry.](#24.3)
- [24.4 Set up Modal.](#24.4)
- [24.5 Profile component.](#24.5)
- [24.6 Back end method.](#24.6)
- [24.7 重点代码.](#24.7)

------------------------------------------------------------

### <span id="24.1">`Step1: Design from scratch.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. 要实现 profile feature，要思考的步骤是：

    1. 入口：
        - 转换入口在哪里：Navigation.js -> isSignedIn -> ProfileIcon.js

        - 配置 ProfileIcon.js 的资源：ProfileIcon.js, reactstrap, toggleModal method, onRouteChange method.

            - `index.js`
            - `Navigation.js`
            - `ProfileIcon.js`
        
    2. 把想要显示的 Profile.js 放在展开的 Modal 中：
        - Modal 的设置： index.html -> Modal.js

        - 设置控制 Modal 开关： App.js -> state: isProfileOpen

        - 在 App.js 设置 method 并安排 Modal component 和 Profile component 的位置： App.js -> toggleModal -> Profile.js

            - `index.html`
            - `Modal.js`
            - `Modal.css`
            - `App.js`

    3. 设计 Profile.js: 
        - Profile.js -> Profile.css

            - `Profile.js`
            - `Profile.css`

    4. 设计 back end 的功能：
        - server.js -> ./controllers/profile.js

            - `server.js`
            - `profile.js`

#### `Comment:`
1. 

### <span id="24.2">`Step2: Install dependencies.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. Install denpendencies in front end app.
```bash
$ npm install bootstrap
$ npm install reactstrap
```

2. Apply.

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/index.js`__

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

#### `Comment:`
1. 

### <span id="24.3">`Step3: Featrue Entry.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. Navigation.js

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/components/Navigation/Navigation.js`__

```jsx
import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;
```

2. ProfileIcon.js

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/components/ProfileIcon/ProfileIcon.js`__

```jsx
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="pa4 tc">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 h3 w3 dib" alt="avatar" />
          </DropdownToggle>
          <DropdownMenu className='b--transparent shadow-5' right>
            <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
```

#### `Comment:`
1. 要注意 ProfileIcon 里面有两个从 Navigation 传下来的 method：

- onRouteChange
```js
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: route })
    }
    else this.setState({ route: route });
  }
```

- togglaModal
```js
  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }
```
    
### <span id="24.4">`Step4: Set up Modal.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. index.html

- __`Location: ./demo-apps/frontend-smart-brain-profile/public/index.html`__

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <title>React App</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

2. Modal.js

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/components/Modal/Modal.js`__

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;
```

3. Modal.css

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/components/Modal/Modal.css`__

```css
#modal-root {
    position: relative;
    z-index: 999;
  }
```

4. App.js

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/App.js`__

```js
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: ''
  }
}

//...

toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
}

//...

render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
        {
          isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
        {route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
```

#### `Comment:`
1. 要注意 Profile 里面有两个从 App 传下来的 method：

- loadUser
```js
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
```

- togglaModal
```js
  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }
```

### <span id="24.5">`Step5: Profile component.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. Profile.js.

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/components/Profile/Profile.js`__

```js
import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
    }

    onProfileUpdate = (data) => {
        fetch(`http://localhost:4000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formInput: data
            })
        }).then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data });
            }
        }).catch(console.log)
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case 'user-name':
                this.setState({ name: event.target.value })
                break;
            case 'user-age':
                this.setState({ age: event.target.value })
                break;
            case 'user-pet':
                this.setState({ pet: event.target.value })
                break;
            default:
                return;
        }
    }

    render() {
        const { toggleModal, user } = this.props
        const { name, age, pet } = this.state;
        return (
            <div className='profile-modal'>
                <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
                    <main className='pa4 black-80 w-80'>
                        <img
                            src='http://tachyons.io/img/logo.jpg'
                            className='h3 w3 dib' alt='avatar'
                        />
                        <h1>{name}</h1>
                        <h4>{`Images submitted: ${user.entries}`}</h4>
                        <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                        <hr />
                        <label className='mt2 fw6' htmlFor='user-name'>Name:</label>
                        <input onChange={this.onFormChange} type='text' name='user-name' className='pa2 ba w-100' placeholder={name}></input>
                        <label className='mt2 fw6' htmlFor='user-age'>Age:</label>
                        <input onChange={this.onFormChange} type='text' name='user-age' className='pa2 ba w-100' placeholder={age}></input>
                        <label className='mt2 fw6' htmlFor='user-pet'>Favourite Pet:</label>
                        <input onChange={this.onFormChange} type='text' name='user-pet' className='pa2 ba w-100' placeholder={pet}></input>
                        <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                                onClick={() => this.onProfileUpdate({ name, age, pet })}>
                                Save
              </button>
                            <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                                onClick={toggleModal}>
                                Cancel
              </button>
                        </div>

                    </main>
                    <div className='modal-close' onClick={toggleModal}>
                        &times;
          </div>
                </article>
            </div>
        );
    }
}

export default Profile;
```

2. Profile.css.

- __`Location: ./demo-apps/frontend-smart-brain-profile/src/components/Profile/Profile.css`__

```css
.profile-modal {
    background-color: rgba(255,255, 255,0.8);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-close {
    font-size: 3rem;
    font-style: bold;
    cursor: pointer;
  }
  
  .modal-close:hover {
      color: grey;
      cursor: pointer;
  }
```

#### `Comment:`
1. 


### <span id="24.5">`Step5: Back end method.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. server.js

- __`Location: ./demo-apps/backend-smart-brain-api-profile/server.js`__

```diff
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: process.env.POSTGRES_CLIENT,
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send(`This message is from server.js. You will get this message when visit http://localhost:4000/`) });
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
+app.post('/profile/:id', (req, res) => { profile.handleProfileUpdate(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(4000, () => {
  console.log('app is running on port 4000');
})
```

2. profile.js

- __`Location: ./demo-apps/backend-smart-brain-api-profile/controllers/profile.js`__

```js
const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  console.log('hit');
  const { name, age, pet } = req.body.formInput
  db('users')
    .where({ id })
    .update({ name: name })
    .then(resp => {
      if (resp) {
        res.json("success")
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error updating user'))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}
```

#### `Comment:`
1. 

------------------------------------------------------------

### <span id="24.6">`Step7: 重点代码.`</span>

- #### Click here: [BACK TO CONTENT](#24.0)

1. :star::star::star: App.js 中 onRouteChange 的多种变化，这个 method 里面包含整个 app 的页面转换逻辑：

- 原版：
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
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: route })
    }
    else this.setState({ route: route });
  }
```

- :star::star::star:不需要 react-router 实现的页面转换，页面转换的思维可以很多，但这个是一个可以学习的基础例子。
```jsx
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
        {
          isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
        {route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
```

2. App.js 中的 toggleModal，结合 state 中的 isProfileOpen，分别派发到两个不同组件，而 isProfileOpen 当作是 Modal 的开关：

```jsx
  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }

//...
    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
    {
        isProfileOpen &&
        <Modal>
        <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
        </Modal>
    }
```

3. Modal 的常规写法：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;
```

4. Profile.js 中的 onFormChange method。

```js
    onFormChange = (event) => {
        switch (event.target.name) {
            case 'user-name':
                this.setState({ name: event.target.value })
                break;
            case 'user-age':
                this.setState({ age: event.target.value })
                break;
            case 'user-pet':
                this.setState({ pet: event.target.value })
                break;
            default:
                return;
        }
    }
```

- 可以改为：

```js
    constructor(props) {
        super(props)
        this.state = {
            user-name: this.props.user.name,
            user-age: this.props.user.age,
            user-pet: this.props.user.pet
        }
    }

    onFormChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
```

5. :star::star::star:Profile.js 中的 onProfileUpdate method。

```js
    onProfileUpdate = (data) => {
        fetch(`http://localhost:4000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formInput: data
            })
        }).then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data });
            }
        }).catch(console.log)
    }

    // ...

    onClick={() => this.onProfileUpdate({ name, age, pet })}>

    onClick={() => this.onProfileUpdate({ 
        name: this.state.name, 
        age: this.state.age, 
        pet: this.state.pet
    })}>
```

6. :star::star::star: profile.js 中的 handleProfileUpdate

```js
const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput
  db('users')
    .where({ id })
    .update({ name: name })
    .then(resp => {
      if (resp) {
        res.json("success")
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error updating user'))
}
```


#### `Comment:`
1. 

- 本章用到的全部资料：

    1. [Reactstrap](https://reactstrap.github.io/)

    2. [React Portal](https://reactjs.org/docs/portals.html#gatsby-focus-wrapper)

- #### Click here: [BACK TO CONTENT](#24.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
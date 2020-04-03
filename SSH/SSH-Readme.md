# Web development tools (Part 1)

## `Section: Github`(SSH)

### `Summary`: In this documentation, we set up SSH on github account.

### `Check Dependencies:`

- 

### `Brief Contents & codes position`
- 1.1 
- 1.2 
- 1.3 

### `Step1: .`

a. __`Install`__
```bash
(venv) $ pip install flask-bootstrap
```
b. __`Create instance right after the flask application is created.`__
#### `(*11.1)Location: ./app/__init__.py`

```py
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

from flask_mail import Mail

from flask_bootstrap import Bootstrap

import logging
from logging.handlers import SMTPHandler
from logging.handlers import RotatingFileHandler
import os

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'
mail = Mail(app)
bootstrap = Bootstrap(app)

if not app.debug:
    if app.config['MAIL_SERVER']:
        auth = None
        if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
            auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
        secure = None
        if app.config['MAIL_USE_TLS']:
            secure = ()
        mail_handler = SMTPHandler(
            mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
            fromaddr='no-reply@' + app.config['MAIL_SERVER'],
            toaddrs=app.config['ADMINS'], subject='Microblog Failure',
            credentials=auth, secure=secure)
        mail_handler.setLevel(logging.ERROR)
        app.logger.addHandler(mail_handler)

    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/microblog.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Microblog startup')

from app import routes, models, errors
```

#### `Comment:`
1. 引进 bootstrap 并 使用：
```py
from flask_bootstrap import Bootstrap
# ...
bootstrap = Bootstrap(app)
```

### `Step2: Change html code in normal templates.`

#### `(*11.2)Location: ./app/templates/base.html`

```html
{% extends 'bootstrap/base.html' %}

{% block title %}
    {% if title %}{{ title }} - Microblog{% else %}Welcome to Microblog{% endif %}
{% endblock %}

{% block navbar %}
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="{{ url_for('index') }}">Microblog</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="{{ url_for('index') }}">Home</a></li>
                    <li><a href="{{ url_for('explore') }}">Explore</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    {% if current_user.is_anonymous %}
                    <li><a href="{{ url_for('login') }}">Login</a></li>
                    {% else %}
                    <li><a href="{{ url_for('user', username=current_user.username) }}">Profile</a></li>
                    <li><a href="{{ url_for('logout') }}">Logout</a></li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>
{% endblock %}

{% block content %}
    <div class="container">
        {% with messages = get_flashed_messages() %}
        {% if messages %}
            {% for message in messages %}
            <div class="alert alert-info" role="alert">{{ message }}</div>
            {% endfor %}
        {% endif %}
        {% endwith %}

        {# application content needs to be provided in the app_content block #}
        {% block app_content %}{% endblock %}
    </div>
{% endblock %}
```

#### `Comment:`
1. Old version
```html
<html>

<head>
    {% if title %}
    <title>{{ title }} - microblog</title>
    {% else %}
    <title>microblog</title>
    {% endif %}
</head>

<body>
    <div>
        Microblog:
        <a href="{{ url_for('index') }}">Home</a>
        {% if current_user.is_anonymous %}
            <a href="{{ url_for('login') }}">Login</a>
        {% else %}

            <a href="{{ url_for('user', username=current_user.username) }}">Profile</a>
            <a href="{{ url_for('logout') }}">Logout</a>
        {% endif %}
    </div>
    <hr> {% with messages = get_flashed_messages() %}
    {% if messages %}
        <ul>
            {% for message in messages %}
            <li>{{ message }}</li>
            {% endfor %}
        </ul>
    {% endif %} 
    {% endwith %} 
    {% block content %}{% endblock %}
</body>

</html>
```

2. 最大的不同是新版把文件分成3部分：__`{% block title %}`__  __`{% block navbar %}`__  __`{% block content %}`__ ，而且引进了

```html
{% extends 'bootstrap/base.html' %}
```
- 这样就可以直接使用 `bootstrap`中的自定义 `class`。

3. 把所有子组件都称为 `app_content`。

#### `(*11.3)Location: ./app/templates/404.html`

```html
{% extends "base.html" %}

{% block app_content %}
    <h1>File Not Found</h1>
    <p><a href="{{ url_for('index') }}">Back</a></p>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <h1>File Not Found</h1>
    <p><a href="{{ url_for('index') }}">Back</a></p>
{% endblock %}
```

#### `(*11.4)Location: ./app/templates/500.html`

```html
{% extends "base.html" %}

{% block app_content %}
    <h1>An unexpected error has occurred</h1>
    <p>The administrator has been notified. Sorry for the inconvenience!</p>
    <p><a href="{{ url_for('index') }}">Back</a></p>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <h1>An unexpected error has occurred</h1>
    <p>The administrator has been notified. Sorry for the inconvenience!</p>
    <p><a href="{{ url_for('index') }}">Back</a></p>
{% endblock %}
```

#### `(*11.5)Location: ./app/templates/_post.html`

```html
    <table class="table table-hover">
        <tr>
            <td width="70px">
                <a href="{{ url_for('user', username=post.author.username) }}">
                    <img src="{{ post.author.avatar(70) }}" />
                </a>
            </td>
            <td>
                <a href="{{ url_for('user', username=post.author.username) }}">
                    {{ post.author.username }}
                </a>
                says:
                <br>
                {{ post.body }}
            </td>
        </tr>
    </table>
```

#### `Comment:`
1. Old version

```html
<table>
    <tr valign="top">
        <td>
            <img src="{{ post.author.avatar(36) }}">
        </td>
        <td>{{ post.author.username }} says:
            <br>{{ post.body }}</td>
    </tr>
</table>
```

#### `(*11.6)Location: ./app/templates/user.html`

```html
{% extends "base.html" %}

{% block app_content %}
    <table class="table table-hover">
        <tr>
            <td width="256px"><img src="{{ user.avatar(256) }}"></td>
            <td>
                <h1>User: {{ user.username }}</h1>
                {% if user.about_me %}
                    <p>{{ user.about_me }}</p>
                {% endif %}
                {% if user.last_seen %}
                    <p>Last seen on: {{ user.last_seen }}</p>
                {% endif %}
                <p>{{ user.followers.count() }} followers, {{ user.followed.count() }} following.</p>
                {% if user == current_user %}
                    <p><a href="{{ url_for('edit_profile') }}">Edit your profile</a></p>
                {% elif not current_user.is_following(user) %}
                    <p><a href="{{ url_for('follow', username=user.username) }}">Follow</a></p>
                {% else %}
                    <p><a href="{{ url_for('unfollow', username=user.username) }}">Unfollow</a></p>
                {% endif %}
            </td>
        </tr>
    </table>
    {% for post in posts %}
        {% include '_post.html' %}
    {% endfor %}
    <nav aria-label="...">
        <ul class="pager">
            <li class="previous{% if not prev_url %} disabled{% endif %}">
                <a href="{{ prev_url or '#' }}">
                    <span aria-hidden="true">&larr;</span> Newer posts
                </a>
            </li>
            <li class="next{% if not next_url %} disabled{% endif %}">
                <a href="{{ next_url or '#' }}">
                    Older posts <span aria-hidden="true">&rarr;</span>
                </a>
            </li>
        </ul>
    </nav>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <table>
        <tr valign="top">
            <td><img src="{{ user.avatar(128) }}"></td>
            <td>
                <h1>User: {{ user.username }}</h1>
                {% if user.about_me %}<p>{{ user.about_me }}</p>{% endif %}
                {% if user.last_seen %}<p>Last seen on: {{ user.last_seen }}</p>{% endif %}
                {% if user == current_user %}
                <p><a href="{{ url_for('edit_profile') }}">Edit your profile</a></p>
                {% endif %}
            </td>
        </tr>
    </table>
    <hr>
    {% for post in posts %}
        {% include '_post.html' %}
    {% endfor %}
{% endblock %}
```

2. 总结：在以上的修改中一般都是如下：

```diff
- {% block content %}
+ {% block app_content %}
```

3. 这是因为在bootstrap中已经有自定义的 __`content`__ 模块了，所以需要在 __`base.html`__ 中新定义另外模块 __`app_content`__ 来连接子模块。

4. Finally, in the content block (__`base.html`__) I'm defining a top-level container, and inside it I have the logic that renders flashed messages, which are now going to appear styled as Bootstrap alerts. That is followed with a new app_content block that is defined just so that derived templates can define their own content.


### `Step3. Change html code in form templates.`

#### `(*11.7)Location: ./app/templates/index.html`

```html
{% extends "base.html" %}
{% import 'bootstrap/wtf.html' as wtf %}

{% block app_content %}
    <h1>Hi, {{ current_user.username }}!</h1>
    {% if form %}
    {{ wtf.quick_form(form) }}
    <br>
    {% endif %}
    {% for post in posts %}
        {% include '_post.html' %}
    {% endfor %}
    <nav aria-label="...">
        <ul class="pager">
            <li class="previous{% if not prev_url %} disabled{% endif %}">
                <a href="{{ prev_url or '#' }}">
                    <span aria-hidden="true">&larr;</span> Newer posts
                </a>
            </li>
            <li class="next{% if not next_url %} disabled{% endif %}">
                <a href="{{ next_url or '#' }}">
                    Older posts <span aria-hidden="true">&rarr;</span>
                </a>
            </li>
        </ul>
    </nav>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <h1>Hi, {{ current_user.username }}!</h1>
    {% for post in posts %}
    <div><p>{{ post.author.username }} says: <b>{{ post.body }}</b></p></div>
    {% endfor %}
{% endblock %}
```

#### `(*11.8)Location: ./app/templates/register.html`

```html
{% extends "base.html" %}
{% import 'bootstrap/wtf.html' as wtf %}

{% block app_content %}
    <h1>Register</h1>
    <div class="row">
        <div class="col-md-4">
            {{ wtf.quick_form(form) }}
        </div>
    </div>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <h1>Register</h1>
    <form action="" method="post">
        {{ form.hidden_tag() }}
        <p>
            {{ form.username.label }}<br>
            {{ form.username(size=32) }}<br>
            {% for error in form.username.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.email.label }}<br>
            {{ form.email(size=64) }}<br>
            {% for error in form.email.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.password.label }}<br>
            {{ form.password(size=32) }}<br>
            {% for error in form.password.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.password2.label }}<br>
            {{ form.password2(size=32) }}<br>
            {% for error in form.password2.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>{{ form.submit() }}</p>
    </form>
{% endblock %}
```

#### `(*11.9)Location: ./app/templates/login.html`

```html
{% extends 'base.html' %}
{% import 'bootstrap/wtf.html' as wtf %}

{% block app_content %}
    <h1>Sign In</h1>
    <div class="row">
        <div class="col-md-4">
            {{ wtf.quick_form(form) }}
        </div>
    </div>
    <br>
    <p>New User? <a href="{{ url_for('register') }}">Click to Register!</a></p>
    <p>
        Forgot Your Password?
        <a href="{{ url_for('reset_password_request') }}">Click to Reset It</a>
    </p>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <h1>Sign In</h1>
    <form action="" method="post" novalidate>
        {{ form.hidden_tag() }}
        <p>
            {{ form.username.label }}<br>
            {{ form.username(size=32) }}<br>
            {% for error in form.username.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.password.label }}<br>
            {{ form.password(size=32) }}<br>
            {% for error in form.password.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>{{ form.remember_me() }} {{ form.remember_me.label }}</p>
        <p>{{ form.submit() }}</p>
    </form>
    <p>New User? <a href="{{ url_for('register') }}">Click to Register!</a></p>
{% endblock %}
```

#### `(*11.10)Location: ./app/templates/edit_profile.html`

```html
{% extends "base.html" %}
{% import 'bootstrap/wtf.html' as wtf %}

{% block app_content %}
    <h1>Edit Profile</h1>
    <div class="row">
        <div class="col-md-4">
            {{ wtf.quick_form(form) }}
        </div>
    </div>
{% endblock %}
```

#### `Comment:`
1. Old version

```html
{% extends "base.html" %}

{% block content %}
    <h1>Edit Profile</h1>
    <form action="" method="post">
        {{ form.hidden_tag() }}
        <p>
            {{ form.username.label }}<br>
            {{ form.username(size=32) }}<br>
            {% for error in form.username.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.about_me.label }}<br>
            {{ form.about_me(cols=50, rows=4) }}<br>
            {% for error in form.about_me.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>{{ form.submit() }}</p>
    </form>
{% endblock %}
```

2. 总结：在以上的修改中一般都是：

```diff
+ {% import 'bootstrap/wtf.html' as wtf %}
```

3. 然后用
```html
    <div class="row">
        <div class="col-md-4">
            {{ wtf.quick_form(form) }}
        </div>
    </div>
```

- 代替原代码表示表格。比如在`./app/templates/edit_profile.html`中代替：

```html
    <form action="" method="post">
        {{ form.hidden_tag() }}
        <p>
            {{ form.username.label }}<br>
            {{ form.username(size=32) }}<br>
            {% for error in form.username.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.about_me.label }}<br>
            {{ form.about_me(cols=50, rows=4) }}<br>
            {% for error in form.about_me.errors %}
            <span style="color: red;">[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>{{ form.submit() }}</p>
    </form>
```

4. The import statement near the top works similarly to a Python import on the template side. That adds a wtf.quick_form() macro that in a single line of code renders the complete form, __`including support for display validation errors, and all styled as appropriate for the Bootstrap framework.`__


#### `(*11.11)Location: ./app/templates/reset_password.html`

```html
{% extends "base.html" %}
{% import 'bootstrap/wtf.html' as wtf %}

{% block app_content %}
    <h1>Reset Your Password</h1>
    <div class="row">
        <div class="col-md-4">
            {{ wtf.quick_form(form) }}
        </div>
    </div>
{% endblock %}
```

#### `(*11.12)Location: ./app/templates/reset_password_request.html`

```html
{% extends "base.html" %}
{% import 'bootstrap/wtf.html' as wtf %}

{% block app_content %}
    <h1>Reset Password</h1>
    <div class="row">
        <div class="col-md-4">
            {{ wtf.quick_form(form) }}
        </div>
    </div>
{% endblock %}
```


### `Step4 Concept questions.`

#### `A. Why do we need SSH?`

1. The idea is to use a three-level hierarchy instead of just two. The bootstrap/base.html template provides the basic structure of the page, which includes the Bootstrap framework files. This template exports a few blocks for derived templates such as title, navbar and content (see the complete list of blocks here). I'm going to change my base.html template to derive from bootstrap/base.html and provide implementations for the title, navbar and content blocks. In turn, base.html will export its own app_content block for its derived templates to define the page content.

#### `B. What is the benefits of using Bootstrap?`
1. These are some of the benefits of using Bootstrap to style your web pages:

```diff
+ Similar look in all major web browsers
+ Handling of desktop, tablet and phone screen sizes
+ Customizable layouts
+ Nicely styled navigation bars, forms, buttons, alerts, popups, etc.
```

### `Step5 TEST.`

```bash
(venv) $ flask run
```

1. Login.html
<p align="center">
<img src="../assets/p135.png" width=90%>
</p>

2. index.html
<p align="center">
<img src="../assets/p136.png" width=90%>
</p>


3. profile.html
<p align="center">
<img src="../assets/p137.png" width=90%>
</p>

4. edit_profile.html
<p align="center">
<img src="../assets/p138.png" width=90%>
</p>

5. register.html
<p align="center">
<img src="../assets/p139.png" width=90%>
</p>


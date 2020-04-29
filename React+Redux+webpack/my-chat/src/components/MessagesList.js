import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import store from '../store';
import { fetchMessages } from '../store';

export default class MessagesList extends Component {

  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    //方法一
    // console.log('1');
    // axios.get('/api/messages')
    //   .then(res => res.data)
    //   .then(messages => {
    //     console.log('2');
    //     store.dispatch(gotMessagesFromServer(messages))
    //   });

    //方法二
    // const data = await fetchMessages();
    // console.log('--------', data);
    // store.dispatch(data);

    //方法三
    store.dispatch(fetchMessages());
    // console.log('3');
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    // console.log('4');
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);
    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => <Message message={message} key={message.id} />)}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

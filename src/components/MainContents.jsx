import React, { Component } from 'react';
import MessageIcon from './MessageIcon';

class MainContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [] 
        };
    }

    /**
     * 初期化処理
     * 
     */
    componentDidMount() {
        // 全件取得処理
        fetch('http://localhost:8080/api/contents')
            .then(response => response.json())
            .then(data => this.setState({ contents: data }))
            .catch(error => console.error('Error fetching data:', error));
    }

    render() {
        return (
            <div className="main-contents">
                <a href="/new">
                    <button className="new-button" type="button">New Post</button>
                </a>
                {this.state.contents.map(content => (
                    <MessageIcon key={content.id} content={content} />
                ))}
            </div>
        );
    }
}

export default MainContents;

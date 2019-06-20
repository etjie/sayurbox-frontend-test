import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

class List extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = { 
            item: props.item,
            index: props.index,
            editing: false 
        }
        
        this.updateTitle = this.updateTitle.bind(this);
        this.updateViews = this.updateViews.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
        this.updateDescriptions = this.updateDescriptions.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    
    onEdit() {
        this.setState({
            editing: true
        })
    }
    
    onSave() {
        this.setState({
            editing: false
        })
        
        this.updateList()
    }
    
    updateList() {
        console.log('update');
        fetch('https://andywiranata-42555.firebaseio.com/test-frontend/items/' + this.state.index + '.json', {
            method: 'PUT',
            body: JSON.stringify(this.state.item),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            console.log(json);
            this.props.refresh();
            return json;
        })
    }
    
    updateTitle(event) {
        let newValue = event.target.value;
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                title: newValue
            }
        }))
    }
    
    updateViews(event) {
        let newValue = event.target.value;
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                views: newValue
            }
        }))
    }
    
    updateGenre(event) {
        let newValue = event.target.value;
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                genre: newValue
            }
        }))
    }
    
    updateDescriptions(event) {
        let newValue = event.target.value;
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                descriptions: newValue
            }
        }))
    }
    
    render() {
        
        var viewStyle = {};
        var editStyle = {};
        
        (this.state.editing) ? viewStyle.display = 'none' : editStyle.display = 'none';
        
        return (
            <tr key={this.state.index}>
                <td>{this.state.index+1}</td>
                <td>
                    <div style={viewStyle}>{this.state.item.title}</div>
                    <input type="text" 
                        style={editStyle} 
                        value={this.state.item.title} 
                        onChange={this.updateTitle} />
                </td>
                <td>
                    <div style={viewStyle}>{this.state.item.views}</div>
                    <input type="text" 
                        style={editStyle} 
                        value={this.state.item.views}
                        onChange={this.updateViews} />
                </td>
                <td>
                    <div style={viewStyle}>{this.state.item.genre}</div>
                    <input type="text" 
                        style={editStyle} 
                        value={this.state.item.genre} 
                        onChange={this.updateGenre}/>
                </td>
                <td>
                    <div style={viewStyle}>
                        <span className="list__description">{this.state.item.descriptions}</span>
                        <a onClick={this.props.onToggleModal(this.state.item.descriptions)}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </a>
                    </div>
                    <textarea 
                        style={editStyle} 
                        value={this.state.item.descriptions} 
                        onChange={this.updateDescriptions}/>
                </td>
                <td align="center">
                    <a style={viewStyle} onClick={this.onEdit.bind(this)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </a>
                    <a style={editStyle} onClick={this.onSave.bind(this)}>
                        <FontAwesomeIcon icon={faSave} />
                    </a>
                </td>
            </tr>    
        );
    }
}

export default List;
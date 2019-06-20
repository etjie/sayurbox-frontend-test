import React from 'react';
import '../App.css';

class Filter extends React.Component {
    
    updateFilterTitle(event) {
        this.props.updateTitle(event.target.value);
    }
    
    updateFilterGenre(event) {
        this.props.updateGenre(event.target.value);
    }
    
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <tr>
                <td></td>
                <td>
                    <input type="text"
                        onChange={this.updateFilterTitle.bind(this)}></input>
                </td>
                <td></td>
                <td>
                    <input type="text"
                        onChange={this.updateFilterGenre.bind(this)}></input>
                </td>
                <td></td>
                <td></td>
            </tr>
        );
    }
}

export default Filter;
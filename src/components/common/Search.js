import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loading from '../common/Loading';
import { API_URL } from '../../config';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchQuery: '',
            error: null,
            loading: false,
            searchResults: []
        }
    }

    inputChange = (event) => {
        const searchQuery = event.target.value;

        this.setState({
            searchQuery
        });

        if(!searchQuery) {
            return '';
        }
        this.setState({
            loading: true
        });

        axios.get(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then((response) => {
                this.setState({ 
                    loading: false,
                    searchResults: response.data
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.errorMessage,
                    loading: false
                });
            });
    }

    handleRedirect(currencyId) {
        this.setState({
            searchResults: [],
            searchQuery: ''
        })

        const { history } = this.props;

        history.push(`/currency/${currencyId}`);
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if(!searchQuery) {
            return '';
        }

        if(searchResults.length > 0){
            return (
                <div className="Search-result-container">
                    { searchResults.map(result => (
                        <div
                            key={result.id}
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}
                            >
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            );
        }

        if(!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No result found
                    </div>
                </div>
            )
        }
    }

    render() {
        const { loading, searchQuery } = this.state;

        return (
            <div className="Search">
                <span className="Search-icon" />
                <input 
                    onChange={this.inputChange} 
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    value={searchQuery}
                />

                {loading && 
                <div className="Search-loading">
                    <Loading 
                        width = "12px"
                        height = "12px"
                    />
                </div> }

                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search);
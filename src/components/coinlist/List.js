import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        }
    }
    
    componentDidMount(){
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        const { page } = this.state;

        this.setState({
            loading:true
        });

        axios.get(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then((response) => {
                const { currencies, totalPages } = response.data;

                this.setState({
                    currencies,
                    loading: false,
                    totalPages
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.errorMessage,
                    loading: false
                });
            });
    }

    handlePaginationClick = (direction) => { //bind to work with `this`
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => { 
            this.fetchCurrencies()
        }); //setState callback.. update list when page is change
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;

        if(loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if(error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table 
                    currencies={currencies} />

                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        )
    }
}

export default List;
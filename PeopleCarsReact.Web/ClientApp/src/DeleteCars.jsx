import React from 'react';
import axios from 'axios';
import CarRow from './CarRow';
import { produce } from 'immer';

class DeleteCars extends React.Component {
    state = {
        cars: [],
        personId: '',
        searchText: '',
        searchedCars: []
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecars/getcars?id=${id}`);
        this.setState({ cars: data, personId: id, searchedCars: data });
    }

    onClearClick = () => {
        this.setState({ searchText: '', searchedCars: this.state.cars });
    }

    onSearchChange = e => {
        const { cars } = this.state;
        const newState = produce(this.state, draftState => {
            draftState.searchText = e.target.value;
            draftState.searchedCars = cars.filter(c => c.make.includes(e.target.value) || c.model.includes(e.target.value))
        })
        this.setState(newState)

    }

    onYesClick = async () => {
        const { personId } = this.state;
        await axios.post(`/api/peoplecars/deletecars?id=${personId}`);
        this.props.history.push('/');
    }




    render() {
        const { searchText, searchedCars } = this.state;
        return (
            <>
                <div className="container" style={{ marginTop: 60 }}>
                    <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" onChange={this.onSearchChange} className="form-control form-control-lg" placeholder="Search Cars" value={searchText} />
                            </div>
                            <div className="col-md-2">
                                <button onClick={this.onClearClick} className="btn btn-dark btn-lg w-100">Clear</button>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchedCars.map(c => <CarRow
                                            key={c.id}
                                            car={c}
                                        />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Are you sure you want to delete all of these cars?</h3>
                            </div>
                            <div className="col-md-6" style={{ marginTop: 20 }}>
                                <a href="/" style={{ textDecoration: 'none' }}>
                                    <button className="btn btn-primary btn-lg w-100">No</button>
                                </a>
                            </div>
                            <div className="col-md-6" style={{ marginTop: 20 }}>
                                <button onClick={this.onYesClick} className="btn btn-danger btn-lg w-100">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default DeleteCars;
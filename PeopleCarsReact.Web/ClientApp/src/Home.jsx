import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';

class Home extends React.Component {
    state = {
        people: [],
        searchText: '',
        searchedPeople: []
    }

    componentDidMount = async () => {
        await this.getPeople();
    }

    getPeople = async () => {
        const response = await axios.get('/api/peoplecars/getallpeople');
        const people = response.data;
        this.setState({ people, peopleToShow: people });
    }

    onClearClick = () => {
        this.setState({ searchText: '', searchedPeople: this.state.people });

    }

    onSearchChange = e => {
        const { people } = this.state;
        const newState = produce(this.state, draftState => {
            draftState.searchText = e.target.value;
            draftState.searchedPeople = people.filter(p => p.firstName.includes(e.target.value) || p.lastName.includes(e.target.value))
        })
        this.setState(newState)
    }



    render() {
        const { searchText, searchedPeople } = this.state;
        return (<>
            <div className='container' style={{ marginTop: 60 }}>
                <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
                    <div className="row">
                        <div className="col-md-10">
                            <input onChange={this.onSearchChange} type="text" className="form-control form-control-lg" placeholder="Search People" value={searchText} />
                        </div>
                        <div className="col-md-2">
                            <button onClick={this.onClearClick} className="btn btn-dark btn-lg w-100">Clear</button>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className="col-md-12" style={{ marginBottom: 20 }}>
                            <a href="/addperson" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-success btn-lg w-100">Add Person</button>
                            </a>
                        </div>
                    </div>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Car Count</th>
                                <th>Add Car</th>
                                <th>Delete Cars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedPeople.map(p => <PersonRow
                                key={p.id}
                                person={p}
                            />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
        )
    }

}

export default Home;
import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddCar extends React.Component {
    state = {
        car: {
            make: '',
            model: '',
            year: '',
            personId: ''
        },
        person: {
            firstName: '',
            lastName: '',
            id: ''
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecars/getperson?id=${id}`);
        const newState = produce(this.state, draftState => {
            draftState.person = data;
            draftState.car['personId'] = id;
        })
        this.setState(newState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addcar', this.state.car);
        this.props.history.push('/');
    }

    onTextChange = e => {
        const newState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        })
        this.setState(newState)
    }




    render() {
        const { make, model, year } = this.state.car;
        const { firstName, lastName } = this.state.currentPerson;
        return (
            <div style={{ minHeight: 1000, paddingTop: 200 }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3 card bg-light p-4">
                        <h2>Add a car for {firstName} {lastName}</h2>
                        <input type="text" onChange={this.onTextChange} className="form-control" name="make" placeholder="Make" value={make} />
                        <br />
                        <input type="text" onChange={this.onTextChange} className="form-control" name="model" placeholder="Model" value={model} />
                        <br />
                        <input type="text" onChange={this.onTextChange} className="form-control" name="year" placeholder="Year" value={year} />
                        <br />
                        <button onClick={this.onSubmitClick} className="btn btn-primary btn-lg btn-block">Submit</button>
                    </div>
                </div>
            </div>

        );
    }

}

export default AddCar;
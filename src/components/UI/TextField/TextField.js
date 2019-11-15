import React from 'react';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {finishEditUser} from "../../../store/actions/edit";
import Button from '../../UI/Button/Button'

const FIELDS_TO_EDIT = ['first_name', 'last_name', 'email'];

function createControls(fields) {
    const formValues = {};
    fields.forEach( field => {
        formValues[field] = '';
    } );
    return formValues
}

class CustomTextField extends React.Component {

    state = {
        formControls: createControls(FIELDS_TO_EDIT)
    };

    componentDidMount() {
        const v = { ...this.state.formControls };
        FIELDS_TO_EDIT.forEach( field => {
            v[field] = this.props.user[field];
        } );

        this.setState({
            ...this.state,
            formControls: v
        });
        console.log(this.props);
    }

    changeHandler = (val, field) => {
        const v = { ...this.state.formControls };
        v[field] = val;


        this.setState({
            ...this.state,
            formControls: v
        })

    };

    saveChangesHandler = event => {
        event.preventDefault();

        this.props.finishEditUser(this.state.formControls, this.props.user.id)

    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <div>
                    {
                        FIELDS_TO_EDIT.map( (field, id) => {
                            return <TextField
                                style={{width: '100%'}}
                                value={this.state.formControls[field]}
                                key={id}
                                id="standard-error"
                                margin="normal"
                                onChange={event => this.changeHandler(event.target.value, field)}
                            />
                        } )
                    }
                </div>
                <Button type={'success'} onClick={event => this.saveChangesHandler(event)}>save</Button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        finishEditUser: (data, id) => dispatch(finishEditUser(data, id))
    }
}

export default connect(null, mapDispatchToProps)(CustomTextField);
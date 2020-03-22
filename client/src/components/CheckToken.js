import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from './Login'
import PropTypes from 'prop-types'

class Welcome extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div>
                {isAuthenticated ? <h1>Logueado</h1> : <Login />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Welcome);
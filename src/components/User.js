import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {this.props.setUser(user);
        });
    }
            
    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.props.setUser(user);
        });
    }

    signOut() {
        this.props.firebase.auth().signOut().then(() => {
            this.props.setUser(null);
        });
    }

    render() {
        return (
            <section className="user-display">
                <div>
                    { this.props.user ? this.props.user.displayName : 'Guest' }
                </div>
                <button className="sign-in-out" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
                    <span>Sign { this.props.user ? 'out' : 'in' }</span>
                </button>
            </section>
        )};
}

    export default User;
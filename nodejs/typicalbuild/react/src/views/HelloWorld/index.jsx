import React, {Component} from 'react';

class HelloWorld extends Component {
    constructor() {
        super();
        this.state = {
			message: 'Hello React.'
		}
    }

    componentWillMount() {
        this.setState({
            type: 0
        });
    }

    render() {
        
            return (
                <div>
					<p>{this.state.message}</p>
                </div>
            )
       
    }
}

export default HelloWorld
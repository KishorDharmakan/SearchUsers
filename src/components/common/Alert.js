import React from 'react';

const Alert = (props) => {
    const errorMessage=props.errorMessage.toString();
    return (
        <div className="alert alert-danger" role="alert">
            {errorMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        
    )
}

export default Alert;

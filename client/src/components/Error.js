import React from 'react';
//import {Link, useParams} from 'react-router-dom';

const Error = (props) => {
    const error=props.error;

    return (
        <div>
          <h2>{error}</h2>
        </div>
    );
}

export default Error;
import React from 'react';

const Description = ({description,theme}) => {
    return (
        <p style={theme}>
            {description}
        </p>
    );
};

export default Description;

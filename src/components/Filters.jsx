import React from 'react';

const Filters = () => {
    return (
        <div>
            <select className="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">Title</option>
                <option value="2">Date release</option>
                <option value="3">Rating</option>
            </select>
        </div>
    );
};

export default Filters;
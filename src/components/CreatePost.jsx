import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

export default function CreatePost({setInputData, createPost}) {

    return (
        <div>
            <NavLink to="/" className="close">Х</NavLink>
            <form onSubmit={createPost} className="create-post">
                <input onChange={setInputData} type="text" name="content" className="input-text" />
                <input type="submit" className="send-button" value="Создать пост" />
            </form>
        </div>
    );
};

CreatePost.propTypes = {
    setInputData: PropTypes.func,
    createPost: PropTypes.func
};
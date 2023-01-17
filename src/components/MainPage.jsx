import React from 'react';
import { NavLink } from "react-router-dom";
import RenderPosts from "./RenderPosts.jsx";
import PropTypes from 'prop-types';

export default function MainPage({data}) {

    return (
        <>
            <NavLink to="posts/new">Создать пост</NavLink>
            <RenderPosts data={data} />
        </>
    );
};

MainPage.propTypes = {
    data: PropTypes.array
};
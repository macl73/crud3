import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

export default function RenderPosts({data}) {

    return (
        <ul className="post-list">
            {data.map((post, index) => 
                <li key={index} className="post">
                    <div className="post-container">
                        <div className="post-content"><NavLink to={`/posts/${post.id}`}>{post.content}</NavLink></div>
                        <div className="created-at">Создано: {new Date(post.created).getDate() + "/" + (new Date(post.created).getMonth() + 1) + "/" + new Date(post.created).getFullYear()}</div> 
                    </div>
                </li>
            )}
        </ul>
    );
};

RenderPosts.propTypes = {
    data: PropTypes.array
};
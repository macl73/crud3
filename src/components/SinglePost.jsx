import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from "react-router-dom";
import sendRequest from "../api/sendRequest.jsx";
import PropTypes from 'prop-types';


export default function SinglePost({deletePost, redirect}) {
    const [post, setPost] = useState(undefined);
    const {postId} = useParams();

    useEffect(() => {
        sendRequest("http://localhost:7777/posts/", "GET")
        .then(arr => arr.find(item => item.id === Number(postId)))
        .then(data => setPost(data))
        .catch(e => {
            console.error(e);
            setPost(undefined);
        });
    }, [postId]);

    return (
        <>
            <input onClick={() => redirect()} type="submit" className="close" value="Х" />
            <div className="post post-container">
                <div className="post-content">{post?.content}</div>
                <div className="created-at">Создано: {new Date(post?.created).getDate() + "/" + (new Date(post?.created).getMonth() + 1) + "/" + new Date(post?.created).getFullYear()}</div>    
            </div>
            <input type="button" value="Удалить" className="send-button" onClick={() => deletePost(postId)} />
            <NavLink to={`/posts/${postId}/edit`} className="send-button">Редактировать</NavLink>
        </>
    );
};

SinglePost.propTypes = {
    deletePost: PropTypes.func,
    redirect: PropTypes.func
};

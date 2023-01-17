import React, {useState, useEffect} from 'react';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import sendRequest from "../api/sendRequest.jsx";

export default function EditPost() {

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

    const postChange = (e) => {
        setPost({
          content: e.target.value,
          id: postId
        });
    };

    const navigate = useNavigate();
    
    const postSubmit = (e) => {
        e.preventDefault();
        sendRequest("http://localhost:7777/posts/", "POST", post)
        .then(() => sendRequest("http://localhost:7777/posts/", 'GET'))
        .then(res => setPost(res));
        e.target.reset();
        navigate(`/posts/${postId}/`);
    };

    return (
        <div>
            <NavLink to={`/posts/${postId}/`} className="close">Х</NavLink>
            <form onSubmit={e => postSubmit(e)} className="create-post">
                <input onChange={e => postChange(e)} type="text" name="content" className="input-text" value={post?.content} />
                <input type="submit" className="send-button" value="Опубликовать" />
            </form>
        </div>
    );
};

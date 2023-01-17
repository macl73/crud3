import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import CreatePost from "./components/CreatePost.jsx";
import MainPage from "./components/MainPage.jsx";
import SinglePost from "./components/SinglePost.jsx";
import sendRequest from "./api/sendRequest.jsx";
import EditPost from "./components/EditPost.jsx";

const serverURL = "http://localhost:7777/posts/";

function App() {

  const [content, setContent] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    sendRequest(serverURL, "GET")
    .then(res => setData(res));
  }, []);

  const handleChange = (e) => {
    setContent({
      content: e.target.value,
      id: 0
    });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(serverURL, "POST", content)
    .then(() => sendRequest(serverURL, 'GET'))
    .then(res => setData(res));
    e.target.reset();
    navigate("/");
  };

  const navigate = useNavigate();        

  const handleDelete = (id) => {
      sendRequest("http://localhost:7777/posts/" + id, "DELETE")
      .then(() => sendRequest("http://localhost:7777/posts/", 'GET'))
      .then(res => setData(res));
      navigate("/");
  };

  const redirect = () => {
    sendRequest("http://localhost:7777/posts/", 'GET')
    .then(res => setData(res));
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <Routes>
          <Route path="/" element={<MainPage data={data} />} />
          <Route path="/posts/new" element={<CreatePost 
            createPost={e => handleSubmit(e)}
            setInputData={e => handleChange(e)} />} />
          <Route path="/posts/:postId" element={<SinglePost deletePost={id => handleDelete(id)} redirect={() => redirect()} />} />
          <Route path="/posts/:postId/edit" element={<EditPost 
            createPost={e => handleSubmit(e)}
            setInputData={e => handleChange(e)} />}  />
        </Routes>
      </header>
    </>
  );
};

export default App;

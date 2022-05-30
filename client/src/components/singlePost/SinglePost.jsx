import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {

  
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  
  console.log("SinglePost","User data:",user);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/get/one/post/${path}`);
      console.log(res.data);
      setPost(res.data);
      setTitle(res.data.TITLE);
      setDesc(res.data.DESCRIPTION);
    };
    getPost();
  }, [path]);

 
 

  const handleDelete = async () => {
    try {
      await axios.delete(`/delete/one/post/${post.POST_ID}`, {
        data: { username: user.data },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      console.log(title)
      await axios.put(`/update/one/post/${post.POST_ID}`, {
          username  : user.data,
          title : title,
          description: desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  console.log("post",post);
  console.log(post.USER_NAME  === user);
  return (
    
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.PHOTO && (
          <img src={PF + post.PHOTO} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {
              post.USER_NAME  === user?(  
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  />
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  />
              </div>              
              ):(
                null
              )
                
            }
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.USER_NAME}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.CREATED_AT).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.DESCRIPTION}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

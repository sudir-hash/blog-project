import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <Link to={`/post/${post.POST_ID}`} className="link">
      <div className="post">
        {post.PHOTO && <img className="postImg" src={PF + post.PHOTO} alt="" />}
        <div className="postInfo">
          <div className="postCats">
              AUTHOR:
              <span className="postCat"> {post.USER_NAME}</span>
            
          </div>
          <br />
          <br />
        
            <span className="postTitle">{post.TITLE}</span>
          <hr />
          <span className="postDate">
            {new Date(post.CREATED_AT).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.DESCRIPTION}</p>
      </div>
    </Link>
  );
}


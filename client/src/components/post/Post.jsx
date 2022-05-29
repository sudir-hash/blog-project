import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.PHOTO && <img className="postImg" src={PF + post.PHOTO} alt="" />}
      <div className="postInfo">
        {/* <div className="postCats"> */}
          {/* {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))} */}
        {/* </div> */}
        <Link to={`/post/${post.POST_ID}`} className="link">
          <span className="postTitle">{post.TITLE}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.CREATED_AT).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.DESCRIPTION}</p>
    </div>
  );
}


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPost({ ...(docSnap.data() as PostProps), id: docSnap.id });
  };

  const handleDelete = () => {};

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, []);

  return (
    <div className="post__detail">
      {post ? (
        <div className="post__box">
          <div className="post__title">{post.title}</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">{post.email}</div>
            <div className="post__date">{post.createdAt}</div>
          </div>
          <div className="post__utils-box">
            <div className="post__delete" onClick={handleDelete}>
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

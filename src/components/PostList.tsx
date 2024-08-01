import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TabType = "all" | "my";
type PostListProps = {
  hasNavigation?: boolean;
  defaultTab?: TabType;
};

export type CommentType = {
  content: string;
  uid: string;
  createdAt: string;
  email: string;
};

export type PostProps = {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category: CategoryType;
  comments: CommentType[];
};

export type CategoryType = "FrontEnd" | "BackEnd" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "FrontEnd",
  "BackEnd",
  "Web",
  "Native",
];

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPost = async () => {
    setPosts([]);
    const postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
    } else if (activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "asc"));
    } else {
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc")
      );
    }

    const data = await getDocs(postsQuery);
    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPost();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");

      navigate("/");
      getPost();
    }
  };

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
          {CATEGORIES.map((category) => (
            <div
              role="presentation"
              key={category}
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))}
        </div>
      )}
      <div className="post__list">
        {posts?.length ? (
          posts.map((post, index) => (
            <div key={`${post.id}-${index}`} className="post__box">
              <Link to={`posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.createdAt}</div>
                </div>
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {post.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    삭제
                  </div>
                  <div className="post__edit">수정</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}

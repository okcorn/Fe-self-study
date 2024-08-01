import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CommentType, PostProps } from "./PostList";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

type CommentsProps = {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
};

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value, name },
    } = e;

    if (name === "comment") setComment(value);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedDate: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });

          await getPost(post.id);
          toast.success("댓글을 생성했습니다.");
          setComment("");
        }
      }
    } catch (e: any) {
      toast.error(e?.code);
    }
  };

  const handleCommentDelete = async (data: CommentType) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (confirm) {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success("댓글을 삭제했습니다.");
      await getPost(post.id);
    }
  };

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={handleCommentSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            onChange={handleCommentChange}
            value={comment}
          />
        </div>
        <div className="form__block form__block--reverse">
          <input type="submit" value="입력" className="form__btn--submit" />
        </div>
      </form>
      <div className="comments__list">
        {post.comments
          ?.slice()
          .reverse()
          .map((comment) => (
            <div key={comment.uid} className="comment__box">
              <div className="comment__profile-box">
                <div className="comment__email">{comment.email}</div>
                <div className="comment__date">{comment.createdAt}</div>
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleCommentDelete(comment)}
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__text">{comment.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

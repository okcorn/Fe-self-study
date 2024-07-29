import { useState } from "react";
import { Link } from "react-router-dom";

type PostListProps = {
  hasNavigation?: boolean;
};
type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

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
        </div>
      )}
      <div className="post__list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">author</div>
                <div className="post__date">2023.07.09 화요일</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus vel justo blandit, malesuada odio quis, mattis nisi.
                Aliquam vitae nisi quam. Proin condimentum varius magna quis
                malesuada. Donec aliquet aliquam mollis. Proin commodo metus in
                hendrerit posuere. Nullam sapien massa, feugiat nec quam in,
                gravida porttitor nunc. Sed et massa rutrum, fringilla ipsum
                non, placerat neque. Vestibulum ac lacinia risus. Aliquam erat
                volutpat. Nulla nec justo magna. Nunc congue nec massa vel
                rhoncus. Duis eget tristique velit, nec viverra turpis. Nam eu
                ultricies mauris. Morbi vulputate eu purus in dapibus.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

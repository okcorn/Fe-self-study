import { Link } from "react-router-dom";

export default function PostDetail() {
  return (
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__author-name">author</div>
          <div className="post__date">2023.07.09 화요일</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete">삭제</div>
          <div className="post__edit">
            <Link to="/posts/edit/1">수정</Link>
          </div>
        </div>
        <div className="post__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel
          justo blandit, malesuada odio quis, mattis nisi. Aliquam vitae nisi
          quam. Proin condimentum varius magna quis malesuada. Donec aliquet
          aliquam mollis. Proin commodo metus in hendrerit posuere. Nullam
          sapien massa, feugiat nec quam in, gravida porttitor nunc. Sed et
          massa rutrum, fringilla ipsum non, placerat neque. Vestibulum ac
          lacinia risus. Aliquam erat volutpat. Nulla nec justo magna. Nunc
          congue nec massa vel rhoncus. Duis eget tristique velit, nec viverra
          turpis. Nam eu ultricies mauris. Morbi vulputate eu purus in dapibus.
        </div>
      </div>
    </div>
  );
}

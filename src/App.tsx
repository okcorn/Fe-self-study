import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home Link</Link>
        </li>
        <li>
          <Link to="/posts">Post Link</Link>
        </li>
        <li>
          <Link to="/posts/:id">Post Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">Post New</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Post Edit</Link>
        </li>
        <li>
          <Link to="/profile">Profile page</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/posts" element={<h1>Post list page</h1>} />
        <Route path="/posts/:id" element={<h1>Post detail page</h1>} />
        <Route path="/posts/new" element={<h1>Post new page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>Post edit page</h1>} />
        <Route path="/profile" element={<h1>Profile page</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;

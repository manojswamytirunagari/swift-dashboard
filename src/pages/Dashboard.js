import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentTable from "../components/CommentTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SortableHeader from "../components/SortableHeader";
import { getFilteredData } from "../utils/searchUtils";
import { sortData } from "../utils/sortUtils";
import { saveSettings, getSettings } from "../utils/localStorageUtils";

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        const saved = getSettings();
        setComments(data);
        setSearch(saved.search || "");
        setPage(saved.page || 1);
        setPageSize(saved.pageSize || 10);
        setSortConfig(saved.sort || { key: null, direction: null });
      });
  }, []);

  useEffect(() => {
    const data = sortData(getFilteredData(comments, search), sortConfig);
    setFiltered(data);
    saveSettings({ search, page, pageSize, sort: sortConfig });
  }, [comments, search, sortConfig, page, pageSize]);

  const toggleSort = (key) => {
    setSortConfig((prev) =>
      prev.key !== key
        ? { key, direction: "asc" }
        : prev.direction === "asc"
        ? { key, direction: "desc" }
        : prev.direction === "desc"
        ? { key: null, direction: null }
        : { key, direction: "asc" }
    );
  };

  const currentData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="topbar">
        <img src="/swift-logo.png" alt="SWIFT" className="swift-logo" />
        {user && (
          <div
            className="topbar-right"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <div className="profile-avatar">{getInitials(user.name)}</div>
            <div className="profile-name">{user.name}</div>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="table-controls">
          <div className="sort-controls">
            {["postId", "name", "email"].map((key) => (
              <SortableHeader
                key={key}
                label={key === "postId" ? "Post ID" : key.charAt(0).toUpperCase() + key.slice(1)}
                sortKey={key}
                sortConfig={sortConfig}
                onSort={toggleSort}
              />
            ))}
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <CommentTable comments={currentData} />

        <div style={{ marginTop: "1rem" }}>
          <label>Page Size:</label>
          <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
            {[10, 50, 100].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <Pagination
          total={filtered.length}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";

const CommentTable = ({ comments }) => {
  return (
    <table className="data-table" border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "1rem", width: "100%" }}>
      <thead>
        <tr>
          <th>Post ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.id}>
            <td>{comment.postId}</td>
            <td>{comment.name}</td>
            <td>{comment.email}</td>
            <td>{comment.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommentTable;

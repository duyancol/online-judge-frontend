import React from "react";


export default function Editorial({ problemId }) {
  // Đây là data mock, bạn có thể fetch từ server nếu cần
  const editorialContent = {
    "141": {
      title: "Linked List Cycle - Editorial",
      explanation: `
To detect a cycle in a linked list, we can use Floyd's Tortoise and Hare algorithm.

We move two pointers through the list:
- Slow pointer moves one step at a time
- Fast pointer moves two steps at a time

If there's a cycle, they will eventually meet. Otherwise, fast pointer will reach the end.
      `,
      complexity: "Time: O(n), Space: O(1)",
    },
    // Thêm problemId khác nếu muốn
  };

  const content = editorialContent[problemId];

  if (!content) return <div>No editorial available for this problem.</div>;

  return (
    <div className="tab-content">
      <h2>{content.title}</h2>
      <pre>{content.explanation}</pre>
      <p><strong>Complexity:</strong> {content.complexity}</p>
    </div>
  );
}

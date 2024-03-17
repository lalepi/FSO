import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("write title here");
  const inputAuthor = screen.getByPlaceholderText("write author here");
  const inputUrl = screen.getByPlaceholderText("write url here");
  const sendButton = screen.getByText("create");

  await user.type(inputTitle, "testTitle");
  await user.type(inputAuthor, "testAuthor");
  await user.type(inputUrl, "testURL");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testTitle");
  expect(createBlog.mock.calls[0][0].author).toBe("testAuthor");
  expect(createBlog.mock.calls[0][0].url).toBe("testURL");
});

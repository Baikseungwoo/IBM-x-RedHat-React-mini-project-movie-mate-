// src/components/ReviewForm.jsx
import React, { useState } from "react";

const DEFAULT_VALUES = {
  title: "",
  content: "",
  genre: "액션",
  rating: 5,
};

const GENRES = ["액션", "공포", "코미디", "로맨스", "SF"];

const ReviewForm = ({ mode = "write", initialValues = {}, onSubmit }) => {
  const [form, setForm] = useState({ ...DEFAULT_VALUES, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "제목을 입력해주세요.";
    if (form.title.trim().length < 2) nextErrors.title = "제목은 2자 이상이어야 합니다.";
    if (!form.content.trim()) nextErrors.content = "내용을 입력해주세요.";
    if (form.content.trim().length < 10) nextErrors.content = "내용은 10자 이상 작성해주세요.";
    if (!GENRES.includes(form.genre)) nextErrors.genre = "장르를 선택해주세요.";
    if (form.rating < 1 || form.rating > 5) nextErrors.rating = "평점은 1~5 사이여야 합니다.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>제목</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label>장르</label>
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
      </div>

      <div>
        <label>평점 (1~5)</label>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
      </div>

      <div>
        <label>내용</label>
        <textarea
          name="content"
          rows={6}
          value={form.content}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
      </div>

      <button type="submit" className="px-4 py-2 rounded bg-amber-500 text-white">
        {mode === "edit" ? "수정 완료" : "작성 완료"}
      </button>
    </form>
  );
};

export default ReviewForm;

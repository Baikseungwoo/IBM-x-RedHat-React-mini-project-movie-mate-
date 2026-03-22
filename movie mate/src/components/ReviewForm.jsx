// src/components/ReviewForm.jsx
import React, { useState } from "react";


const DEFAULT_VALUES = {
  title: "",
  content: "",
  genre: "액션",
  rating: 5,
};

const GENRES = ['액션','공포','코미디','로맨스','SF', '드라마','판타지'];

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
    <form onSubmit={handleSubmit} className="space-y-6">

        {/* 제목 */}
        <div>
            <label className="block text-base font-semibold text-stone-700 mb-1">
            📣 제목
            </label>
            <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            placeholder="리뷰 제목을 입력하세요"
            />
            {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
        </div>

        {/* 장르 */}
        <div>
            <label className="block text-base font-semibold text-stone-700 mb-1">
            🎬 장르
            </label>
            <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            >
            {GENRES.map((g) => (
                <option key={g} value={g}>
                {g}
                </option>
            ))}
            </select>
            {errors.genre && (
            <p className="mt-1 text-sm text-red-500">{errors.genre}</p>
            )}
        </div>

        {/* 평점 */}
        <div>
            <label className="block text-base font-semibold text-stone-700 mb-1">
            ⭐ 평점 (1~5)
            </label>
            <input
            type="number"
            name="rating"
            min={1}
            max={5}
            value={form.rating}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
            {errors.rating && (
            <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
            )}
        </div>

        {/* 내용 */}
        <div>
            <label className="block text-base font-semibold text-stone-700 mb-1">
            내용
            </label>
            <textarea
            name="content"
            rows={6}
            value={form.content}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 resize-none"
            placeholder="리뷰 내용을 작성해주세요"
            />
            {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
            <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 hover:shadow-lg transition duration-200"
            >
            {mode === "edit" ? "수정 완료" : "작성 완료"}
            </button>
        </div>

    </form>
  );
};

export default ReviewForm;

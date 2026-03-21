import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';
import { useLocalStorage } from '../hooks/useLocalStorage';
import basicImage from '../image/basic.png';

const PROFILE_KEY = 'userProfiles';
const DEFAULT_IMAGE = basicImage;

const getOrCreateProfileImage = (userId) => {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || '[]');
  const found = profiles.find((p) => p.userId === userId);

  if (found) return found.image || DEFAULT_IMAGE;

  const newProfile = { userId, image: DEFAULT_IMAGE };
  localStorage.setItem(PROFILE_KEY, JSON.stringify([...profiles, newProfile]));
  return DEFAULT_IMAGE;
};

const updateProfileImage = (userId, image) => {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || '[]');
  const idx = profiles.findIndex((p) => p.userId === userId);

  if (idx === -1) {
    profiles.push({ userId, image });
  } else {
    profiles[idx] = { ...profiles[idx], image };
  }

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
};

const MyPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [reviews] = useLocalStorage('reviews', []);
  const [likes] = useLocalStorage('like', []);
  const [profileImage, setProfileImage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;
    setProfileImage(getOrCreateProfileImage(currentUser.id));
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
        <button onClick={() => navigate('/login')}>로그인하러 가기</button>
      </div>
    );
  }

  const myReviews = reviews
    .filter((r) => r.writerId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const likedReviewIds = likes
    .filter((l) => l.userId === currentUser.id)
    .map((l) => l.reviewId);

  const likedReviews = reviews
    .filter((r) => likedReviewIds.includes(r.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const onClickEditImage = () => {
    fileInputRef.current?.click();
  };

  const onChangeImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      updateProfileImage(currentUser.id, base64);
      setProfileImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

        {/* 제목 */}
        <h2 className="text-3xl font-bold text-stone-800">마이페이지</h2>


        <section className="rounded-3xl bg-white/90 p-8 shadow-xl border border-amber-100">
            <h3 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
            👤 내 정보
            </h3>

            <div className="flex items-center gap-6">
            

            <div className="relative">
                <img
                src={profileImage || basicImage}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-amber-200 shadow-md"
                onError={(e) => {
                    e.currentTarget.src = basicImage;
                }}
                />

                <button
                onClick={onClickEditImage}
                className="absolute bottom-0 right-0 bg-amber-500 text-white rounded-full p-2 text-xs shadow hover:bg-amber-600 transition"
                >
                ✏️
                </button>

                <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChangeImage}
                />
            </div>


            <div className="space-y-2 text-sm text-stone-700">
                <p>
                아이디 : <span className="font-semibold">{currentUser.id}</span>
                </p>
                <p>
                이메일 : <span className="text-stone-500">{currentUser.email}</span>
                </p>
                <p>
                MBTI :{" "}
                <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-semibold">
                    {currentUser.mbti}
                </span>
                </p>
            </div>

            </div>
        </section>


        <section className="rounded-3xl bg-white/90 p-8 shadow-xl border border-amber-100">
            <h3 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
            ✍️ 내가 작성한 게시글
            </h3>

            <div className="space-y-3">
            {myReviews.slice(0, 5).map((review) => (
                <div
                key={review.id}
                onClick={() => navigate(`/reviews/${review.id}`)}
                className="cursor-pointer rounded-xl border border-gray-200 px-4 py-3 hover:bg-amber-50 hover:shadow transition duration-200"
                >
                <div className="flex items-center justify-between">
                    <p className="font-medium text-stone-800">
                        {review.title}
                    </p>

                    <span className="text-sm text-amber-600 font-medium">
                        ♥️ {review.likes}
                    </span>
                </div>
                </div>
            ))}

            {myReviews.length === 0 && (
                <p className="text-sm text-stone-500 text-center">
                작성한 게시글이 없습니다.
                </p>
            )}
            </div>

            <div className="flex justify-end mt-4">
            <button
                onClick={() => navigate('/mypage/my-reviews')}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-stone-700 hover:bg-gray-100 transition"
            >
                전체보기
            </button>
            </div>
        </section>


        <section className="rounded-3xl bg-white/90 p-8 shadow-xl border border-amber-100">
            <h3 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
            ❤️ 좋아요 누른 게시글
            </h3>

            <div className="space-y-3">
            {likedReviews.slice(0, 5).map((review) => (
                <div
                key={review.id}
                onClick={() => navigate(`/reviews/${review.id}`)}
                className="cursor-pointer rounded-xl border border-gray-200 px-4 py-3 hover:bg-amber-50 hover:shadow transition duration-200"
                >
                <div className="flex items-center justify-between">
                    <p className="font-medium text-stone-800">
                        {review.title}
                    </p>

                    <span className="text-sm text-stone-500">
                        ✍️ 작성자 - {review.writerId}
                    </span>
                </div>
                </div>
            ))}

            {likedReviews.length === 0 && (
                <p className="text-sm text-stone-500 text-center">
                좋아요 누른 게시글이 없습니다.
                </p>
            )}
            </div>

            <div className="flex justify-end mt-4">
            <button
                onClick={() => navigate('/mypage/liked-reviews')}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-stone-700 hover:bg-gray-100 transition"
            >
                더보기
            </button>
            </div>
        </section>

    </div>
  );
};

export default MyPage;
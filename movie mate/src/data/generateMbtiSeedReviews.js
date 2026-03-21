const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

const GENRES = ["SF", "액션", "코미디", "공포", "로맨스", "드라마", "스릴러", "판타지"];

export const generateMbtiSeedReviews = () => {
  const reviews = [];
  let id = 1;

  for (const mbti of MBTI_TYPES) {
    for (let i = 1; i <= 5; i++) {
      reviews.push({
        id: id++,
        title: `${Math.floor(Math.random()*10+1)}번 영화 관점 리뷰 ${Math.floor(Math.random()*10+1)}`,
        content: `${mbti} 성향으로 본 영화 후기 ${i}번입니다.\n
        너무너무 재미가 있었습니다\n
        다음에 기회가 된다면 한번더 보고 싶습니다. \n
        여러분들도 혹시 시간이 된다면 꼭 한번씩 보시기를 추천드립니다.\n
        좋아요좀 많이 눌러주세용~~!!`,
        rating: Math.floor(Math.random()*5+1),
        writerId: '백승우',
        writerMbti: mbti,
        genre: GENRES[(id + i) % GENRES.length],
        likes: Math.floor(Math.random()*30+1),
        createdAt: `2026-03-${String(((id + i) % 28) + 1).padStart(2, "0")}`,
      });
    }
  }

  return reviews; // 총 80개
};
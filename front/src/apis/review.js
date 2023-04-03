import api from "./axiosInstance";

export const reviewCreate = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await api.post(`/api/reviews`, data, config);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reviewDelete = async () => {
  try {
  } catch {}
};

export const likeReview = async (reviewId) => {
  try {
    const res = await api.post(`/api/reviews/${reviewId}/like`);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//특정 위스키의 리뷰 목록 조회
export const getWhiskyReviews = async (whiskyId, baseId = 0, reviewOrder = "LIKE") => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${whiskyId}/any`, {
      params: {
        baseId,
        reviewOrder,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*
{
  rating: 4.5, // 수정할 평점
  content: "이 위스키는 맛있어요!", // 수정할 리뷰 내용
  deleteReviewImageIds: [1, 2, 3], // 삭제할 이미지 ID 리스트
  addedReviewImageFiles: [File1, File2] // 추가할 이미지 파일 리스트
}
 */

//리뷰 수정
export const reviewUpdate = async (reviewId, data) => {
  const formData = new FormData();
  formData.append("rating", data.rating);
  formData.append("content", data.content);
  data.deleteReviewImageIds.forEach((id) => formData.append("deleteReviewImageIds", id));
  data.addedReviewImageFiles.forEach((file) => formData.append("addedReviewImageFiles", file));

  try {
    const res = await api.put(`/api/reviews/${reviewId}`, formData);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//특정 위스키에 작성한 내 리뷰 목록 조회
export const getMyReviewsForWhisky = async (whiskyId) => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${whiskyId}/my`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const res = await api.delete(`/api/reviews/${reviewId}`);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//유저가 작성한 리뷰 목록 조회
export const fetchUserReviews = async (memberId, baseId = 0, reviewOrder = "LIKE") => {
  try {
    const res = await api.get(`/api/reviews/members/${memberId}/any`, {
      params: { baseId, reviewOrder },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

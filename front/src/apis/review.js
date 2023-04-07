import api from "./axiosInstance";

export const reviewCreate = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await api.post(`/api/reviews`, data, config);
    return true;
  } catch (error) {
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
    return true;
  } catch (error) {
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
    return null;
  }
};

//리뷰 수정
export const reviewUpdate = async (reviewId, data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await api.put(`/api/reviews/${reviewId}`, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

//특정 위스키에 작성한 내 리뷰 목록 조회
export const getMyReviewsForWhisky = async (whiskyId) => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${whiskyId}/my`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const res = await api.delete(`/api/reviews/${reviewId}`);
    return true;
  } catch (error) {
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
    return [];
  }
};

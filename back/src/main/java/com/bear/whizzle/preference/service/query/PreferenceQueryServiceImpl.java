package com.bear.whizzle.preference.service.query;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Like;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.like.repository.LikeRepository;
import com.bear.whizzle.preference.repository.projection.PreferenceProjectionRepository;
import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.review.repository.ReviewRepository;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PreferenceQueryServiceImpl implements PreferenceQueryService {

    private final Float standardRating;
    private final ReviewRepository reviewRepository;
    private final PreferenceProjectionRepository preferenceProjectionRepository;
    private final LikeRepository likeRepository;

    public PreferenceQueryServiceImpl(
            @Value("${review.rating.standard}") Float standardRating,
            ReviewRepository reviewRepository,
            PreferenceProjectionRepository preferenceProjectionRepository,
            LikeRepository likeRepository) {
        this.standardRating = standardRating;
        this.reviewRepository = reviewRepository;
        this.preferenceProjectionRepository = preferenceProjectionRepository;
        this.likeRepository = likeRepository;
    }

    @Override
    @SuppressWarnings("OptionalGetWithoutIsPresent")
    public PreferenceStatisticsDto estimateWhiskyTopPreference(Long whiskyId) {
        List<Review> reviews = reviewRepository.findAllByWhiskyIdAndRatingGreaterThanEqual(whiskyId, standardRating);
        if (reviews.isEmpty()) {
            throw new NotFoundException("위스키에 작성된 리뷰가 없으면 선호도를 파악할 수 없습니다.");
        }

        Map<PreferenceStatisticsDto, Integer> scores = new HashMap<>();
        calculateScoresFromReviews(scores, reviews);
        calculateScoresFromLikes(scores, reviews);

        return scores.entrySet()
                     .stream()
                     .min(Entry.comparingByValue(Comparator.reverseOrder()))
                     .map(Entry::getKey)
                     .get();
    }

    private void calculateScoresFromReviews(Map<PreferenceStatisticsDto, Integer> scores, List<Review> reviews) {
        calculateScores(
                scores,
                reviews.stream()
                       .map(Review::getMember)
                       .map(Member::getId)
                       .collect(Collectors.toList())
        );
    }

    private void calculateScoresFromLikes(Map<PreferenceStatisticsDto, Integer> scores, List<Review> reviews) {
        calculateScores(
                scores,
                likeRepository.findAllByReviewIn(reviews)
                              .stream()
                              .map(Like::getMember)
                              .map(Member::getId)
                              .collect(Collectors.toList())
        );
    }

    private void calculateScores(Map<PreferenceStatisticsDto, Integer> scores, List<Long> memberIds) {
        preferenceProjectionRepository.findAllByMemberIn(memberIds)
                                      .forEach(dto -> {
                                          int score = scores.getOrDefault(dto, 0) + 100;
                                          scores.put(dto, score);
                                      });
    }

}

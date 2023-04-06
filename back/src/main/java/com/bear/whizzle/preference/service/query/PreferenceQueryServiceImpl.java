package com.bear.whizzle.preference.service.query;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.model.entity.Like;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.type.CacheType;
import com.bear.whizzle.like.repository.LikeRepository;
import com.bear.whizzle.preference.repository.projection.PreferenceProjectionRepository;
import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.review.repository.ReviewRepository;
import com.bear.whizzle.whisky.repository.projection.WhiskyProjectionRepository;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PreferenceQueryServiceImpl implements PreferenceQueryService {

    private final Float standardRating;
    private final ReviewRepository reviewRepository;
    private final PreferenceProjectionRepository preferenceProjectionRepository;
    private final LikeRepository likeRepository;
    private final CacheManager cacheManager;
    private final WhiskyProjectionRepository whiskyProjectionRepository;

    @Value("${app.cache.flavor-key}")
    private String flavorKey;

    public PreferenceQueryServiceImpl(
            @Value("${review.rating.standard}") Float standardRating,
            ReviewRepository reviewRepository,
            PreferenceProjectionRepository preferenceProjectionRepository,
            LikeRepository likeRepository,
            CacheManager cacheManager,
            WhiskyProjectionRepository whiskyProjectionRepository) {
        this.standardRating = standardRating;
        this.reviewRepository = reviewRepository;
        this.preferenceProjectionRepository = preferenceProjectionRepository;
        this.likeRepository = likeRepository;
        this.cacheManager = cacheManager;
        this.whiskyProjectionRepository = whiskyProjectionRepository;
    }

    @Override
    public FlavorSummary findFlavorMinMax() {
        Cache flavorCache = cacheManager.getCache(CacheType.FLAVOR_MINMAX.getCacheName());
        FlavorSummary summary = flavorCache.get(flavorKey, FlavorSummary.class);
        if (summary == null) {
            FlavorSummary flavorSummary1 = whiskyProjectionRepository.findFlavorMinMaxByWhisky();
//            FlavorSummary flavorSummary2 = preferenceProjectionRepository.findFlavorMinMaxByPreference();
//            summary = FlavorSummary.selectMinMax(flavorSummary1, flavorSummary2);
            flavorCache.put(flavorKey, flavorSummary1);
        }
        return summary;
    }

    @Override
    @Performance
    public PreferenceStatisticsDto estimateWhiskyTopPreference(Long whiskyId) {
        List<Review> reviews = reviewRepository.findAllByWhiskyIdAndRatingGreaterThanEqual(whiskyId, standardRating);
        if (reviews.isEmpty()) {
            return null;
        }

        Map<PreferenceStatisticsDto, Integer> scores = new HashMap<>();
        calculateScoresFromReviews(scores, reviews);
        calculateScoresFromLikes(scores, reviews);

        return scores.entrySet()
                     .stream()
                     .min(Entry.comparingByValue(Comparator.reverseOrder()))
                     .map(Entry::getKey)
                     .orElse(null);
    }

    private void calculateScoresFromReviews(Map<PreferenceStatisticsDto, Integer> scores, List<Review> reviews) {
        plusScores(
                scores, 100,
                reviews.stream()
                       .map(Review::getMember)
                       .map(Member::getId)
                       .collect(Collectors.toList())
        );
    }

    private void calculateScoresFromLikes(Map<PreferenceStatisticsDto, Integer> scores, List<Review> reviews) {
        plusScores(
                scores, 25,
                likeRepository.findAllByReviewIn(reviews)
                              .stream()
                              .map(Like::getMember)
                              .map(Member::getId)
                              .collect(Collectors.toList())
        );
    }

    private void plusScores(Map<PreferenceStatisticsDto, Integer> scores, int value, List<Long> memberIds) {
        preferenceProjectionRepository.findAllByMemberIn(memberIds)
                                      .forEach(dto -> scores.merge(dto, value, Integer::sum));
    }

}

package com.bear.whizzle.recommend;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;

public class PreferenceMapper {

    private PreferenceMapper() {
    }

    public static PreferenceDto toPreferenceDto(Long memberId, Integer priceTier, Flavor flavor, FlavorSummary flavorSummary) {
        return PreferenceDto.builder()
                            .memberId(memberId)
                            .priceTier(priceTier)
                            .body(minmaxNormalize(flavor.getBody(), flavorSummary.getMinBody(), flavorSummary.getMaxBody()))
                            .oily(minmaxNormalize(flavor.getOily(), flavorSummary.getMinOily(), flavorSummary.getMaxOily()))
                            .rich(minmaxNormalize(flavor.getRich(), flavorSummary.getMinRich(), flavorSummary.getMaxRich()))
                            .salty(minmaxNormalize(flavor.getSalty(), flavorSummary.getMinSalty(), flavorSummary.getMaxSalty()))
                            .smoky(minmaxNormalize(flavor.getSmoky(), flavorSummary.getMinSmoky(), flavorSummary.getMaxSmoky()))
                            .spicy(minmaxNormalize(flavor.getSpicy(), flavorSummary.getMinSpicy(), flavorSummary.getMaxSpicy()))
                            .sweet(minmaxNormalize(flavor.getSweet(), flavorSummary.getMinSweet(), flavorSummary.getMaxSweet()))
                            .peaty(minmaxNormalize(flavor.getPeaty(), flavorSummary.getMinPeaty(), flavorSummary.getMaxPeaty()))
                            .fruity(minmaxNormalize(flavor.getFruity(), flavorSummary.getMinFruity(), flavorSummary.getMaxFruity()))
                            .herbal(minmaxNormalize(flavor.getHerbal(), flavorSummary.getMinHerbal(), flavorSummary.getMaxHerbal()))
                            .vanilla(minmaxNormalize(flavor.getVanilla(), flavorSummary.getMinVanilla(), flavorSummary.getMaxVanilla()))
                            .floral(minmaxNormalize(flavor.getFloral(), flavorSummary.getMinFloral(), flavorSummary.getMaxFloral()))
                            .tart(minmaxNormalize(flavor.getTart(), flavorSummary.getMinTart(), flavorSummary.getMaxTart()))
                            .build();
    }

    public static PreferenceDto toPreferenceDto(Preference preference, FlavorSummary flavorSummary) {
        return PreferenceDto.builder()
                            .memberId(preference.getMember().getId())
                            .priceTier(preference.getPriceTier())
                            .body(minmaxNormalize(preference.getFlavor().getBody(), flavorSummary.getMinBody(), flavorSummary.getMaxBody()))
                            .oily(minmaxNormalize(preference.getFlavor().getOily(), flavorSummary.getMinOily(), flavorSummary.getMaxOily()))
                            .rich(minmaxNormalize(preference.getFlavor().getRich(), flavorSummary.getMinRich(), flavorSummary.getMaxRich()))
                            .salty(minmaxNormalize(preference.getFlavor().getSalty(), flavorSummary.getMinSalty(), flavorSummary.getMaxSalty()))
                            .smoky(minmaxNormalize(preference.getFlavor().getSmoky(), flavorSummary.getMinSmoky(), flavorSummary.getMaxSmoky()))
                            .spicy(minmaxNormalize(preference.getFlavor().getSpicy(), flavorSummary.getMinSpicy(), flavorSummary.getMaxSpicy()))
                            .sweet(minmaxNormalize(preference.getFlavor().getSweet(), flavorSummary.getMinSweet(), flavorSummary.getMaxSweet()))
                            .peaty(minmaxNormalize(preference.getFlavor().getPeaty(), flavorSummary.getMinPeaty(), flavorSummary.getMaxPeaty()))
                            .fruity(minmaxNormalize(preference.getFlavor().getFruity(), flavorSummary.getMinFruity(), flavorSummary.getMaxFruity()))
                            .herbal(minmaxNormalize(preference.getFlavor().getHerbal(), flavorSummary.getMinHerbal(), flavorSummary.getMaxHerbal()))
                            .vanilla(minmaxNormalize(preference.getFlavor().getVanilla(), flavorSummary.getMinVanilla(), flavorSummary.getMaxVanilla()))
                            .floral(minmaxNormalize(preference.getFlavor().getFloral(), flavorSummary.getMinFloral(), flavorSummary.getMaxFloral()))
                            .tart(minmaxNormalize(preference.getFlavor().getTart(), flavorSummary.getMinTart(), flavorSummary.getMaxTart()))
                            .build();
    }

    private static Float minmaxNormalize(Integer score, Integer min, Integer max) {
        min = Math.min(score, min);
        max = Math.max(score, max);
        return ((float) score - min) / (max - min);
    }

}

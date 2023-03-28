package com.bear.whizzle.domain.model.document;

import com.bear.whizzle.domain.model.entity.Whisky;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "whisky_search")
@Mapping(mappingPath = "mappings/whisky-mapping.json")
@Setting(settingPath = "settings/whisky-setting.json")
public class WhiskyDocument {

    @Id
    private String id;

    private String name;

    public static WhiskyDocument of(Whisky whisky) {
        return WhiskyDocument.builder()
                             .name(whisky.getName())
                             .build();
    }

}

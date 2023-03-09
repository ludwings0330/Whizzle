package com.bear.whizzle.domain.model.type;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class File {

    @Column(name = "path_and_name", unique = true)
    private String key; // AWS에서 key는 '[filePath/]savedName'을 의미한다.

    private String originalName;

    private String url;

}

package com.bear.whizzle.domain.model.type.id;

import java.io.Serializable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
public class LikeId implements Serializable {

    private Long review;

    private Long member;

}

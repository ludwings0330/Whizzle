package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Image;
import java.util.Objects;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(
        name = "badge",
        uniqueConstraints = @UniqueConstraint(columnNames = { "description" })
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @NotNull
    private Image image;

    @NotNull
    @Size(max = 255)
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Badge)) {
            return false;
        }

        Badge that = (Badge) o;
        return Objects.equals(this.getDescription(), that.getDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.getDescription());
    }

}

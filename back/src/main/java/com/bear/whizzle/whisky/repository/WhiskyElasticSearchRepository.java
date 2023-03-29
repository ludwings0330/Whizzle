package com.bear.whizzle.whisky.repository;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;

import com.bear.whizzle.domain.model.document.WhiskyDocument;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.Operator;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WhiskyElasticSearchRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    public List<WhiskyDocument> suggestByName(String name) {
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(
                        matchQuery("name", name)
                                .operator(Operator.AND)
                                .fuzziness(1))
                .withPageable(Pageable.ofSize(8))
                .build();

        final SearchHits<WhiskyDocument> search = elasticsearchOperations.search(searchQuery, WhiskyDocument.class);

        return search.stream().map(SearchHit::getContent).collect(Collectors.toList());
    }

}

package com.bear.whizzle.whisky;

import com.amazonaws.services.s3.AmazonS3;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Image;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Slf4j
@Disabled("위스키 데이터 추가를 완료했습니다.")
class SaveWhiskyData {

    private final JdbcTemplate jdbcTemplate;
    private final AmazonS3 amazonS3;
    private final String bucketName;

    @Autowired
    public SaveWhiskyData(JdbcTemplate jdbcTemplate, AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucketName) {
        this.jdbcTemplate = jdbcTemplate;
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    @Test
    @DisplayName("위스키 CSV 파일 파싱과 그에 맞는 사진을 읽어서 DB에 저장")
    void saveWhiskyData() {
        List<Whisky> whiskies = new ArrayList<>();
        String[] columns = { "id", "name", "category", "location", "price_tier", "abv", "cask_type",
                             "smoky", "peaty", "spicy", "herbal", "oily", "body", "rich", "sweet", "salty", "vanilla", "tart", "fruity", "floral" };

        try (CSVParser csvParser = new CSVParser(
                new FileReader("resources/whisky.csv"),
                CSVFormat.DEFAULT
                        .builder()
                        .setHeader(columns)
                        .setSkipHeaderRecord(true)
                        .build()
        )) {
            for (CSVRecord record : csvParser) {
                whiskies.add(
                        Whisky.builder()
                              .id(Long.valueOf(record.get(columns[0])))
                              .name(record.get(columns[1]))
                              .category(record.get(columns[2]))
                              .location(record.get(columns[3]))
                              .priceTier(Integer.valueOf(record.get(columns[4])))
                              .abv(Float.valueOf(record.get(columns[5])))
                              .caskType(record.get(columns[6]))
                              .flavor(
                                      Flavor.builder()
                                            .smoky(Integer.valueOf(record.get(columns[7])))
                                            .peaty(Integer.valueOf(record.get(columns[8])))
                                            .spicy(Integer.valueOf(record.get(columns[9])))
                                            .herbal(Integer.valueOf(record.get(columns[10])))
                                            .oily(Integer.valueOf(record.get(columns[11])))
                                            .body(Integer.valueOf(record.get(columns[12])))
                                            .rich(Integer.valueOf(record.get(columns[13])))
                                            .sweet(Integer.valueOf(record.get(columns[14])))
                                            .salty(Integer.valueOf(record.get(columns[15])))
                                            .vanilla(Integer.valueOf(record.get(columns[16])))
                                            .tart(Integer.valueOf(record.get(columns[17])))
                                            .fruity(Integer.valueOf(record.get(columns[18])))
                                            .floral(Integer.valueOf(record.get(columns[19])))
                                            .build()
                              )
                              .build()
                );
            }
        } catch (IOException e) {
            log.error("CSV 파일을 읽는 중 에러 발생", e);
            Assertions.fail(e.getMessage());
        }

        saveOldWhiskyImage(whiskies);
        bulkInsert(whiskies);
    }

    private void saveNewWhiskyImage(List<Whisky> whiskies) {
        whiskies.forEach(whisky -> {
            String originalName = "NO_" + whisky.getId() + ".png";
            String key = "images/whiskies/" + originalName;
            amazonS3.putObject(
                    this.bucketName, key, new File("resources/whisky_images/" + originalName)
            );

            whisky.changeImage(
                    Image.builder()
                         .originalName(originalName)
                         .savedPath(key)
                         .url(amazonS3.getUrl(this.bucketName, key))
                         .build()
            );
        });
    }

    private void saveOldWhiskyImage(List<Whisky> whiskies) {
        whiskies.forEach(
                whisky -> {
                    String originalName = "NO_" + whisky.getId() + ".png";
                    String key = "images/whiskies/" + originalName;
                    String url = "https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/" + key;

                    try {
                        whisky.changeImage(
                                Image.builder()
                                     .originalName(originalName)
                                     .savedPath(key)
                                     .url(new URL(url))
                                     .build()
                        );
                    } catch (MalformedURLException e) {
                        throw new UncheckedIOException(e);
                    }
                }
        );
    }

    private void bulkInsert(List<Whisky> whiskies) {
        final String INSERT_SQL = "INSERT INTO whisky (id, name, category, location, price_tier, abv, cask_type, smoky, peaty, spicy, herbal, oily, body, rich, sweet, salty, vanilla, tart, fruity, floral, original_name, saved_path, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, whiskies, whiskies.size(),
                (preparedStatement, whisky) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, whisky.getId() + 1);
                    preparedStatement.setString(++idx, whisky.getName());
                    preparedStatement.setString(++idx, whisky.getCategory());
                    preparedStatement.setString(++idx, whisky.getLocation());
                    preparedStatement.setInt(++idx, whisky.getPriceTier());
                    preparedStatement.setFloat(++idx, whisky.getAbv());
                    preparedStatement.setString(++idx, whisky.getCaskType());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getSmoky());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getPeaty());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getSpicy());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getHerbal());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getOily());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getBody());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getRich());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getSweet());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getSalty());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getVanilla());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getTart());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getFruity());
                    preparedStatement.setInt(++idx, whisky.getFlavor().getFloral());
                    preparedStatement.setString(++idx, whisky.getImage().getOriginalName());
                    preparedStatement.setString(++idx, whisky.getImage().getSavedPath());
                    preparedStatement.setString(++idx, whisky.getImage().getUrl().toString());
                }
        );
    }

}

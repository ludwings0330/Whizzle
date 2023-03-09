package com.bear.whizzle.domain.converter;

import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.net.URL;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class UrlConverter implements AttributeConverter<URL, String> {

    @Override
    public String convertToDatabaseColumn(URL attribute) {
        return attribute.toString();
    }

    @Override
    public URL convertToEntityAttribute(String dbData) {
        try {
            return new URL(dbData);
        } catch (MalformedURLException e) {
            throw new UncheckedIOException(e);
        }
    }

}

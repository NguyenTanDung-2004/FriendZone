package com.example.FriendZone.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ExternalFile implements WebMvcConfigurer {

        @Value("${images.directory}")
        private String externalImagesDirectory;

        @Value("${videos.directory}")
        private String externalVideosDirectory;

        @Value("${others.directory}")
        private String externalOthersDirectory;

        @Value("${parent.directory}")
        private String externalParentDirectory;

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/external-images/**")
                                .addResourceLocations("file:" + externalImagesDirectory);

                registry.addResourceHandler("/external-videos/**")
                                .addResourceLocations("file:" + externalVideosDirectory);

                registry.addResourceHandler("/external-others/**")
                                .addResourceLocations("file:" + externalOthersDirectory);

                registry.addResourceHandler("/parent/**")
                                .addResourceLocations("file:" + externalParentDirectory);
        }
}
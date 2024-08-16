package com.example.FriendZone.Utils;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Exception.ExceptionUser;

import lombok.Data;

@Data
@Component
public class HandleFileUpload {

    @Value("${images.directory}")
    private String externalImagesDirectory;

    @Value("${videos.directory}")
    private String externalVideosDirectory;

    @Value("${others.directory}")
    private String externalOthersDirectory;

    // Get the value of a field using reflection
    public String getFieldValue(Object obj, String fieldName) {
        try {
            Field field = obj.getClass().getDeclaredField(fieldName);
            field.setAccessible(true); // Make the field accessible if it's private
            return (String) field.get(obj); // Cast to the appropriate type
        } catch (NoSuchFieldException | IllegalAccessException | IllegalArgumentException e) {
            e.printStackTrace();
            throw new ExceptionUser();
        }
    }

    // save file
    public void saveFile(MultipartFile file) {
        String folder = this.getComparableFolder(file);

        File directory = new File(folder.replace("file:", ""));
        // Save the file
        File savedFile = new File(directory, file.getOriginalFilename());
        try {
            file.transferTo(savedFile);
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("File saved: " + savedFile.getAbsolutePath());
    }

    // choose folder for file
    public String getComparableFolder(MultipartFile file) {
        String contentType = file.getContentType();
        System.out.println(contentType);
        if (contentType.startsWith("image/")) {
            return this.externalImagesDirectory;
        } else if (contentType.startsWith("video/")) {
            return this.externalVideosDirectory;
        } else {
            return this.externalOthersDirectory;
        }
    }

    public static void main(String args[]) {
        UUID randomUUID = UUID.randomUUID();
        System.out.println(randomUUID.toString());
    }
}

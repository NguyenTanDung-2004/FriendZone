package com.example.FriendZone.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ServiceFile {
    @Autowired
    private ServiceUser serviceUser;

    public ResponseEntity<InputStreamSource> downloadFile(String userId, String type,
            String fileId, String tail, String nameFile) {
        String absoluteFilePath = "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\"
                + type + "\\" + userId + "\\" + fileId + tail;

        try {
            File file = new File(absoluteFilePath);
            if (!file.exists() || !file.canRead()) {
                throw new FileNotFoundException("File not found or not readable: " + absoluteFilePath);
            }

            InputStream inputStream = new FileInputStream(file);
            InputStreamResource resource = new InputStreamResource(inputStream);

            String contentType = "application/octet-stream";
            String headerValue = "attachment; filename=\"" + nameFile + "\"";

            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, headerValue)
                    .body(resource);
        } catch (Exception e) {
            throw new RuntimeException("Error downloading file: " + absoluteFilePath, e);
        }
    }
}

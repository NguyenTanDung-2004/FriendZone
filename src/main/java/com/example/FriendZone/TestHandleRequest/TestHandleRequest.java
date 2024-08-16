package com.example.FriendZone.TestHandleRequest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Utils.HandleFileUpload;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@RestController
@RequestMapping("/test")
public class TestHandleRequest {
    @Autowired
    HandleFileUpload handleFileUpload;

    @PostMapping("/upload")
    public ResponseEntity<?> hienthi5(@RequestParam("file") MultipartFile[] files) {
        for (MultipartFile file : files) {
            System.out.println(file.getOriginalFilename());
            this.handleFileUpload.saveFile(file);
        }
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        Map<String, Object> objectToJson = new HashMap<>();
        objectToJson.put("Code", 1001);
        objectToJson.put("ResponseBody", "upload successfully!");
        String json = "";
        try {
            json = ow.writeValueAsString(objectToJson);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.OK).body(json);
    }

    @GetMapping("/getVariableValueUsingString")
    public String getParam() {
        System.out.println(this.handleFileUpload.getFieldValue(handleFileUpload, "externalImagesDirectory"));
        return this.handleFileUpload.getFieldValue(handleFileUpload, "externalImagesDirectory");
    }

}

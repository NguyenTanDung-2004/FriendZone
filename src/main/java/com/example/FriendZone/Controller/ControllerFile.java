package com.example.FriendZone.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.StringReader;
import java.net.http.HttpHeaders;
import java.nio.file.Paths;

import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.jpa.domain.JpaSort.Path;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.FriendZone.Request.RequestUpload1File;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Service.ServiceFile;
import com.example.FriendZone.Service.ServiceUser;
import com.example.FriendZone.Utils.UtilsHandleFile;
import com.nimbusds.jose.util.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/handleFile")
public class ControllerFile {
    @Autowired
    UtilsHandleFile utilsHandleFile;

    @Autowired
    ServiceUser serviceUser;

    @Autowired
    private ServiceFile serviceFile;

    @PostMapping("/uploadFileAvtAndBackground")
    public ResponseEntity uploadFileAvtAndBackground(@RequestParam(name = "file") MultipartFile file,
            @RequestParam(name = "type") String type,
            HttpServletRequest httpServletRequest) {
        String userId = serviceUser.checkJwt(httpServletRequest);
        this.utilsHandleFile.saveFile(file, type, userId);
        return ResponseEntity.status(ResponseCode.saveFileSuccessfully.getStatus())
                .body(ResponseCode.saveFileSuccessfully);
    }

    @GetMapping("/downloadFile")
    public ResponseEntity downloadFile(@RequestParam(name = "userId") String userId,
            @RequestParam(name = "type") String type,
            @RequestParam(name = "fileId") String fileId,
            @RequestParam(name = "tail") String tail,
            @RequestParam(name = "nameFile") String nameFile) {

        return this.serviceFile.downloadFile(userId, type, fileId, tail, nameFile);
    }
}

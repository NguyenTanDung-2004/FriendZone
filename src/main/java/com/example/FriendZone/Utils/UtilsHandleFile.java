package com.example.FriendZone.Utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Exception.ExceptionErrorCode;
import com.example.FriendZone.Exception.ExceptionUser;

@Component
public class UtilsHandleFile {

    @Value("${images.directory}")
    public String externalImagesDirectory;

    @Value("${videos.directory}")
    public String externalVideosDirectory;

    @Value("${others.directory}")
    public String externalOthersDirectory;

    @Value("${parent.directory}")
    public String externalParentDirectory;

    public boolean checkFileExists(String directory, String fileName) {
        String absoluteFileName = directory.replace("file:", "") + "/" + fileName;
        File file = new File(absoluteFileName);
        return file.exists();
    }

    public void createFile(String userId, File file) {

    }

    public void createFolder(String userId) {
        String absoluteFolderImage = externalImagesDirectory.replace("file:", "") + "/" + userId;
        String absoluteFolderVideo = externalVideosDirectory.replace("file:", "") + "/" + userId;
        String absoluteFolderOthers = externalOthersDirectory.replace("file:", "") + "/" + userId;
        File f1 = new File(absoluteFolderImage);
        File f2 = new File(absoluteFolderVideo);
        File f3 = new File(absoluteFolderOthers);
        f1.mkdir();
        f2.mkdir();
        f3.mkdir();
    }

    public List<String> getFileNameInDirectoryOfUser(String userId, String typeFile) {
        List<String> listFileName = new ArrayList<>();
        String abosluteFolder = this.externalParentDirectory + "/"
                + typeFile + "/" + userId;
        File f = new File(abosluteFolder);
        File[] arrayFile = f.listFiles();
        for (int i = 0; i < Math.min(6, arrayFile.length); i++) {
            listFileName.add(abosluteFolder + "/" + arrayFile[i].getName());
        }
        return listFileName;
    }

    public void copyFile(String source, String destination) {
        Path sourceFile = Paths.get(source);
        Path destinationFile = Paths.get(destination);
        try {
            Files.copy(sourceFile, destinationFile);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void saveFile(MultipartFile file, String typeFile, String userId) {
        String folder = this.getComparableFolder(file);
        String absoluteFolder = folder + "/" + userId;
        absoluteFolder = absoluteFolder.replace("file:", "");
        File fileFolder = new File(absoluteFolder);
        int numberOfFiles = fileFolder.listFiles().length;
        String nameFile = numberOfFiles + getTailOfFile(file.getOriginalFilename());
        if (typeFile.equals("Avatar")) {
            nameFile = "avatar.jpg";
        }
        if (typeFile.equals("Background")) {
            nameFile = "background.jpg";
        }
        // Save the file
        File savedFile = new File(fileFolder, nameFile);
        try {
            file.transferTo(savedFile);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionUser(ExceptionErrorCode.saveFileError);
        }
    }

    public String getComparableFolder(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType.startsWith("image/")) {
            return this.externalImagesDirectory;
        } else if (contentType.startsWith("video/")) {
            return this.externalVideosDirectory;
        } else {
            return this.externalOthersDirectory;
        }
    }

    public String getTailOfFile(String fileName) {
        String tail = "";
        for (int i = fileName.length() - 1; i >= 0; i--) {
            tail = tail + fileName.charAt(i);
            if (fileName.charAt(i) == '.') {
                break;
            }
        }
        String revertedTail = "";
        for (int i = tail.length() - 1; i >= 0; i--) {
            revertedTail = revertedTail + tail.charAt(i);
        }
        return revertedTail;
    }

    public void saveFile(MultipartFile file, String userId, String fileId, String type) {
        String absoluteFolder = type + "/" + userId;
        String tailOfFile = getTailOfFile(file.getOriginalFilename());
        File savedFile = new File(absoluteFolder, fileId + tailOfFile);
        try {
            file.transferTo(savedFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void saveBackgroundGroup(MultipartFile file, String groupId, String folder) {
        String tailOfFile = getTailOfFile(file.getOriginalFilename());
        File savedFile = new File(folder, groupId + tailOfFile);
        try {
            file.transferTo(savedFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<String> createListUUID(int length) {
        List<String> listUUID = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            listUUID.add(UUID.randomUUID().toString());
        }
        return listUUID;
    }

    public List<String> createListTypeOfFile(MultipartFile[] files) {
        List<String> listTypeOfFile = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            listTypeOfFile.add(getComparableFolder(files[i]));
        }
        return listTypeOfFile;
    }

    public void delete1File(String id, String name, String type, String userId) {
        String fileName = id + getTailOfFile(name);
        String absoluteFilePath = type + "/" + userId + "/" + fileName;
        File f = new File(absoluteFilePath);
        boolean deleted = f.delete();
        if (deleted) {
            System.out.println("deleted " + absoluteFilePath);
        }
    }

    public void deleteManyFile(String[][] infOfFiles, String userId) {
        for (int i = 0; i < infOfFiles.length; i++) {
            delete1File(infOfFiles[i][1], infOfFiles[i][0], infOfFiles[i][2], userId);
        }
    }

    public String createUUID() {
        return UUID.randomUUID().toString();
    }
}

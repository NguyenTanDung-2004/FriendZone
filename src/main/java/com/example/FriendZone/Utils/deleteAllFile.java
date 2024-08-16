package com.example.FriendZone.Utils;

import java.io.File;

public class deleteAllFile {
    public static void deleteContents(String directoryPath) {
        File directory = new File(directoryPath);

        // Verify if the directory exists
        if (!directory.exists() || !directory.isDirectory()) {
            System.out.println("Directory does not exist or is not a directory: " + directoryPath);
            return;
        }

        // List all files and subdirectories in the directory
        File[] files = directory.listFiles();

        // Delete each file and recursively delete subdirectories
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    boolean deleted = file.delete();
                    if (deleted) {
                        System.out.println("Deleted file: " + file.getName());
                    } else {
                        System.out.println("Failed to delete file: " + file.getName());
                    }
                } else if (file.isDirectory()) {
                    // Recursive call for subdirectory
                    deleteContents(file.getAbsolutePath());

                    // Delete the empty subdirectory after its contents are deleted
                    boolean deleted = file.delete();
                    if (deleted) {
                        System.out.println("Deleted directory: " + file.getAbsolutePath());
                    } else {
                        System.out.println("Failed to delete directory: " + file.getAbsolutePath());
                    }
                }
            }
        }
    }

    public static void main(String args[]) {
        deleteContents(
                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Video");
        deleteContents(
                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Others");

        deleteContents(
                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Image");
    }
}

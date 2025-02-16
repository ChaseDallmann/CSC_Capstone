package com.teashop.teashop_backend;

public class manufacturer {
    int manufacturerID;
    String manufacturerName;
    String manufacturerAddress;
    String manufacturerURL;
 
    public manufacturer(int manufacturerID, String manufacturerName, String manufacturerAddress, String manufacturerURL) {
        this.manufacturerID = manufacturerID;
        this.manufacturerName = manufacturerName;
        this.manufacturerAddress = manufacturerAddress;
        this.manufacturerURL = manufacturerURL;
    }

    public int getManufacturerID() {
        return manufacturerID;
    }

    public void setManufacturerID(int manufacturerID) {
        this.manufacturerID = manufacturerID;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public String getManufacturerAddress() {
        return manufacturerAddress;
    }

    public void setManufacturerAddress(String manufacturerAddress) {
        this.manufacturerAddress = manufacturerAddress;
    }

    public String getManufacturerURL() {
        return manufacturerURL;
    }

    public void setManufacturerURL(String manufacturerURL) {
        this.manufacturerURL = manufacturerURL;
    }
}

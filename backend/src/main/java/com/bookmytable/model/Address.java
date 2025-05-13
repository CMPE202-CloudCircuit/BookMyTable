// Address.java
package com.bookmytable.model;
import lombok.Data;

@Data
public class Address {
  private String line1;
  private String city;
  private String state;
  private String zip;
  private double lat;
  private double lng;
}

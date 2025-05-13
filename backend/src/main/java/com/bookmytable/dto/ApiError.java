// ApiError.java
package com.bookmytable.dto;
import java.util.List;
public record ApiError(int status, String message, List<String> errors) {}

package com.bookmytable.config;

import com.bookmytable.dto.ApiError;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestControllerAdvice @Slf4j
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ApiError beanValidation(MethodArgumentNotValidException ex) {
    var errors = ex.getBindingResult().getFieldErrors().stream()
                   .map(e -> e.getField() + ": " + e.getDefaultMessage())
                   .toList();
    return new ApiError(400, "Validation failed", errors);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ApiError constraint(ConstraintViolationException ex) {
    var errors = ex.getConstraintViolations().stream()
                   .map(v -> v.getPropertyPath() + ": " + v.getMessage()).toList();
    return new ApiError(400, "Validation failed", errors);
  }

  @ExceptionHandler({
      BadCredentialsException.class,
      org.springframework.security.access.AccessDeniedException.class})
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ApiError auth(RuntimeException ex) {
    return new ApiError(401, "Unauthorized",
        List.of(ex.getMessage()));
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ApiError generic(Exception ex) {
    log.error("Unhandled", ex);
    return new ApiError(500, "Internal error",
        List.of("Unexpected server error"));
  }
}

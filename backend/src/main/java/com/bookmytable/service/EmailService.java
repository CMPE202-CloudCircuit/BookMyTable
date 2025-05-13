// EmailService  (dev stub – replace with SES later)
package com.bookmytable.service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service @Slf4j
public class EmailService {
  public void send(String to, String body) {
    log.info("DEV-email to {} ⇢ {}", to, body);
  }
}

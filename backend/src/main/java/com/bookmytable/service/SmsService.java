// SmsService  (dev stub – replace with Twilio/Pinpoint later)
package com.bookmytable.service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service @Slf4j
public class SmsService {
  public void send(String to, String body) {
    log.info("DEV-sms to {} ⇢ {}", to, body);
  }
}

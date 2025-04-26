package com.teashop.teashop_backend.controller.chat;

import lombok.Builder;

@Builder
public record Message(String to, String message, String from) { }

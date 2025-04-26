package com.teashop.teashop_backend.controller.chat;

import com.teashop.teashop_backend.model.chat.ChatMessage;
import com.teashop.teashop_backend.model.chat.ChatTranscript;
import com.teashop.teashop_backend.model.chat.ChatTranscriptRepository;
import com.teashop.teashop_backend.model.chat.ActiveCustomerDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatTranscriptRepository chatTranscriptRepository;


    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // Log the received message details
        System.out.println("=== RECEIVED CHAT MESSAGE ===");
        System.out.println("Sender: " + chatMessage.getSender());
        System.out.println("SenderRole: " + chatMessage.getSenderRole());
        System.out.println("Receiver: " + chatMessage.getReceiver());
        System.out.println("ReceiverRole: " + chatMessage.getReceiverRole());
        System.out.println("Content: " + chatMessage.getContent());
        System.out.println("Status: " + chatMessage.getStatus());
        System.out.println("==============================");
        
        // Save chat to database
        saveChatTranscript(chatMessage);
    
        // Check the sender role
        if ("customer".equals(chatMessage.getSenderRole())) {
            // Ensure customers are only sending messages to customer service
            if ("customerService".equals(chatMessage.getReceiverRole())) {
                // Send to the customer service representative
                simpMessagingTemplate.convertAndSendToUser(
                    chatMessage.getReceiver(), 
                    "/private", 
                    chatMessage
                );
                
                // Also echo back to the sender
                simpMessagingTemplate.convertAndSendToUser(
                    chatMessage.getSender(), 
                    "/private", 
                    chatMessage
                );
            } else {
                // Handle invalid option
                throw new IllegalArgumentException("Customer can only send messages to customer service.");
            }
        } else if ("customerService".equals(chatMessage.getSenderRole())) {
            // Ensure customer service is only sending messages to customers
            if ("customer".equals(chatMessage.getReceiverRole())) {
                // Send to the customer
                simpMessagingTemplate.convertAndSendToUser(
                    chatMessage.getReceiver(), 
                    "/private", 
                    chatMessage
                );
                
                // Also echo back to the sender
                simpMessagingTemplate.convertAndSendToUser(
                    chatMessage.getSender(), 
                    "/private", 
                    chatMessage
                );
            } else {
                // Handle invalid option
                throw new IllegalArgumentException("Customer service can only send messages to customers.");
            }
        } 
    }
    

    public void saveChatTranscript(ChatMessage chatMessage) {
        ChatTranscript chatTranscript = new ChatTranscript();
        chatTranscript.setSender(chatMessage.getSender());
        chatTranscript.setReceiver(chatMessage.getReceiver());
        chatTranscript.setMessage(chatMessage.getContent());
        chatTranscript.setStatus(chatMessage.getStatus());
        chatTranscript.setTimestamp(LocalDateTime.now());
        chatTranscriptRepository.save(chatTranscript);
    }
    
    /**
     * Get chat history for a user
     * @param email The user's email
     * @return List of chat messages
     */
    @GetMapping("/history/{email}")
    public ResponseEntity<List<Map<String, Object>>> getChatHistory(@PathVariable String email) {
        // Find all chats where the user is either sender or receiver
        List<ChatTranscript> transcripts = chatTranscriptRepository.findBySenderOrReceiverOrderByTimestampAsc(email, email);
        
        List<Map<String, Object>> result = transcripts.stream().map(transcript -> {
            Map<String, Object> message = new HashMap<>();
            message.put("sender", transcript.getSender());
            message.put("receiver", transcript.getReceiver());
            message.put("content", transcript.getMessage());
            message.put("status", transcript.getStatus());
            message.put("timestamp", transcript.getTimestamp());
            
            // Determine the roles
            if (transcript.getSender().equals(email)) {
                // This user is the sender
                message.put("senderRole", transcript.getSender().contains("@csp.edu") ? "customerService" : "customer");
                message.put("receiverRole", transcript.getReceiver().contains("@csp.edu") ? "customerService" : "customer");
            } else {
                // This user is the receiver
                message.put("senderRole", transcript.getSender().contains("@csp.edu") ? "customerService" : "customer");
                message.put("receiverRole", transcript.getReceiver().contains("@csp.edu") ? "customerService" : "customer");
            }
            
            return message;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Get a specific conversation between a customer service rep and a customer
     * @param customerEmail The customer's email
     * @return List of chat messages
     */
    @GetMapping("/conversation/{customerEmail}")
    public ResponseEntity<List<Map<String, Object>>> getConversation(@PathVariable String customerEmail) {
        // For simplicity, we assume all CSR emails end with @csp.edu
        // Find messages between this customer and any customer service rep
        List<ChatTranscript> transcripts = chatTranscriptRepository.findAll().stream()
            .filter(transcript -> 
                (transcript.getSender().equals(customerEmail) && transcript.getReceiver().contains("@csp.edu")) ||
                (transcript.getReceiver().equals(customerEmail) && transcript.getSender().contains("@csp.edu")))
            .sorted((t1, t2) -> t1.getTimestamp().compareTo(t2.getTimestamp()))
            .collect(Collectors.toList());
            
        List<Map<String, Object>> result = transcripts.stream().map(transcript -> {
            Map<String, Object> message = new HashMap<>();
            message.put("sender", transcript.getSender());
            message.put("receiver", transcript.getReceiver());
            message.put("content", transcript.getMessage());
            message.put("status", transcript.getStatus());
            message.put("timestamp", transcript.getTimestamp());
            
            // Determine the roles
            message.put("senderRole", transcript.getSender().contains("@csp.edu") ? "customerService" : "customer");
            message.put("receiverRole", transcript.getReceiver().contains("@csp.edu") ? "customerService" : "customer");
            
            return message;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Get all active customers who have sent messages
     * @return List of active customers
     */
    @GetMapping("/active-customers")
    public ResponseEntity<List<Map<String, Object>>> getActiveCustomers() {
        // Find all unique customers who have sent messages to CSR
        // For simplicity, we assume all CSR emails end with @csp.edu
        
        System.out.println("Active customers endpoint called");
        
        Map<String, ChatTranscript> latestMessageByCustomer = new HashMap<>();
        List<ChatTranscript> allTranscripts = chatTranscriptRepository.findAll();
        
        System.out.println("Total chat transcripts found: " + allTranscripts.size());
        
        for (ChatTranscript transcript : allTranscripts) {
            System.out.println("Processing transcript: " + transcript.getSender() + 
                               " → " + transcript.getReceiver() + 
                               ", message: " + transcript.getMessage());
            
            // Let's not rely on the email domain, but process all messages based on the defined roles
            // Save any customer in the conversation based on the transcript
            
            // Option 1: Get all unique non-CSR emails (customers)
            if (!transcript.getSender().equals("dallmanc@csp.edu")) {
                // This is a customer sending a message
                String customerEmail = transcript.getSender();
                System.out.println("Found customer sender: " + customerEmail);
                
                if (!latestMessageByCustomer.containsKey(customerEmail) || 
                    transcript.getTimestamp().isAfter(latestMessageByCustomer.get(customerEmail).getTimestamp())) {
                    latestMessageByCustomer.put(customerEmail, transcript);
                }
            }
            
            if (!transcript.getReceiver().equals("dallmanc@csp.edu")) {
                // This is a customer receiving a message
                String customerEmail = transcript.getReceiver();
                System.out.println("Found customer receiver: " + customerEmail);
                
                if (!latestMessageByCustomer.containsKey(customerEmail) || 
                    transcript.getTimestamp().isAfter(latestMessageByCustomer.get(customerEmail).getTimestamp())) {
                    latestMessageByCustomer.put(customerEmail, transcript);
                }
            }
        }
        
        System.out.println("Found " + latestMessageByCustomer.size() + " unique customers");
        
        // Convert to the expected format
        List<Map<String, Object>> result = new ArrayList<>();
        latestMessageByCustomer.forEach((email, transcript) -> {
            Map<String, Object> customer = new HashMap<>();
            customer.put("email", email);
            customer.put("name", email);  // Use email as name if we don't have customer names
            customer.put("lastMessage", transcript.getMessage());
            customer.put("timestamp", transcript.getTimestamp());
            result.add(customer);
            System.out.println("Added customer to result: " + email);
        });
        
        System.out.println("Returning " + result.size() + " customers");
        return ResponseEntity.ok(result);
    }
}
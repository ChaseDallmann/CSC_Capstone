package com.teashop.teashop_backend.model.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatTranscriptRepository extends JpaRepository<ChatTranscript, Integer> {
    
    /**
     * Find all chat transcripts where the given user is either the sender or the receiver
     * @param sender The sender's email
     * @param receiver The receiver's email
     * @return List of chat transcripts
     */
    List<ChatTranscript> findBySenderOrReceiverOrderByTimestampAsc(String sender, String receiver);
    
    /**
     * Find all chat transcripts for a specific sender
     * @param sender The sender's email
     * @return List of chat transcripts
     */
    List<ChatTranscript> findBySender(String sender);
    
    /**
     * Find all chat transcripts for a specific receiver
     * @param receiver The receiver's email
     * @return List of chat transcripts
     */
    List<ChatTranscript> findByReceiver(String receiver);
}
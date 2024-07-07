import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Avatar from 'react-avatar';
import '../StreamingPage.css';

const fakeChatMessages = [
  { id: 1, username: 'Alice Johnson', message: 'hello everyone' },
  { id: 2, username: 'Bob', message: 'this is awesome' },
  { id: 3, username: 'charlie crown', message: 'loving the stream!' },
  { id: 4, username: 'david', message: 'Can’t wait for the next video' },
  { id: 5, username: 'eve', message: 'Great job!' },
  { id: 6, username: 'Frank', message: 'This is so relaxing' },
  { id: 7, username: 'Grace Hall', message: 'Amazing content as always' },
  { id: 8, username: 'hank green', message: 'best ASMR stream ever' },
  { id: 9, username: 'Ivy Clark', message: 'So soothing...' },
  { id: 10, username: 'Greystyle', message: 'Just what I needed' },
  { id: 11, username: 'katie', message: 'hello from the other side' },
  { id: 12, username: 'Liam Davis', message: 'Such a relaxing stream!' },
  { id: 13, username: 'Voska', message: 'perfect background noise.' },
  { id: 14, username: 'Nina Qilson', message: 'The best ASMR artist' },
  { id: 15, username: 'oscar', message: 'thanks for the stream!' },
  { id: 16, username: 'Paul Green', message: 'hello everyone' },
  { id: 17, username: 'quincy', message: 'this is amazing' },
  { id: 18, username: 'Rachel', message: 'Keep up the great work' },
  { id: 19, username: 'Young Signorino', message: 'so relaxing' },
  { id: 20, username: 'Tina Turner', message: 'loving the vibes' },
];

const StreamingPage = () => {
  const location = useLocation();
  const { artist, videoUrl } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [scrollSpeed, setScrollSpeed] = useState(1000);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomSpeed = Math.random() * (3000 - 500) + 500;
      setScrollSpeed(randomSpeed);

      setMessages((prevMessages) => {
        const nextMessage = fakeChatMessages[prevMessages.length % fakeChatMessages.length];
        return [...prevMessages, { ...nextMessage, id: Date.now() + prevMessages.length }];
      });
    }, scrollSpeed);

    return () => clearInterval(interval);
  }, [scrollSpeed]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container className="video-stream-container">
      <h1 className="text-center my-3">{artist} Live Stream</h1>
      <Row>
        <Col md={8}>
          <div className="video-player-wrapper" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div className="live-flag">LIVE</div>
            <ReactPlayer
              url={videoUrl}
              controls
              playing
              width="100%"
              height="500px"
            />
          </div>
        </Col>
        <Col md={4}>
          <div className="chat-container">
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((msg) => (
                <div key={msg.id} className="chat-message">
                  <Avatar name={msg.username} size="35" round={true} className="chat-avatar" />
                  <div>
                    <strong>{msg.username}</strong>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <Form className="chat-input-form">
              <Form.Control type="text" placeholder="Type a message..." className="chat-input" />
              <Button variant="primary" type="submit" className="chat-submit-button">
                Send
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StreamingPage;

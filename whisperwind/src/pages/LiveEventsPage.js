import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/LiveEventsPage.css';

const events = [
  {
    id: 1,
    artist: 'Gibi ASMR',
    avatar: 'https://imgix.ranker.com/user_node_img/4269/85374182/original/gibi-asmr-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300',
    date: '2023-08-12',
    time: '18:00',
    description: 'Gibi (born December 19, 1994) is a member of the ASMRtist community whose relaxing and tingle-inducing roleplays and soft spoken videos have earned her more than 800,000 subscribers. She used ASMR videos for years to relax her and put her to sleep before deciding to create an ASMR channel of her own in June of 2016. She became a big fan of cosplaying, and would earn 50,000 followers on her gibiofficial Instagram account.',
    videoUrl: '/assets/Video/Live.mp4'
  },
  {
    id: 2,
    artist: 'Jojo\'s ASMR',
    avatar: 'https://imgix.ranker.com/user_node_img/4269/85374368/original/jojo_s-asmr-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300',
    date: '2023-08-15',
    time: '20:00',
    description: 'Jonah (born July 18, 1998), better known as Jojo\'s ASMR, is an ASMR content creator on YouTube whose relaxing and tingle-inducing videos are meant to help his 320,000 subscribers fall asleep more quickly. He is often seen doing card tricks in his videos. He launched his channel in January of 2015, but did not upload a first video until Christmas day 2016. The video was called "The Best ASMR Video Ever | Instant Tingles!" He is a piano player, as seen in several videos on his ayyjonah Instagram account.',
    videoUrl: '/assets/Video/Live1.mp4'
  },
  {
    id: 3,
    artist: 'Ephemeral Rift',
    avatar: 'https://imgix.ranker.com/user_node_img/4269/85374191/original/ephemeral-rift-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300',
    date: '2023-08-20',
    time: '19:30',
    description: 'Paul (born May 17, 1971), better known as Ephemeral Rift, is an ASMRtist on YouTube who began experimenting with character driven ASMR videos after getting started with more typical sound videos featuring crinkling, typing, tapping, whispering and more. His content would be watched more than 171 million times. His first videos to surpass 2 million views each were "Sleep for the Sleepless ASMR" and "60 minutes of Woodland Ambiance (Nature Sounds Series #4) Trickling Stream & Birds Sounds."',
    videoUrl: '/assets/Video/Live2.mp4'
  },
  {
    id: 4,
    artist: 'ASMR Glow',
    avatar: 'https://imgix.ranker.com/user_node_img/4269/85374367/original/asmr-glow-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300',
    date: '2023-08-22',
    time: '17:00',
    description: 'Sharon Dubois (born March 4, 1994) is a Makeup artist and vlogger whose beauty tutorials have earned her more than 40,000 subscribers on YouTube. She is known to fans for her tutorials inspired by celebrities like Selena Gomez and Demi Lovato. She is also an ASMR artist with a YouTube channel called ASMR GLOW.',
    videoUrl: '/assets/Video/Live3.mp4'
  },
  {
    id: 5,
    artist: 'Karuna Satori',
    avatar: 'https://imgix.ranker.com/user_node_img/4269/85374211/original/karuna-satori-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300',
    date: '2023-08-25',
    time: '21:00',
    description: 'Karuna Satori (born June 25, 1991) is an ASMR YouTuber with over 270,000 subscribers to her channel. She created a secondary channel called Karuna Satori BASIC, featuring her vlogs and life stories. Her husband Victor is also an ASMR artist and runs a channel called Essence of ASMR.',
    videoUrl: '/assets/Video/Live4.mp4'
  },
  {
    id: 6,
    artist: 'Tingting ASMR',
    avatar: 'https://imgix.ranker.com/user_node_img/4269/85373999/original/tingting-asmr-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300',
    date: '2023-08-28',
    time: '18:30',
    description: 'Tingting ASMR (born December 1, 1991) is a YouTube star who is widely known for her ASMR channel. She has gained popularity there for her ASMR relaxation videos. She\'s also a Twitch streamer who goes by the username tingting57. One of her most popular YouTube videos, "[ASMR] Chinese Calligraphy and Brush Sounds," has amassed more than 300,000 views.',
    videoUrl: '/assets/Video/Live5.mp4'
  }
];

const LiveEventsPage = () => {
  const [onlineArtistId, setOnlineArtistId] = useState(events[0].id);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineArtistId(prevId => {
        const currentIndex = events.findIndex(event => event.id === prevId);
        const nextIndex = (currentIndex + 1) % events.length;
        return events[nextIndex].id;
      });
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (event) => {
    if (event.id === onlineArtistId) {
      navigate('/streaming', { state: { artist: event.artist, videoUrl: event.videoUrl } });
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="live-events-container">
      <h1 className="text-center my-3">Live Events</h1>
      <p className="text-center my-3 description">
        Check out our live events for the best ASMR experiences from top artists. Stay updated with the latest sessions and make sure to join in! Only registered users can access live events.
      </p>
      <Row>
        {events.map(event => (
          <Col lg={4} md={6} sm={12} key={event.id} className="mb-4">
            <Card className="h-100 event-card" onClick={() => handleCardClick(event)}>
              <div className="image-container">
                <Card.Img variant="top" src={event.avatar} className="event-image" />
                {event.id === onlineArtistId && (
                  <div className="online-flag">
                    <span className="live-text">LIVE</span>
                    <span className="live-dot"></span>
                  </div>
                )}
                <div className="artist-name">{event.artist}</div>
              </div>
              <Card.Body className="event-body">
                <Card.Text className="event-description">{event.description}</Card.Text>
                <div className="event-date-time">
                  <Card.Text className="event-date">
                    <strong>Date:</strong> {event.date}
                  </Card.Text>
                  <Card.Text className="event-time">
                    <strong>Time:</strong> {event.time}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Event Not Live</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This event is not live right now. Please check back later or select an artist that is currently live.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LiveEventsPage;

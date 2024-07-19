import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import { fetchTracks } from '../utils/spotifyAPI';

import relaxingWavesImage from '../assets/Cards/RelaxingWaves.webp';
import gentleRainImage from '../assets/Cards/GentleRain.webp';
import forestSoundsImage from '../assets/Cards/ForestSounds.webp';
import mountainStreamImage from '../assets/Cards/MountainStream.webp';
import birdChirpingImage from '../assets/Cards/BirdChirping.webp';
import oceanBreezeImage from '../assets/Cards/OceanBreeze.webp';
import thunderStormImage from '../assets/Cards/Thunderstorm.webp';
import nightSoundsImage from '../assets/Cards/NightSounds.webp';
import riverFlowImage from '../assets/Cards/RiverFlow.webp';
import windBlowingImage from '../assets/Cards/WindBlowing.webp';
import cracklingFireImage from '../assets/Cards/CracklingFire.webp';
import softPianoImage from '../assets/Cards/SoftPiano.webp';
import tappingImage from '../assets/Cards/Tapping.webp';
import whisperingImage from '../assets/Cards/Whispering.webp';
import brushingImage from '../assets/Cards/Brushing.webp';
import typingImage from '../assets/Cards/Typing.webp';
import mouthSoundsImage from '../assets/Cards/MouthSounds.webp';
import hairCuttingImage from '../assets/Cards/HairCutting.webp';
import '../CSS/CategoryPage.css';

const categoryImages = {
  'Relaxing Waves': relaxingWavesImage,
  'Gentle Rain': gentleRainImage,
  'Forest Sounds': forestSoundsImage,
  'Mountain Stream': mountainStreamImage,
  'Bird Chirping': birdChirpingImage,
  'Ocean Breeze': oceanBreezeImage,
  'Thunderstorm': thunderStormImage,
  'Night Sounds': nightSoundsImage,
  'River Flow': riverFlowImage,
  'Wind Blowing': windBlowingImage,
  'Crackling Fire': cracklingFireImage,
  'Soft Piano': softPianoImage,
  'Tapping': tappingImage,
  'Whispering': whisperingImage,
  'Brushing': brushingImage,
  'Typing': typingImage,
  'Mouth Sounds': mouthSoundsImage,
  'Hair Cutting': hairCuttingImage,
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      setLoading(true);
      try {
        const tracks = await fetchTracks(categoryName + ' ASMR');
        const audioFiles = tracks.map(track => ({
          title: track.title,
          imageUrl: track.imageUrl || categoryImages[categoryName],
          audioUrl: track.audioUrl,
          author: track.author,
          views: track.views,
        }));
        setItems(audioFiles);
      } catch (error) {
        console.error('Error fetching audio files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();
  }, [categoryName]);

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="category-image">
        <img src={categoryImages[categoryName]} alt={categoryName} className="demo-item-image" />
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="category-items">
          {items.map((item, index) => (
            <div key={index} className="category-item" onClick={() => handleTrackClick(item)}>
              <div className="category-item-info">
                <img src={item.imageUrl} alt={item.title} className="category-item-image" />
                <div className="category-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                  <p>{item.views} views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </div>
  );
};

export default CategoryPage;

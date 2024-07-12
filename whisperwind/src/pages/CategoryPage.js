import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
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

const authors = [
  'John Doe', 'Jane Smith', 'Emily Johnson', 'Michael Brown', 
  'Chris Davis', 'Patricia Wilson', 'Linda Martinez', 'David Clark'
];

const getRandomAuthor = () => {
  return authors[Math.floor(Math.random() * authors.length)];
};

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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const audioFiles = {
          'Relaxing Waves': Array(10).fill({ title: 'Relaxing Waves Audio', imageUrl: relaxingWavesImage, audioUrl: 'https://example.com/relaxingWavesPlaceholder.mp3', author: getRandomAuthor() }),
          'Gentle Rain': [
            { title: 'Relaxing Rain', imageUrl: 'https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2022/08/25123248/rain-fall-relaxing-crop-1661427267-1280x1280.jpg', audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/10/audio_9fc587e78d.mp3?filename=relaxing-rain-8228.mp3', author: getRandomAuthor() },
            { title: 'Rain inside a car', imageUrl: gentleRainImage, audioUrl: 'https://cdn.pixabay.com/download/audio/2022/06/19/audio_04c9de5c9f.mp3?filename=rain-inside-a-car-113602.mp3', author: getRandomAuthor() },
            { title: 'Heavy Rain', imageUrl: 'https://i.ytimg.com/vi/f1n8phCdMzc/maxresdefault.jpg', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/05/21/audio_08ef8717b4.mp3?filename=lluvia-relajante-rain-2-210937.mp3', author: getRandomAuthor() },
            { title: 'Rain and Birds', imageUrl: 'https://toughlittlebirds.com/wp-content/uploads/2014/10/rain_swallow_mike_prince.jpg', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/03/31/audio_b2b5b97701.mp3?filename=rain-birds-199340.mp3', author: getRandomAuthor() },
            { title: 'The sound of summer rain', imageUrl: 'https://media.istockphoto.com/id/691761646/photo/woman-hand-with-umbrella-in-the-rain.jpg?s=612x612&w=0&k=20&c=4w0HEfH1_OFGQA9em7sqgetg_PW7GlwjpbcSMzD7LVQ=', audioUrl: 'https://cdn.pixabay.com/download/audio/2023/03/07/audio_2d4cfcf98a.mp3?filename=rain-sounds-the-sound-of-summer-rain-141793.mp3', author: getRandomAuthor() },
            { title: 'Rain on the window', imageUrl: 'https://i.pinimg.com/originals/08/a7/fd/08a7fda8a4ce3ec83a473c218efa04f3.jpg', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/07/10/audio_55316fd3f8.mp3?filename=rain-on-the-window-114709.mp3', author: getRandomAuthor() },
            { title: 'Gentle Long Rain', imageUrl: 'https://ih1.redbubble.net/image.597275758.5192/flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/13/audio_5c983376ee.mp3?filename=rain-sounds-60226.mp3', author: getRandomAuthor() },
            { title: 'Rain on Steel Roof with Bird', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBEw_sM4jl4FktpR4AZ0MGMxGaMhRv2x8Fw&s', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/04/22/audio_35bfd488b2.mp3', author: getRandomAuthor() },
            { title: 'Light Rain Outside A Greenhouse', imageUrl: 'https://cdn.pixabay.com/audio/2024/03/01/17-32-31-652_200x200.png', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/03/01/audio_dc2cb96d5f.mp3?filename=light-rain-outside-a-greenhouse-194012.mp3', author: getRandomAuthor() },
            { title: 'Rainy In Town With Birds', imageUrl: 'https://cdn.pixabay.com/audio/2024/03/01/17-27-52-678_200x200.png', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/03/21/audio_b20bc53f05.mp3?filename=rainy-day-in-town-with-birds-singing-194011.mp3', author: getRandomAuthor() },
          ],
          'Forest Sounds': Array(10).fill({ title: 'Forest Sounds Audio', imageUrl: forestSoundsImage, audioUrl: 'https://example.com/forestSoundsPlaceholder.mp3', author: getRandomAuthor() }),
          'Mountain Stream': Array(10).fill({ title: 'Mountain Stream Audio', imageUrl: mountainStreamImage, audioUrl: 'https://example.com/mountainStreamPlaceholder.mp3', author: getRandomAuthor() }),
          'Bird Chirping': Array(10).fill({ title: 'Bird Chirping Audio', imageUrl: birdChirpingImage, audioUrl: 'https://example.com/birdChirpingPlaceholder.mp3', author: getRandomAuthor() }),
          'Ocean Breeze': Array(10).fill({ title: 'Ocean Breeze Audio', imageUrl: oceanBreezeImage, audioUrl: 'https://example.com/oceanBreezePlaceholder.mp3', author: getRandomAuthor() }),
          'Thunderstorm': Array(10).fill({ title: 'Thunderstorm Audio', imageUrl: thunderStormImage, audioUrl: 'https://example.com/thunderstormPlaceholder.mp3', author: getRandomAuthor() }),
          'Night Sounds': Array(10).fill({ title: 'Night Sounds Audio', imageUrl: nightSoundsImage, audioUrl: 'https://example.com/nightSoundsPlaceholder.mp3', author: getRandomAuthor() }),
          'River Flow': Array(10).fill({ title: 'River Flow Audio', imageUrl: riverFlowImage, audioUrl: 'https://example.com/riverFlowPlaceholder.mp3', author: getRandomAuthor() }),
          'Wind Blowing': Array(10).fill({ title: 'Wind Blowing Audio', imageUrl: windBlowingImage, audioUrl: 'https://example.com/windBlowingPlaceholder.mp3', author: getRandomAuthor() }),
          'Crackling Fire': Array(10).fill({ title: 'Crackling Fire Audio', imageUrl: cracklingFireImage, audioUrl: 'https://example.com/cracklingFirePlaceholder.mp3', author: getRandomAuthor() }),
          'Soft Piano': Array(10).fill({ title: 'Soft Piano Audio', imageUrl: softPianoImage, audioUrl: 'https://example.com/softPianoPlaceholder.mp3', author: getRandomAuthor() }),
          'Tapping': Array(10).fill({ title: 'Tapping Audio', imageUrl: tappingImage, audioUrl: 'https://example.com/tappingPlaceholder.mp3', author: getRandomAuthor() }),
          'Whispering': Array(10).fill({ title: 'Whispering Audio', imageUrl: whisperingImage, audioUrl: 'https://example.com/whisperingPlaceholder.mp3', author: getRandomAuthor() }),
          'Brushing': Array(10).fill({ title: 'Brushing Audio', imageUrl: brushingImage, audioUrl: 'https://example.com/brushingPlaceholder.mp3', author: getRandomAuthor() }),
          'Typing': Array(10).fill({ title: 'Typing Audio', imageUrl: typingImage, audioUrl: 'https://example.com/typingPlaceholder.mp3', author: getRandomAuthor() }),
          'Mouth Sounds': Array(10).fill({ title: 'Mouth Sounds Audio', imageUrl: mouthSoundsImage, audioUrl: 'https://example.com/mouthSoundsPlaceholder.mp3', author: getRandomAuthor() }),
          'Hair Cutting': Array(10).fill({ title: 'Hair Cutting Audio', imageUrl: hairCuttingImage, audioUrl: 'https://example.com/hairCuttingPlaceholder.mp3', author: getRandomAuthor() }),
        };

        setItems(audioFiles[categoryName] || []);
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
        <>
          <div className="category-items">
            {items.map((item, index) => (
              <div key={index} className="category-item" onClick={() => handleTrackClick(item)}>
                <div className="category-item-info">
                  <img src={item.imageUrl} alt={item.title} className="category-item-image" />
                  <div className="category-item-details">
                    <h3>{item.title}</h3>
                    <p>{item.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </div>
  );
};

export default CategoryPage;

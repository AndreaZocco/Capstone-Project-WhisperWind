import React from 'react';
import CategoryRow from '../components/CategoryRow';
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

const popularItems = [
  { title: 'Relaxing Waves', imageUrl: relaxingWavesImage },
  { title: 'Gentle Rain', imageUrl: gentleRainImage },
  { title: 'Forest Sounds', imageUrl: forestSoundsImage },
  { title: 'Mountain Stream', imageUrl: mountainStreamImage },
  { title: 'Bird Chirping', imageUrl: birdChirpingImage },
  { title: 'Ocean Breeze', imageUrl: oceanBreezeImage },
  { title: 'Thunderstorm', imageUrl: thunderStormImage },
  { title: 'Night Sounds', imageUrl: nightSoundsImage },
  { title: 'River Flow', imageUrl: riverFlowImage },
  { title: 'Wind Blowing', imageUrl: windBlowingImage },
];

const newArrivalItems = [
  { title: 'Relaxing Waves', imageUrl: relaxingWavesImage },
  { title: 'Gentle Rain', imageUrl: gentleRainImage },
  { title: 'Forest Sounds', imageUrl: forestSoundsImage },
  { title: 'Crackling Fire', imageUrl: cracklingFireImage },
  { title: 'Soft Piano', imageUrl: softPianoImage },
  { title: 'Tapping', imageUrl: tappingImage },
  { title: 'Whispering', imageUrl: whisperingImage },
  { title: 'Brushing', imageUrl: brushingImage },
  { title: 'Typing', imageUrl: typingImage },
  { title: 'Mouth Sounds', imageUrl: mouthSoundsImage },
  { title: 'Hair Cutting', imageUrl: hairCuttingImage },
];

const Home = () => {
  return (
    <>
      <CategoryRow title="Popular ASMR" items={popularItems} />
      <CategoryRow title="New Arrivals" items={newArrivalItems} />
    </>
  );
};

export default Home;

// src/data/projects.js
import { asset } from '../lib/utils.js';

export const projects = [
  {
    id: 'miroslav',
    className: 'miroslav',
    firstName: 'MIROSLAV',
    lastName: 'TOLOKONNIKOV',
    subtitle: 'Pure Musical Thought',
    description:
      'An attempt to reach depth through orchestral & ambient music, exploring life and its moments. Each composition is a short story, where melody, harmony, and instrumental palette create their own mood and narrative. The music communicates beyond words, drawing the listener into a unique experience.',
    tracks: [
      { cover: asset('/assets/mirtolk3.webp'), audio: asset('/assets/mirtolk3.mp3') },
      { cover: asset('/assets/mirtolk4.webp'), audio: asset('/assets/mirtolk4.mp3') },
      { cover: asset('/assets/mirtolk1.webp'), audio: asset('/assets/mirtolk1.mp3') },
      { cover: asset('/assets/mirtolk1.webp'), audio: asset('/assets/mirtolk1.mp3') },
      { cover: asset('/assets/mirtolk1.webp'), audio: asset('/assets/mirtolk1.mp3') },
      { cover: asset('/assets/mirtolk2.webp'), audio: asset('/assets/mirtolk2.mp3') },
    ],
    links: [
      { src: asset('/assets/logos/spotify.svg'), href: 'https://spotify.com', alt: 'Spotify' },
      { src: asset('/assets/logos/applemusic.svg'), href: 'https://apple.com/music', alt: 'Apple Music' },
      { src: asset('/assets/logos/yandexmusic.svg'), href: 'https://music.yandex.com', alt: 'Yandex Music' },
      { src: asset('/assets/logos/soundcloud.svg'), href: 'https://music.youtube.com', alt: 'YouTube Music' },
    ],
  },
  {
    id: 'mrslv',
    className: 'mrslv',
    firstName: 'MRSLV',
    lastName: '',
    subtitle: 'From each according to the movement, to all according to the common vibe.',
    description:
      'Pulsating techno rhythms, deep textures, and modern sound design create an immersive experience. The music is built on drive, dynamic energy, and a hypnotic atmosphere.',
    tracks: [
      { cover: asset('/assets/mrslv.webp'), audio: asset('/assets/mrslv1.mp3') },
      { cover: asset('/assets/mrslv2.webp'), audio: asset('/assets/mrslv5.mp3') },
      { cover: asset('/assets/mrslv1.webp'), audio: asset('/assets/mrslv2.mp3') },
      { cover: asset('/assets/mrslv.webp'), audio: asset('/assets/mrslv1.mp3') },
      { cover: asset('/assets/mrslv2.webp'), audio: asset('/assets/mrslv5.mp3') },
      { cover: asset('/assets/mrslv1.webp'), audio: asset('/assets/mrslv2.mp3') },
    ],
    links: [
      { src: asset('/assets/logos/spotify.svg'), href: 'https://spotify.com', alt: 'Spotify' },
      { src: asset('/assets/logos/applemusic.svg'), href: 'https://apple.com/music', alt: 'Apple Music' },
      { src: asset('/assets/logos/yandexmusic.svg'), href: 'https://music.yandex.com', alt: 'Yandex Music' },
      { src: asset('/assets/logos/soundcloud.svg'), href: 'https://music.youtube.com', alt: 'YouTube Music' },
    ],
  },
  {
    id: 'cognesthetic',
    className: 'cognesthetic',
    firstName: 'COGNESTHETIC',
    lastName: '',
    subtitle: 'Experimental, Techno & etc. Sound',
    description:
      'The project aims to approach music as a space without stylistic boundaries. Here, noise and melody, rhythm and silence intersect, creating different forms of sound. It is an exploration of sound and perception, where music becomes a means of exploration...',
    tracks: [
      { cover: asset('/assets/cogvir.jpeg'), audio: asset('/assets/cogvir.mp3') },
      { cover: asset('/assets/cogsll.jpg'), audio: asset('/assets/cogsll.wav') },
      { cover: asset('/assets/cog3.png'), audio: asset('/assets/cognesthetic_3.mp3') },
      { cover: asset('/assets/cogvir.jpeg'), audio: asset('/assets/cogvir.mp3') },
      { cover: asset('/assets/cogsll.jpg'), audio: asset('/assets/cogsll.wav') },
      { cover: asset('/assets/cog3.png'), audio: asset('/assets/cognesthetic_3.mp3') },
    ],
    links: [
      { src: asset('/assets/logos/spotify.svg'), href: 'https://spotify.com', alt: 'Spotify' },
      { src: asset('/assets/logos/applemusic.svg'), href: 'https://apple.com/music', alt: 'Apple Music' },
      { src: asset('/assets/logos/yandexmusic.svg'), href: 'https://music.yandex.com', alt: 'Yandex Music' },
      { src: asset('/assets/logos/soundcloud.svg'), href: 'https://music.youtube.com', alt: 'YouTube Music' },
    ],
  },
];

export default projects;





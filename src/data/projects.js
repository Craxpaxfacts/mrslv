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
      { cover: asset('/assets/blackswan.webp'), audio: asset('/assets/blackswan.mp3') },
      { cover: asset('/assets/keepers.webp'), audio: asset('/assets/keepers.mp3') },
      { cover: asset('/assets/illusion.webp'), audio: asset('/assets/illusion.mp3') },
      { cover: asset('/assets/synesthesia.webp'), audio: asset('/assets/synesthesia.mp3') },
      { cover: asset('/assets/sinkfade.webp'), audio: asset('/assets/sinkfade.mp3') },
      { cover: asset('/assets/blackdogs.webp'), audio: asset('/assets/blackdogs.mp3') },
      { cover: asset('/assets/waltz.webp'), audio: asset('/assets/waltz.mp3') },
      { cover: asset('/assets/genesis.webp'), audio: asset('/assets/genesis.mp3') },
    ],
    links: [
      { src: asset('/assets/logos/spotify.svg'), href: 'https://spotify.com', alt: 'Spotify' },
      { src: asset('/assets/logos/applemusic.svg'), href: 'https://apple.com/music', alt: 'Apple Music' },
      { src: asset('/assets/logos/yandexmusic.svg'), href: 'https://music.yandex.ru/artist/23257528', alt: 'Yandex Music' },
      { src: asset('/assets/logos/soundcloud.svg'), href: 'https://soundcloud.com', alt: 'Soundcloud' },
    ],
  },
  {
    id: 'mrslv',
    className: 'mrslv',
    firstName: 'MRSLV',
    lastName: '',
    subtitle: '\nFrom each according to the movement \nto all according to the common vibe',
    description:
      'Pulsating techno rhythms, deep textures, and modern sound design create an immersive experience. The music is built on drive, dynamic energy, and a hypnotic atmosphere.',
    tracks: [
      { cover: asset('/assets/architect.webp'), audio: asset('/assets/architect.mp3') },
      { cover: asset('/assets/pushthelimit.webp'), audio: asset('/assets/pushthelimit.mp3') },
      { cover: asset('/assets/offcontrol.webp'), audio: asset('/assets/offcontrol.mp3') },
      { cover: asset('/assets/architect.webp'), audio: asset('/assets/architect.mp3') },
      { cover: asset('/assets/pushthelimit.webp'), audio: asset('/assets/pushthelimit.mp3') },
      { cover: asset('/assets/offcontrol.webp'), audio: asset('/assets/offcontrol.mp3') },
    ],
    links: [
      { src: asset('/assets/logos/spotify.svg'), href: 'https://spotify.com', alt: 'Spotify' },
      { src: asset('/assets/logos/applemusic.svg'), href: 'https://apple.com/music', alt: 'Apple Music' },
      { src: asset('/assets/logos/yandexmusic.svg'), href: 'https://music.yandex.com', alt: 'Yandex Music' },
      { src: asset('/assets/logos/soundcloud.svg'), href: 'https://soundcloud.com/mrs1v', alt: 'Soundcloud' },
    ],
  },
  {
    id: 'cognesthetic',
    className: 'cognesthetic',
    firstName: 'COGNESTHETIC',
    lastName: '',
    subtitle: 'Dub Techno & Experimental',
    description:
      'The project aims to approach music as a space without stylistic boundaries. Here, noise and melody, rhythm and silence intersect, creating different forms of sound. It is an exploration of sound and perception, where music becomes a means of exploration...',
    tracks: [
      { cover: asset('/assets/brainwashing.webp'), audio: asset('/assets/brainwashing.mp3') },
      { cover: asset('/assets/virus.webp'), audio: asset('/assets/virus.mp3') },
      { cover: asset('/assets/ssl.webp'), audio: asset('/assets/ssl.mp3') },
      { cover: asset('/assets/winteragain.webp'), audio: asset('/assets/winteragain.mp3') },
      { cover: asset('/assets/brainwashing.webp'), audio: asset('/assets/brainwashing.mp3') },
      { cover: asset('/assets/virus.webp'), audio: asset('/assets/virus.mp3') },
      { cover: asset('/assets/ssl.webp'), audio: asset('/assets/ssl.mp3') },
      { cover: asset('/assets/winteragain.webp'), audio: asset('/assets/winteragain.mp3') },
    ],
    links: [
      { src: asset('/assets/logos/spotify.svg'), href: 'https://spotify.com', alt: 'Spotify' },
      { src: asset('/assets/logos/applemusic.svg'), href: 'https://apple.com/music', alt: 'Apple Music' },
      { src: asset('/assets/logos/yandexmusic.svg'), href: 'https://music.yandex.com', alt: 'Yandex Music' },
      { src: asset('/assets/logos/soundcloud.svg'), href: 'https://soundcloud.com', alt: 'Soundcloud' },
    ],
  },
];

export default projects;





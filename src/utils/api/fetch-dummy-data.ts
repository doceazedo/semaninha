const dummyTrack = {
  name: 'Dummy Song',
  image: 'https://i.imgur.com/y17yg7c.png',
  artist: {
    name: 'Unknown Artist'
  },
  duration: '123',
  '@attr': {
    rank: 0
  },
  playcount: 0
}

const trackTitles = [
  'Ferris Wheel',
  'Carousel',
  'Style',
  'Technique',
  'Step Down',
  'Step Up',
  'But Two',
  'And One',
  'Low Voltage',
  'High Voltage',
  'Part Of Them',
  'Part Of Me',
  'Paperclip',
  'Papercut',
  'One Step Further',
  'One Step Closer',
  'With Everyone',
  'With You',
  'Points Or Periods?',
  'Points Of Authority',
  'Running',
  'Crawling',
  'Walk Home',
  'Runaway',
  'By You',
  'By Myself',
  'In The Beginning',
  'In The End',
  'A Place For My Dad',
  'A Place For My Head',
  'Remembered',
  'Forgotten',
  'Cure For My Itch',
  'Cure For The Itch',
  'Pulling You Foreward',
  'Pushing Me Away',
  'Backsentence',
  'Foreword',
  'Please Stay',
  'Don\'t Stay',
  'Someplace We Belong',
  'Somewhere I Belong',
  'Sleeping With You',
  'Lying From You',
  'Hit The Wall',
  'Hit The Floor',
  'Harder To Fly',
  'Easier To Run',
  'Pass Out',
  'Faint',
  '9 Figures',
  'Figure.09',
  'Fixing The Habit',
  'Breaking The Habit',
  'From The Outside',
  'From The Inside',
  'Everybody\'s Shunning',
  'Nobody\'s Listening',
  'Time Period',
  'Session',
  'Feel',
  'Numb',
  'Low Voltage',
  'High Voltage (Remix)',
  'His October',
  'My December',
  'Separated',
  'Dedicated',
  'They\'re Comin\' Up',
  'It\'s Goin\' Down',
  'B.12',
  'A.06',
  'Day Walker',
  'Nocturnal',
  'Motionless',
  'Shifter',
];

const artists = [];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fetchDummyData = (limit: number) => {
  const track = [];
  for (let i = 0; i < limit; i++) {
    const newTrack = { ...dummyTrack };

    newTrack.name = trackTitles[Math.floor(Math.random() * trackTitles.length)];
    newTrack['@attr'].rank = i + 1;
    newTrack.playcount = i * (limit - i) * getRandomInt(10, 20);
    track.push(newTrack);
  }

  const imageUrl = `https://thispersondoesnotexist.com/image`;
  // const imageUrl = `https://avatars.dicebear.com/api/big-ears-neutral/${getRandomInt(0, 1000)}.svg`;

  return {
    user: {
      playcount: getRandomInt(1000, 10000),
      realname: 'Jay Doe',
      image: [
        { size: 'small',      '#text': imageUrl },
        { size: 'medium',     '#text': imageUrl },
        { size: 'large',      '#text': imageUrl },
        { size: 'extralarge', '#text': imageUrl },
      ],
      gender: 'n',
      name: 'jaydoe',
    },
    tracks: {
      track,
      '@attr': {
        total: limit * 123
      }
    }
  }
}

export default fetchDummyData;
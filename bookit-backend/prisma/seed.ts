import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import axios from 'axios';

const prisma = new PrismaClient();

interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
  };
}

async function fetchImage() {
  const res = await axios.get<UnsplashPhoto[]>(
    `https://api.unsplash.com/photos/random?query=vacation&orientation=portrait&count=1&client_id=${process.env.CLIENT_ID}`,
  );
  return res.data[0].urls.regular;
}

async function main() {
  const experiences = [
    { title: 'Lagos Beach Sunset', location: 'Lagos' },
    { title: 'Abuja City Tour', location: 'Abuja' },
    { title: 'Calabar Carnival Experience', location: 'Calabar' },
    { title: 'Jos Plateau Hike', location: 'Jos' },
    { title: 'Yankari Wildlife Safari', location: 'Bauchi' },
    { title: 'Lekki Art Gallery Visit', location: 'Lagos' },
    { title: 'Obudu Mountain Resort Stay', location: 'Cross River' },
    { title: 'Zuma Rock Adventure', location: 'Abuja' },
    { title: 'Port Harcourt Food Tour', location: 'Port Harcourt' },
    { title: 'Tinapa Leisure Trip', location: 'Calabar' },
  ];

  // For each experience...
  for (const exp of experiences) {
    const image = await fetchImage();

    // Create the main experience
    const newExperience = await prisma.experience.create({
      data: {
        title: exp.title,
        location: exp.location,
        description: `${exp.title} is an amazing experience in ${exp.location}.`,
        image,
        price: Math.floor(Math.random() * 200) + 50,
        tax: 0.05,
      },
    });

    console.log(`Created Experience: ${newExperience.title}`);

    // Generate 4 dates
    const dateList = [
      dayjs().add(1, 'day'),
      dayjs().add(2, 'day'),
      dayjs().add(3, 'day'),
      dayjs().add(4, 'day'),
    ];

    // Times for each date
    const times = ['09:00', '11:30', '14:00', '16:30', '19:00'];

    // For each date...
    for (const dateValue of dateList) {
      const newDate = await prisma.experienceDate.create({
        data: {
          date: dateValue.toDate(),
          experienceId: newExperience.id,
        },
      });

      // For each time...
      for (const timeValue of times) {
        const newTime = await prisma.experienceTime.create({
          data: {
            time: timeValue,
            dateId: newDate.id,
          },
        });

        // Create 5 slots per time
        for (let i = 0; i < 5; i++) {
          await prisma.experienceSlot.create({
            data: {
              capacity: 5,
              timeId: newTime.id,
            },
          });
        }
      }
    }
  }

  console.log('🌱 ALL SEEDING COMPLETED SUCCESSFULLY!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

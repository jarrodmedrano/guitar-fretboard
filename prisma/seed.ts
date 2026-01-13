import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const scales = [
  {
    name: "Major Scale",
    intervals: "1,2,3,4,5,6,7",
    notes: "C,D,E,F,G,A,B",
    category: "major",
    description: "The foundation of Western music theory",
  },
  {
    name: "Natural Minor Scale",
    intervals: "1,2,b3,4,5,b6,b7",
    notes: "A,B,C,D,E,F,G",
    category: "minor",
    description: "The relative minor of the major scale",
  },
  {
    name: "Minor Pentatonic",
    intervals: "1,b3,4,5,b7",
    notes: "A,C,D,E,G",
    category: "pentatonic",
    description: "Essential scale for rock and blues guitar",
  },
  {
    name: "Major Pentatonic",
    intervals: "1,2,3,5,6",
    notes: "C,D,E,G,A",
    category: "pentatonic",
    description: "Bright, happy sounding five-note scale",
  },
  {
    name: "Blues Scale",
    intervals: "1,b3,4,b5,5,b7",
    notes: "A,C,D,Eb,E,G",
    category: "blues",
    description: "Minor pentatonic with added blue note",
  },
  {
    name: "Dorian Mode",
    intervals: "1,2,b3,4,5,6,b7",
    notes: "D,E,F,G,A,B,C",
    category: "mode",
    description: "Minor scale with raised 6th, great for jazz",
  },
  {
    name: "Mixolydian Mode",
    intervals: "1,2,3,4,5,6,b7",
    notes: "G,A,B,C,D,E,F",
    category: "mode",
    description: "Major scale with flat 7th, perfect for dominant chords",
  },
  {
    name: "Phrygian Mode",
    intervals: "1,b2,b3,4,5,b6,b7",
    notes: "E,F,G,A,B,C,D",
    category: "mode",
    description: "Dark, Spanish-sounding mode",
  },
  {
    name: "Harmonic Minor",
    intervals: "1,2,b3,4,5,b6,7",
    notes: "A,B,C,D,E,F,G#",
    category: "minor",
    description: "Natural minor with raised 7th",
  },
  {
    name: "Melodic Minor",
    intervals: "1,2,b3,4,5,6,7",
    notes: "A,B,C,D,E,F#,G#",
    category: "minor",
    description: "Minor scale with raised 6th and 7th",
  },
];

const chords = [
  {
    name: "Major",
    intervals: "1,3,5",
    category: "major",
    description: "Basic major triad",
  },
  {
    name: "Minor",
    intervals: "1,b3,5",
    category: "minor",
    description: "Basic minor triad",
  },
  {
    name: "Dominant 7th",
    intervals: "1,3,5,b7",
    category: "seventh",
    description: "Major triad with flat 7th",
  },
  {
    name: "Major 7th",
    intervals: "1,3,5,7",
    category: "seventh",
    description: "Major triad with major 7th",
  },
  {
    name: "Minor 7th",
    intervals: "1,b3,5,b7",
    category: "seventh",
    description: "Minor triad with flat 7th",
  },
  {
    name: "Diminished",
    intervals: "1,b3,b5",
    category: "diminished",
    description: "Minor triad with flat 5th",
  },
  {
    name: "Augmented",
    intervals: "1,3,#5",
    category: "augmented",
    description: "Major triad with sharp 5th",
  },
  {
    name: "Sus2",
    intervals: "1,2,5",
    category: "suspended",
    description: "Suspended chord with 2nd instead of 3rd",
  },
  {
    name: "Sus4",
    intervals: "1,4,5",
    category: "suspended",
    description: "Suspended chord with 4th instead of 3rd",
  },
  {
    name: "Add9",
    intervals: "1,3,5,9",
    category: "extended",
    description: "Major triad with added 9th",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const scale of scales) {
    await prisma.scale.upsert({
      where: { name: scale.name },
      update: scale,
      create: scale,
    });
  }
  console.log(`Seeded ${scales.length} scales`);

  for (const chord of chords) {
    await prisma.chord.upsert({
      where: { name: chord.name },
      update: chord,
      create: chord,
    });
  }
  console.log(`Seeded ${chords.length} chords`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

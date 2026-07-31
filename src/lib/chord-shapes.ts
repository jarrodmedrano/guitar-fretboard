// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-chord-shapes.mjs
//
// Curated guitar chord voicings in the Uberchord API wire format
// (https://api.uberchord.com — strings/fingering are space-separated,
// low string first, X = muted; chordName is "root,quality,tension,bass").
// Source data: @tombatossals/chords-db (MIT, github.com/tombatossals/chords-db),
// converted from relative frets to absolute frets.

export interface UberchordVoicing {
  strings: string
  fingering: string
  tones: string
  chordName: string
}

export const CHORD_SHAPES: Record<string, UberchordVoicing[]> = {
  "C_major": [
    {
      "strings": "X 3 2 0 1 0",
      "fingering": "X 3 2 X 1 X",
      "tones": "C,E,G",
      "chordName": "C,,,"
    },
    {
      "strings": "3 3 5 5 5 3",
      "fingering": "1 1 2 3 4 1",
      "tones": "G,C,E",
      "chordName": "C,,,"
    },
    {
      "strings": "X X 5 5 5 8",
      "fingering": "X X 1 1 1 4",
      "tones": "G,C,E",
      "chordName": "C,,,"
    },
    {
      "strings": "8 10 10 9 8 8",
      "fingering": "1 3 4 2 1 1",
      "tones": "C,G,E",
      "chordName": "C,,,"
    }
  ],
  "C_minor": [
    {
      "strings": "X 3 1 0 1 3",
      "fingering": "X 3 2 X 1 4",
      "tones": "C,D#,G",
      "chordName": "C,m,,"
    },
    {
      "strings": "3 3 5 5 4 3",
      "fingering": "1 1 3 4 2 1",
      "tones": "G,C,D#",
      "chordName": "C,m,,"
    },
    {
      "strings": "8 6 5 5 X X",
      "fingering": "4 2 1 1 X X",
      "tones": "C,D#,G",
      "chordName": "C,m,,"
    },
    {
      "strings": "8 10 10 8 8 8",
      "fingering": "1 3 4 1 1 1",
      "tones": "C,G,D#",
      "chordName": "C,m,,"
    }
  ],
  "C_dim": [
    {
      "strings": "X 3 1 X 1 2",
      "fingering": "X 4 1 X 2 3",
      "tones": "C,D#,F#",
      "chordName": "C,dim,,"
    },
    {
      "strings": "X 3 4 5 4 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "C,F#,D#",
      "chordName": "C,dim,,"
    },
    {
      "strings": "8 6 X 8 7 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "C,D#,F#",
      "chordName": "C,dim,,"
    },
    {
      "strings": "X X 10 11 X 11",
      "fingering": "X X 1 2 X 3",
      "tones": "C,F#,D#",
      "chordName": "C,dim,,"
    }
  ],
  "C_aug": [
    {
      "strings": "X 3 2 1 1 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "C,E,G#",
      "chordName": "C,aug,,"
    },
    {
      "strings": "X 3 6 5 5 X",
      "fingering": "X 1 4 2 3 X",
      "tones": "C,G#,E",
      "chordName": "C,aug,,"
    },
    {
      "strings": "8 7 6 5 5 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "C,E,G#",
      "chordName": "C,aug,,"
    },
    {
      "strings": "X X 10 9 9 8",
      "fingering": "X X 4 2 3 1",
      "tones": "C,E,G#",
      "chordName": "C,aug,,"
    }
  ],
  "C_sus2": [
    {
      "strings": "X 3 0 0 1 3",
      "fingering": "X 3 X X 1 4",
      "tones": "C,D,G",
      "chordName": "C,sus,2,"
    },
    {
      "strings": "X 3 0 0 3 3",
      "fingering": "X 1 X X 2 3",
      "tones": "C,D,G",
      "chordName": "C,sus,2,"
    },
    {
      "strings": "3 3 5 5 3 3",
      "fingering": "1 1 3 4 1 1",
      "tones": "G,C,D",
      "chordName": "C,sus,2,"
    },
    {
      "strings": "8 X 0 7 8 8",
      "fingering": "2 X X 1 3 4",
      "tones": "C,D,G",
      "chordName": "C,sus,2,"
    }
  ],
  "C_sus4": [
    {
      "strings": "X 3 3 0 1 1",
      "fingering": "X 3 4 X 1 1",
      "tones": "C,F,G",
      "chordName": "C,sus,4,"
    },
    {
      "strings": "3 3 5 5 6 3",
      "fingering": "1 1 2 3 4 1",
      "tones": "G,C,F",
      "chordName": "C,sus,4,"
    },
    {
      "strings": "8 8 X 0 6 8",
      "fingering": "2 3 X X 1 4",
      "tones": "C,F,G",
      "chordName": "C,sus,4,"
    },
    {
      "strings": "8 10 10 10 8 8",
      "fingering": "1 2 3 4 1 1",
      "tones": "C,G,F",
      "chordName": "C,sus,4,"
    }
  ],
  "C_7": [
    {
      "strings": "X 3 2 3 1 0",
      "fingering": "X 3 2 4 1 X",
      "tones": "C,E,A#",
      "chordName": "C,,7,"
    },
    {
      "strings": "3 3 5 3 5 3",
      "fingering": "1 1 3 1 4 1",
      "tones": "G,C,A#,E",
      "chordName": "C,,7,"
    },
    {
      "strings": "X X 5 5 5 6",
      "fingering": "X X 1 1 1 2",
      "tones": "G,C,E,A#",
      "chordName": "C,,7,"
    },
    {
      "strings": "8 10 8 9 8 8",
      "fingering": "1 3 1 2 1 1",
      "tones": "C,G,A#,E",
      "chordName": "C,,7,"
    }
  ],
  "C_maj7": [
    {
      "strings": "3 3 2 0 0 0",
      "fingering": "2 3 1 X X X",
      "tones": "G,C,E,B",
      "chordName": "C,maj,7,"
    },
    {
      "strings": "3 3 5 4 5 3",
      "fingering": "1 1 3 2 4 1",
      "tones": "G,C,B,E",
      "chordName": "C,maj,7,"
    },
    {
      "strings": "X X 5 5 5 7",
      "fingering": "X X 1 1 1 4",
      "tones": "G,C,E,B",
      "chordName": "C,maj,7,"
    },
    {
      "strings": "X X 10 12 12 12",
      "fingering": "X X 1 3 3 3",
      "tones": "C,G,B,E",
      "chordName": "C,maj,7,"
    }
  ],
  "C_m7": [
    {
      "strings": "X 3 1 3 4 X",
      "fingering": "X 2 1 3 4 X",
      "tones": "C,D#,A#",
      "chordName": "C,m,7,"
    },
    {
      "strings": "3 3 5 3 4 3",
      "fingering": "1 1 3 1 2 1",
      "tones": "G,C,A#,D#",
      "chordName": "C,m,7,"
    },
    {
      "strings": "X X 5 5 4 6",
      "fingering": "X X 2 3 1 4",
      "tones": "G,C,D#,A#",
      "chordName": "C,m,7,"
    },
    {
      "strings": "8 10 8 8 8 8",
      "fingering": "1 3 1 1 1 1",
      "tones": "C,G,A#,D#",
      "chordName": "C,m,7,"
    }
  ],
  "C_m7b5": [
    {
      "strings": "X 3 4 3 4 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "C,F#,A#,D#",
      "chordName": "C,m,7b5,"
    },
    {
      "strings": "X X 4 5 4 6",
      "fingering": "X X 1 2 1 4",
      "tones": "F#,C,D#,A#",
      "chordName": "C,m,7b5,"
    },
    {
      "strings": "8 9 10 8 11 8",
      "fingering": "1 2 3 1 4 1",
      "tones": "C,F#,D#,A#",
      "chordName": "C,m,7b5,"
    },
    {
      "strings": "X X 10 11 11 11",
      "fingering": "X X 1 3 3 3",
      "tones": "C,F#,A#,D#",
      "chordName": "C,m,7b5,"
    }
  ],
  "C_dim7": [
    {
      "strings": "X X 1 2 1 2",
      "fingering": "X X 1 3 2 4",
      "tones": "D#,A,C,F#",
      "chordName": "C,dim,7,"
    },
    {
      "strings": "X 3 4 2 4 2",
      "fingering": "X 2 3 1 4 1",
      "tones": "C,F#,A,D#",
      "chordName": "C,dim,7,"
    },
    {
      "strings": "8 X 7 8 7 X",
      "fingering": "2 X 1 3 1 X",
      "tones": "C,A,D#,F#",
      "chordName": "C,dim,7,"
    },
    {
      "strings": "X X 10 11 10 11",
      "fingering": "X X 1 3 1 4",
      "tones": "C,F#,A,D#",
      "chordName": "C,dim,7,"
    }
  ],
  "C_6": [
    {
      "strings": "X 3 2 2 1 0",
      "fingering": "X 4 2 3 1 X",
      "tones": "C,E,A",
      "chordName": "C,,6,"
    },
    {
      "strings": "X 3 5 5 5 5",
      "fingering": "X 1 3 3 3 4",
      "tones": "C,G,E,A",
      "chordName": "C,,6,"
    },
    {
      "strings": "8 X 7 9 8 X",
      "fingering": "2 X 1 4 3 X",
      "tones": "C,A,E,G",
      "chordName": "C,,6,"
    },
    {
      "strings": "8 X 10 9 10 8",
      "fingering": "1 X 3 2 4 1",
      "tones": "C,E,A",
      "chordName": "C,,6,"
    }
  ],
  "C_m6": [
    {
      "strings": "X 3 1 2 1 3",
      "fingering": "X 3 1 2 1 4",
      "tones": "C,D#,A,G",
      "chordName": "C,m,6,"
    },
    {
      "strings": "X 3 5 X 4 5",
      "fingering": "X 1 3 X 2 4",
      "tones": "C,G,D#,A",
      "chordName": "C,m,6,"
    },
    {
      "strings": "8 X 7 8 8 8",
      "fingering": "2 X 1 3 3 4",
      "tones": "C,A,D#,G",
      "chordName": "C,m,6,"
    },
    {
      "strings": "8 10 10 8 10 8",
      "fingering": "1 2 3 1 4 1",
      "tones": "C,G,D#,A",
      "chordName": "C,m,6,"
    }
  ],
  "C_add9": [
    {
      "strings": "X 3 2 0 3 0",
      "fingering": "X 2 1 X 3 X",
      "tones": "C,E,G,D",
      "chordName": "C,,add9,"
    },
    {
      "strings": "X 3 0 0 3 0",
      "fingering": "X 1 X X 3 X",
      "tones": "C,D,G,E",
      "chordName": "C,,add9,"
    },
    {
      "strings": "8 7 0 0 8 0",
      "fingering": "2 1 X X 3 X",
      "tones": "C,E,D,G",
      "chordName": "C,,add9,"
    },
    {
      "strings": "X X 10 9 8 10",
      "fingering": "X X 3 2 1 4",
      "tones": "C,E,G,D",
      "chordName": "C,,add9,"
    }
  ],
  "C_9": [
    {
      "strings": "3 3 2 3 3 3",
      "fingering": "2 2 1 3 3 4",
      "tones": "G,C,E,A#,D",
      "chordName": "C,,9,"
    },
    {
      "strings": "8 7 8 7 8 8",
      "fingering": "2 1 3 1 4 4",
      "tones": "C,E,A#,D,G",
      "chordName": "C,,9,"
    },
    {
      "strings": "X X 10 9 11 10",
      "fingering": "X X 2 1 4 3",
      "tones": "C,E,A#,D",
      "chordName": "C,,9,"
    }
  ],
  "C#_major": [
    {
      "strings": "X 4 3 1 2 1",
      "fingering": "X 4 3 1 2 1",
      "tones": "C#,F,G#",
      "chordName": "C#,,,"
    },
    {
      "strings": "4 4 6 6 6 4",
      "fingering": "1 1 2 3 4 1",
      "tones": "G#,C#,F",
      "chordName": "C#,,,"
    },
    {
      "strings": "9 8 6 6 6 9",
      "fingering": "3 2 1 1 1 4",
      "tones": "C#,F,G#",
      "chordName": "C#,,,"
    },
    {
      "strings": "9 11 11 10 9 9",
      "fingering": "1 3 4 2 1 1",
      "tones": "C#,G#,F",
      "chordName": "C#,,,"
    }
  ],
  "C#_minor": [
    {
      "strings": "X 4 2 1 2 X",
      "fingering": "X 4 2 1 3 X",
      "tones": "C#,E,G#",
      "chordName": "C#,m,,"
    },
    {
      "strings": "4 4 6 6 5 4",
      "fingering": "1 1 3 4 2 1",
      "tones": "G#,C#,E",
      "chordName": "C#,m,,"
    },
    {
      "strings": "9 7 6 6 X 9",
      "fingering": "3 2 1 1 X 4",
      "tones": "C#,E,G#",
      "chordName": "C#,m,,"
    },
    {
      "strings": "9 11 11 9 9 9",
      "fingering": "1 3 4 1 1 1",
      "tones": "C#,G#,E",
      "chordName": "C#,m,,"
    }
  ],
  "C#_dim": [
    {
      "strings": "X 4 2 X 2 3",
      "fingering": "X 4 1 X 2 3",
      "tones": "C#,E,G",
      "chordName": "C#,dim,,"
    },
    {
      "strings": "X 4 5 6 5 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "C#,G,E",
      "chordName": "C#,dim,,"
    },
    {
      "strings": "9 7 X 9 8 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "C#,E,G",
      "chordName": "C#,dim,,"
    },
    {
      "strings": "X X 11 12 X 12",
      "fingering": "X X 1 2 X 3",
      "tones": "C#,G,E",
      "chordName": "C#,dim,,"
    }
  ],
  "C#_aug": [
    {
      "strings": "9 8 7 6 6 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "C#,F,A",
      "chordName": "C#,aug,,"
    },
    {
      "strings": "9 X 11 10 10 9",
      "fingering": "1 X 4 2 3 1",
      "tones": "C#,F,A",
      "chordName": "C#,aug,,"
    }
  ],
  "C#_sus2": [
    {
      "strings": "4 4 6 6 4 4",
      "fingering": "1 1 3 4 1 1",
      "tones": "G#,C#,D#",
      "chordName": "C#,sus,2,"
    },
    {
      "strings": "9 6 6 8 9 X",
      "fingering": "X 1 X X 2 X",
      "tones": "C#,D#,G#",
      "chordName": "C#,sus,2,"
    },
    {
      "strings": "9 11 11 X 9 11",
      "fingering": "1 2 3 X 1 4",
      "tones": "C#,G#,D#",
      "chordName": "C#,sus,2,"
    },
    {
      "strings": "11 11 11 13 14 11",
      "fingering": "1 1 1 3 4 1",
      "tones": "D#,G#,C#",
      "chordName": "C#,sus,2,"
    }
  ],
  "C#_sus4": [
    {
      "strings": "X 4 4 1 2 X",
      "fingering": "X 3 4 1 2 X",
      "tones": "C#,F#,G#",
      "chordName": "C#,sus,4,"
    },
    {
      "strings": "4 4 6 6 7 4",
      "fingering": "1 1 2 3 4 1",
      "tones": "G#,C#,F#",
      "chordName": "C#,sus,4,"
    },
    {
      "strings": "9 X 6 6 7 9",
      "fingering": "2 X X X 1 4",
      "tones": "C#,G#,F#",
      "chordName": "C#,sus,4,"
    },
    {
      "strings": "9 11 11 11 9 9",
      "fingering": "1 2 3 4 1 1",
      "tones": "C#,G#,F#",
      "chordName": "C#,sus,4,"
    }
  ],
  "C#_7": [
    {
      "strings": "X 4 3 4 2 X",
      "fingering": "X 3 2 4 1 X",
      "tones": "C#,F,B",
      "chordName": "C#,,7,"
    },
    {
      "strings": "X 4 6 4 6 4",
      "fingering": "X 1 3 1 4 1",
      "tones": "C#,G#,B,F",
      "chordName": "C#,,7,"
    },
    {
      "strings": "9 8 6 6 6 7",
      "fingering": "4 3 1 1 1 2",
      "tones": "C#,F,G#,B",
      "chordName": "C#,,7,"
    },
    {
      "strings": "9 11 9 10 9 9",
      "fingering": "1 3 1 2 1 1",
      "tones": "C#,G#,B,F",
      "chordName": "C#,,7,"
    }
  ],
  "C#_maj7": [
    {
      "strings": "X 4 3 1 1 1",
      "fingering": "X 4 3 1 1 1",
      "tones": "C#,F,G#,C",
      "chordName": "C#,maj,7,"
    },
    {
      "strings": "4 4 6 5 6 4",
      "fingering": "1 1 3 2 4 1",
      "tones": "G#,C#,C,F",
      "chordName": "C#,maj,7,"
    },
    {
      "strings": "X X X 6 6 8",
      "fingering": "X X X 1 1 3",
      "tones": "C#,F,C",
      "chordName": "C#,maj,7,"
    },
    {
      "strings": "9 X 10 10 9 X",
      "fingering": "1 X 3 4 2 X",
      "tones": "C#,C,F,G#",
      "chordName": "C#,maj,7,"
    }
  ],
  "C#_m7": [
    {
      "strings": "X 4 6 4 5 4",
      "fingering": "X 1 3 1 2 1",
      "tones": "C#,G#,B,E",
      "chordName": "C#,m,7,"
    },
    {
      "strings": "X X 6 6 5 7",
      "fingering": "X X 2 3 1 4",
      "tones": "G#,C#,E,B",
      "chordName": "C#,m,7,"
    },
    {
      "strings": "9 11 9 9 9 9",
      "fingering": "1 4 1 1 1 1",
      "tones": "C#,G#,B,E",
      "chordName": "C#,m,7,"
    },
    {
      "strings": "X X 11 13 12 12",
      "fingering": "X X 1 4 2 3",
      "tones": "C#,G#,B,E",
      "chordName": "C#,m,7,"
    }
  ],
  "C#_m7b5": [
    {
      "strings": "X 4 5 4 5 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "C#,G,B,E",
      "chordName": "C#,m,7b5,"
    },
    {
      "strings": "X X 5 6 5 7",
      "fingering": "X X 1 2 1 4",
      "tones": "G,C#,E,B",
      "chordName": "C#,m,7b5,"
    },
    {
      "strings": "9 X 9 9 8 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "C#,B,E,G",
      "chordName": "C#,m,7b5,"
    },
    {
      "strings": "X X 11 12 12 12",
      "fingering": "X X 1 2 2 2",
      "tones": "C#,G,B,E",
      "chordName": "C#,m,7b5,"
    }
  ],
  "C#_dim7": [
    {
      "strings": "X X 2 3 2 3",
      "fingering": "X X 1 3 2 4",
      "tones": "E,A#,C#,G",
      "chordName": "C#,dim,7,"
    },
    {
      "strings": "X 4 5 3 5 3",
      "fingering": "X 2 3 1 4 1",
      "tones": "C#,G,A#,E",
      "chordName": "C#,dim,7,"
    },
    {
      "strings": "9 X 8 9 8 X",
      "fingering": "2 X 1 3 1 X",
      "tones": "C#,A#,E,G",
      "chordName": "C#,dim,7,"
    },
    {
      "strings": "X X 11 12 11 12",
      "fingering": "X X 1 3 2 4",
      "tones": "C#,G,A#,E",
      "chordName": "C#,dim,7,"
    }
  ],
  "C#_6": [
    {
      "strings": "X 4 3 3 2 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "C#,F,A#",
      "chordName": "C#,,6,"
    },
    {
      "strings": "X 4 6 6 6 6",
      "fingering": "X 1 3 3 3 3",
      "tones": "C#,G#,F,A#",
      "chordName": "C#,,6,"
    },
    {
      "strings": "9 8 8 6 6 6",
      "fingering": "4 2 3 1 1 1",
      "tones": "C#,F,A#",
      "chordName": "C#,,6,"
    },
    {
      "strings": "9 X 11 10 11 9",
      "fingering": "1 X 3 2 4 1",
      "tones": "C#,F,A#",
      "chordName": "C#,,6,"
    }
  ],
  "C#_m6": [
    {
      "strings": "X 4 2 3 2 4",
      "fingering": "X 3 1 2 1 4",
      "tones": "C#,E,A#,G#",
      "chordName": "C#,m,6,"
    },
    {
      "strings": "X X 6 6 5 6",
      "fingering": "X X 2 3 1 4",
      "tones": "G#,C#,E,A#",
      "chordName": "C#,m,6,"
    },
    {
      "strings": "9 X 8 9 9 X",
      "fingering": "2 X 1 3 4 X",
      "tones": "C#,A#,E,G#",
      "chordName": "C#,m,6,"
    },
    {
      "strings": "9 11 11 9 11 9",
      "fingering": "1 2 3 1 4 1",
      "tones": "C#,G#,E,A#",
      "chordName": "C#,m,6,"
    }
  ],
  "C#_add9": [
    {
      "strings": "X 4 3 1 4 1",
      "fingering": "X 3 2 1 4 1",
      "tones": "C#,F,G#,D#",
      "chordName": "C#,,add9,"
    },
    {
      "strings": "X 4 3 X 4 4",
      "fingering": "X 2 1 X 3 4",
      "tones": "C#,F,D#,G#",
      "chordName": "C#,,add9,"
    },
    {
      "strings": "9 8 X 8 9 X",
      "fingering": "3 1 X 2 4 X",
      "tones": "C#,F,D#,G#",
      "chordName": "C#,,add9,"
    },
    {
      "strings": "X X 11 10 9 11",
      "fingering": "X X 3 2 1 4",
      "tones": "C#,F,G#,D#",
      "chordName": "C#,,add9,"
    }
  ],
  "C#_9": [
    {
      "strings": "4 4 3 4 4 4",
      "fingering": "2 2 1 3 3 4",
      "tones": "G#,C#,F,B,D#",
      "chordName": "C#,,9,"
    },
    {
      "strings": "9 8 9 8 X X",
      "fingering": "3 1 4 2 X X",
      "tones": "C#,F,B,D#",
      "chordName": "C#,,9,"
    },
    {
      "strings": "9 11 9 10 9 11",
      "fingering": "1 3 1 2 1 4",
      "tones": "C#,G#,B,F,D#",
      "chordName": "C#,,9,"
    },
    {
      "strings": "X X 11 10 12 11",
      "fingering": "X X 2 1 4 3",
      "tones": "C#,F,B,D#",
      "chordName": "C#,,9,"
    }
  ],
  "D_major": [
    {
      "strings": "X X 0 2 3 2",
      "fingering": "X X X 1 3 2",
      "tones": "D,A,F#",
      "chordName": "D,,,"
    },
    {
      "strings": "2 5 4 2 3 2",
      "fingering": "1 4 3 1 2 1",
      "tones": "F#,D,A",
      "chordName": "D,,,"
    },
    {
      "strings": "5 5 7 7 7 5",
      "fingering": "1 1 2 3 4 1",
      "tones": "A,D,F#",
      "chordName": "D,,,"
    },
    {
      "strings": "10 12 12 11 10 10",
      "fingering": "1 3 4 2 1 1",
      "tones": "D,A,F#",
      "chordName": "D,,,"
    }
  ],
  "D_minor": [
    {
      "strings": "X X 0 2 3 1",
      "fingering": "X X X 2 3 1",
      "tones": "D,A,F",
      "chordName": "D,m,,"
    },
    {
      "strings": "5 5 7 7 6 5",
      "fingering": "1 1 3 4 2 1",
      "tones": "A,D,F",
      "chordName": "D,m,,"
    },
    {
      "strings": "X 8 7 7 6 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "F,A,D",
      "chordName": "D,m,,"
    },
    {
      "strings": "10 12 12 10 10 10",
      "fingering": "1 3 4 1 1 1",
      "tones": "D,A,F",
      "chordName": "D,m,,"
    }
  ],
  "D_dim": [
    {
      "strings": "X X 0 1 X 1",
      "fingering": "X X X 1 X 2",
      "tones": "D,G#,F",
      "chordName": "D,dim,,"
    },
    {
      "strings": "X 5 3 X 3 4",
      "fingering": "X 4 1 X 2 3",
      "tones": "D,F,G#",
      "chordName": "D,dim,,"
    },
    {
      "strings": "X 5 6 7 6 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "D,G#,F",
      "chordName": "D,dim,,"
    },
    {
      "strings": "10 8 X 10 9 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "D,F,G#",
      "chordName": "D,dim,,"
    }
  ],
  "D_aug": [
    {
      "strings": "X X 0 3 3 2",
      "fingering": "X X X 2 3 1",
      "tones": "D,A#,F#",
      "chordName": "D,aug,,"
    },
    {
      "strings": "X 5 4 3 3 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "D,F#,A#",
      "chordName": "D,aug,,"
    },
    {
      "strings": "10 9 8 7 7 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "D,F#,A#",
      "chordName": "D,aug,,"
    },
    {
      "strings": "10 X 12 11 11 X",
      "fingering": "1 X 4 2 3 X",
      "tones": "D,F#,A#",
      "chordName": "D,aug,,"
    }
  ],
  "D_sus2": [
    {
      "strings": "X X 0 2 3 0",
      "fingering": "X X X 2 3 X",
      "tones": "D,A,E",
      "chordName": "D,sus,2,"
    },
    {
      "strings": "X X 2 2 3 5",
      "fingering": "X X 1 1 2 4",
      "tones": "E,A,D",
      "chordName": "D,sus,2,"
    },
    {
      "strings": "5 5 7 7 5 5",
      "fingering": "1 1 3 4 1 1",
      "tones": "A,D,E",
      "chordName": "D,sus,2,"
    },
    {
      "strings": "X 7 7 7 10 10",
      "fingering": "X 1 1 1 4 4",
      "tones": "E,A,D",
      "chordName": "D,sus,2,"
    }
  ],
  "D_sus4": [
    {
      "strings": "X X 0 2 3 3",
      "fingering": "X X X 1 2 3",
      "tones": "D,A,G",
      "chordName": "D,sus,4,"
    },
    {
      "strings": "X 5 0 0 3 5",
      "fingering": "X 3 X X 1 4",
      "tones": "D,G,A",
      "chordName": "D,sus,4,"
    },
    {
      "strings": "5 5 7 7 8 5",
      "fingering": "1 1 2 3 4 1",
      "tones": "A,D,G",
      "chordName": "D,sus,4,"
    },
    {
      "strings": "10 12 12 12 10 10",
      "fingering": "1 2 3 4 1 1",
      "tones": "D,A,G",
      "chordName": "D,sus,4,"
    }
  ],
  "D_7": [
    {
      "strings": "X X 0 2 1 2",
      "fingering": "X X X 2 1 3",
      "tones": "D,A,C,F#",
      "chordName": "D,,7,"
    },
    {
      "strings": "X 5 4 5 3 X",
      "fingering": "X 3 2 4 1 X",
      "tones": "D,F#,C",
      "chordName": "D,,7,"
    },
    {
      "strings": "5 5 7 5 7 5",
      "fingering": "1 1 3 1 4 1",
      "tones": "A,D,C,F#",
      "chordName": "D,,7,"
    },
    {
      "strings": "10 12 10 11 10 10",
      "fingering": "1 3 1 2 1 1",
      "tones": "D,A,C,F#",
      "chordName": "D,,7,"
    }
  ],
  "D_maj7": [
    {
      "strings": "X X 0 2 2 2",
      "fingering": "X X X 1 1 1",
      "tones": "D,A,C#,F#",
      "chordName": "D,maj,7,"
    },
    {
      "strings": "X 5 4 2 2 2",
      "fingering": "X 4 3 1 1 1",
      "tones": "D,F#,A,C#",
      "chordName": "D,maj,7,"
    },
    {
      "strings": "5 5 7 6 7 5",
      "fingering": "1 1 3 2 4 1",
      "tones": "A,D,C#,F#",
      "chordName": "D,maj,7,"
    },
    {
      "strings": "X X 7 7 7 9",
      "fingering": "X X 1 1 1 4",
      "tones": "A,D,F#,C#",
      "chordName": "D,maj,7,"
    }
  ],
  "D_m7": [
    {
      "strings": "X X 0 2 1 1",
      "fingering": "X X X 3 1 2",
      "tones": "D,A,C,F",
      "chordName": "D,m,7,"
    },
    {
      "strings": "5 5 7 5 6 5",
      "fingering": "1 1 3 1 2 1",
      "tones": "A,D,C,F",
      "chordName": "D,m,7,"
    },
    {
      "strings": "X X 7 7 6 8",
      "fingering": "X X 2 3 1 4",
      "tones": "A,D,F,C",
      "chordName": "D,m,7,"
    },
    {
      "strings": "10 12 10 10 10 10",
      "fingering": "1 3 1 1 1 1",
      "tones": "D,A,C,F",
      "chordName": "D,m,7,"
    }
  ],
  "D_m7b5": [
    {
      "strings": "X X 0 1 1 1",
      "fingering": "X X X 1 1 1",
      "tones": "D,G#,C,F",
      "chordName": "D,m,7b5,"
    },
    {
      "strings": "X 5 3 5 3 4",
      "fingering": "X 3 1 4 1 2",
      "tones": "D,F,C,G#",
      "chordName": "D,m,7b5,"
    },
    {
      "strings": "X 5 6 5 6 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "D,G#,C,F",
      "chordName": "D,m,7b5,"
    },
    {
      "strings": "X 8 0 10 9 8",
      "fingering": "X 1 X 4 3 2",
      "tones": "F,D,G#,C",
      "chordName": "D,m,7b5,"
    }
  ],
  "D_dim7": [
    {
      "strings": "X X 0 1 0 1",
      "fingering": "X X X 2 X 3",
      "tones": "D,G#,B,F",
      "chordName": "D,dim,7,"
    },
    {
      "strings": "X 5 6 4 6 4",
      "fingering": "X 2 3 1 4 1",
      "tones": "D,G#,B,F",
      "chordName": "D,dim,7,"
    },
    {
      "strings": "X 8 0 10 9 7",
      "fingering": "X 2 X 4 3 1",
      "tones": "F,D,G#,B",
      "chordName": "D,dim,7,"
    },
    {
      "strings": "10 11 12 10 12 10",
      "fingering": "1 2 3 1 4 1",
      "tones": "D,G#,F,B",
      "chordName": "D,dim,7,"
    }
  ],
  "D_6": [
    {
      "strings": "X X 0 2 0 2",
      "fingering": "X X X 2 X 3",
      "tones": "D,A,B,F#",
      "chordName": "D,,6,"
    },
    {
      "strings": "X 5 4 4 3 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "D,F#,B",
      "chordName": "D,,6,"
    },
    {
      "strings": "X 5 7 7 7 7",
      "fingering": "X 1 3 3 3 4",
      "tones": "D,A,F#,B",
      "chordName": "D,,6,"
    },
    {
      "strings": "7 9 7 7 10 7",
      "fingering": "1 3 1 1 4 1",
      "tones": "B,F#,A,D",
      "chordName": "D,,6,"
    }
  ],
  "D_m6": [
    {
      "strings": "X X 0 2 0 1",
      "fingering": "X X X 2 X 1",
      "tones": "D,A,B,F",
      "chordName": "D,m,6,"
    },
    {
      "strings": "X 5 3 4 3 5",
      "fingering": "X 3 1 2 1 4",
      "tones": "D,F,B,A",
      "chordName": "D,m,6,"
    },
    {
      "strings": "X 5 7 X 6 7",
      "fingering": "X 1 3 X 2 4",
      "tones": "D,A,F,B",
      "chordName": "D,m,6,"
    },
    {
      "strings": "10 X 9 10 10 10",
      "fingering": "2 X 1 3 3 3",
      "tones": "D,B,F,A",
      "chordName": "D,m,6,"
    }
  ],
  "D_add9": [
    {
      "strings": "X 5 4 2 5 2",
      "fingering": "X 3 2 1 4 1",
      "tones": "D,F#,A,E",
      "chordName": "D,,add9,"
    },
    {
      "strings": "X 5 7 7 7 0",
      "fingering": "X 1 2 3 4 X",
      "tones": "D,A,F#,E",
      "chordName": "D,,add9,"
    },
    {
      "strings": "X X 0 9 7 10",
      "fingering": "X X X 3 1 4",
      "tones": "D,E,F#",
      "chordName": "D,,add9,"
    },
    {
      "strings": "X X 12 11 10 12",
      "fingering": "X X 3 2 1 4",
      "tones": "D,F#,A,E",
      "chordName": "D,,add9,"
    }
  ],
  "D_9": [
    {
      "strings": "5 5 4 5 5 5",
      "fingering": "2 2 1 3 3 4",
      "tones": "A,D,F#,C,E",
      "chordName": "D,,9,"
    },
    {
      "strings": "X 7 0 7 7 8",
      "fingering": "X 1 X 2 3 4",
      "tones": "E,D,F#,C",
      "chordName": "D,,9,"
    },
    {
      "strings": "10 9 10 9 10 X",
      "fingering": "2 1 3 1 4 X",
      "tones": "D,F#,C,E,A",
      "chordName": "D,,9,"
    },
    {
      "strings": "10 12 10 11 10 12",
      "fingering": "1 3 1 2 1 4",
      "tones": "D,A,C,F#,E",
      "chordName": "D,,9,"
    }
  ],
  "D#_major": [
    {
      "strings": "X X 1 3 4 3",
      "fingering": "X X 1 2 4 3",
      "tones": "D#,A#,G",
      "chordName": "D#,,,"
    },
    {
      "strings": "X 6 5 3 4 3",
      "fingering": "X 4 3 1 2 1",
      "tones": "D#,G,A#",
      "chordName": "D#,,,"
    },
    {
      "strings": "X 6 8 8 8 6",
      "fingering": "X 1 2 3 4 1",
      "tones": "D#,A#,G",
      "chordName": "D#,,,"
    },
    {
      "strings": "X X 8 8 8 11",
      "fingering": "X X 1 1 1 4",
      "tones": "A#,D#,G",
      "chordName": "D#,,,"
    }
  ],
  "D#_minor": [
    {
      "strings": "X X 1 3 4 2",
      "fingering": "X X 1 3 4 2",
      "tones": "D#,A#,F#",
      "chordName": "D#,m,,"
    },
    {
      "strings": "X X 4 3 4 2",
      "fingering": "X X 3 2 4 1",
      "tones": "F#,A#,D#",
      "chordName": "D#,m,,"
    },
    {
      "strings": "6 6 8 8 7 6",
      "fingering": "1 1 3 4 2 1",
      "tones": "A#,D#,F#",
      "chordName": "D#,m,,"
    },
    {
      "strings": "11 13 13 11 11 11",
      "fingering": "1 3 4 1 1 1",
      "tones": "D#,A#,F#",
      "chordName": "D#,m,,"
    }
  ],
  "D#_dim": [
    {
      "strings": "X X 1 2 X 2",
      "fingering": "X X 1 2 X 3",
      "tones": "D#,A,F#",
      "chordName": "D#,dim,,"
    },
    {
      "strings": "X 6 4 X 4 5",
      "fingering": "X 4 1 X 2 3",
      "tones": "D#,F#,A",
      "chordName": "D#,dim,,"
    },
    {
      "strings": "X 6 7 8 7 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "D#,A,F#",
      "chordName": "D#,dim,,"
    },
    {
      "strings": "11 9 X 11 10 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "D#,F#,A",
      "chordName": "D#,dim,,"
    }
  ],
  "D#_aug": [
    {
      "strings": "X X 5 4 4 3",
      "fingering": "X X 4 2 3 1",
      "tones": "G,B,D#",
      "chordName": "D#,aug,,"
    },
    {
      "strings": "X 6 5 4 4 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "D#,G,B",
      "chordName": "D#,aug,,"
    },
    {
      "strings": "11 10 9 8 8 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "D#,G,B",
      "chordName": "D#,aug,,"
    },
    {
      "strings": "11 X 13 12 12 X",
      "fingering": "1 X 4 2 3 X",
      "tones": "D#,G,B",
      "chordName": "D#,aug,,"
    }
  ],
  "D#_sus2": [
    {
      "strings": "1 1 1 3 4 1",
      "fingering": "1 1 1 3 4 1",
      "tones": "F,A#,D#",
      "chordName": "D#,sus,2,"
    },
    {
      "strings": "6 6 8 8 6 6",
      "fingering": "1 1 3 4 1 1",
      "tones": "A#,D#,F",
      "chordName": "D#,sus,2,"
    },
    {
      "strings": "11 8 8 10 11 X",
      "fingering": "3 1 1 2 4 X",
      "tones": "D#,F,A#",
      "chordName": "D#,sus,2,"
    },
    {
      "strings": "11 13 13 X 11 13",
      "fingering": "1 2 3 X 1 4",
      "tones": "D#,A#,F",
      "chordName": "D#,sus,2,"
    }
  ],
  "D#_sus4": [
    {
      "strings": "X X 1 3 4 4",
      "fingering": "X X 1 2 3 4",
      "tones": "D#,A#,G#",
      "chordName": "D#,sus,4,"
    },
    {
      "strings": "6 6 8 8 9 6",
      "fingering": "1 1 2 3 4 1",
      "tones": "A#,D#,G#",
      "chordName": "D#,sus,4,"
    },
    {
      "strings": "X X 8 8 9 X",
      "fingering": "X X 1 1 2 X",
      "tones": "A#,D#,G#",
      "chordName": "D#,sus,4,"
    },
    {
      "strings": "11 13 13 13 11 11",
      "fingering": "1 2 3 4 1 1",
      "tones": "D#,A#,G#",
      "chordName": "D#,sus,4,"
    }
  ],
  "D#_7": [
    {
      "strings": "X X 1 3 2 3",
      "fingering": "X X 1 3 2 4",
      "tones": "D#,A#,C#,G",
      "chordName": "D#,,7,"
    },
    {
      "strings": "X 6 8 6 8 6",
      "fingering": "X 1 3 1 4 1",
      "tones": "D#,A#,C#,G",
      "chordName": "D#,,7,"
    },
    {
      "strings": "X X 8 8 8 9",
      "fingering": "X X 1 1 1 2",
      "tones": "A#,D#,G,C#",
      "chordName": "D#,,7,"
    },
    {
      "strings": "11 13 11 12 11 11",
      "fingering": "1 3 1 2 1 1",
      "tones": "D#,A#,C#,G",
      "chordName": "D#,,7,"
    }
  ],
  "D#_maj7": [
    {
      "strings": "X 1 1 3 3 3",
      "fingering": "X 1 1 3 3 3",
      "tones": "A#,D#,D,G",
      "chordName": "D#,maj,7,"
    },
    {
      "strings": "X 6 5 3 3 3",
      "fingering": "X 4 3 1 1 1",
      "tones": "D#,G,A#,D",
      "chordName": "D#,maj,7,"
    },
    {
      "strings": "6 6 8 7 8 6",
      "fingering": "1 1 3 2 4 1",
      "tones": "A#,D#,D,G",
      "chordName": "D#,maj,7,"
    },
    {
      "strings": "X X 8 8 8 10",
      "fingering": "X X 1 1 1 4",
      "tones": "A#,D#,G,D",
      "chordName": "D#,maj,7,"
    }
  ],
  "D#_m7": [
    {
      "strings": "X X 1 3 2 2",
      "fingering": "X X 1 4 2 3",
      "tones": "D#,A#,C#,F#",
      "chordName": "D#,m,7,"
    },
    {
      "strings": "6 6 8 6 7 6",
      "fingering": "1 1 3 1 2 1",
      "tones": "A#,D#,C#,F#",
      "chordName": "D#,m,7,"
    },
    {
      "strings": "X X 8 8 7 9",
      "fingering": "X X 2 3 1 4",
      "tones": "A#,D#,F#,C#",
      "chordName": "D#,m,7,"
    },
    {
      "strings": "11 13 11 11 11 11",
      "fingering": "1 4 1 1 1 1",
      "tones": "D#,A#,C#,F#",
      "chordName": "D#,m,7,"
    }
  ],
  "D#_m7b5": [
    {
      "strings": "X X 1 2 2 2",
      "fingering": "X X 1 2 2 2",
      "tones": "D#,A,C#,F#",
      "chordName": "D#,m,7b5,"
    },
    {
      "strings": "X 6 7 6 7 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "D#,A,C#,F#",
      "chordName": "D#,m,7b5,"
    },
    {
      "strings": "X X 7 8 7 9",
      "fingering": "X X 1 2 1 4",
      "tones": "A,D#,F#,C#",
      "chordName": "D#,m,7b5,"
    },
    {
      "strings": "11 X 11 11 10 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "D#,C#,F#,A",
      "chordName": "D#,m,7b5,"
    }
  ],
  "D#_dim7": [
    {
      "strings": "X X 1 2 1 2",
      "fingering": "X X 1 3 2 4",
      "tones": "D#,A,C,F#",
      "chordName": "D#,dim,7,"
    },
    {
      "strings": "X 6 7 5 7 5",
      "fingering": "X 2 3 1 4 1",
      "tones": "D#,A,C,F#",
      "chordName": "D#,dim,7,"
    },
    {
      "strings": "X X 7 8 7 8",
      "fingering": "X X 1 3 2 4",
      "tones": "A,D#,F#,C",
      "chordName": "D#,dim,7,"
    },
    {
      "strings": "11 X 10 11 10 X",
      "fingering": "2 X 1 3 1 X",
      "tones": "D#,C,F#,A",
      "chordName": "D#,dim,7,"
    }
  ],
  "D#_6": [
    {
      "strings": "X X 1 3 1 3",
      "fingering": "X X 1 3 1 4",
      "tones": "D#,A#,C,G",
      "chordName": "D#,,6,"
    },
    {
      "strings": "X 6 5 5 4 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "D#,G,C",
      "chordName": "D#,,6,"
    },
    {
      "strings": "X 6 8 8 8 8",
      "fingering": "X 1 3 3 3 3",
      "tones": "D#,A#,G,C",
      "chordName": "D#,,6,"
    },
    {
      "strings": "11 X 10 12 11 X",
      "fingering": "2 X 1 4 3 X",
      "tones": "D#,C,G,A#",
      "chordName": "D#,,6,"
    }
  ],
  "D#_m6": [
    {
      "strings": "X 1 1 3 1 2",
      "fingering": "X 1 1 3 1 2",
      "tones": "A#,D#,C,F#",
      "chordName": "D#,m,6,"
    },
    {
      "strings": "X 6 4 5 4 6",
      "fingering": "X 3 1 2 1 4",
      "tones": "D#,F#,C,A#",
      "chordName": "D#,m,6,"
    },
    {
      "strings": "X X 8 8 7 8",
      "fingering": "X X 2 3 1 4",
      "tones": "A#,D#,F#,C",
      "chordName": "D#,m,6,"
    },
    {
      "strings": "11 13 13 11 13 11",
      "fingering": "1 2 3 1 4 1",
      "tones": "D#,A#,F#,C",
      "chordName": "D#,m,6,"
    }
  ],
  "D#_add9": [
    {
      "strings": "X 6 5 3 6 3",
      "fingering": "X 3 2 1 4 1",
      "tones": "D#,G,A#,F",
      "chordName": "D#,,add9,"
    },
    {
      "strings": "X 6 5 0 6 6",
      "fingering": "X 2 1 X 3 4",
      "tones": "D#,G,F,A#",
      "chordName": "D#,,add9,"
    },
    {
      "strings": "11 10 X 10 11 X",
      "fingering": "3 1 X 2 4 X",
      "tones": "D#,G,F,A#",
      "chordName": "D#,,add9,"
    },
    {
      "strings": "X X 13 12 11 13",
      "fingering": "X X 3 2 1 4",
      "tones": "D#,G,A#,F",
      "chordName": "D#,,add9,"
    }
  ],
  "D#_9": [
    {
      "strings": "X X 1 0 2 1",
      "fingering": "X X 1 X 3 2",
      "tones": "D#,G,C#,F",
      "chordName": "D#,,9,"
    },
    {
      "strings": "X 6 5 6 6 6",
      "fingering": "X 2 1 3 3 4",
      "tones": "D#,G,C#,F,A#",
      "chordName": "D#,,9,"
    },
    {
      "strings": "11 10 11 10 X X",
      "fingering": "3 1 4 2 X X",
      "tones": "D#,G,C#,F",
      "chordName": "D#,,9,"
    },
    {
      "strings": "11 13 11 12 11 13",
      "fingering": "1 3 1 2 1 4",
      "tones": "D#,A#,C#,G,F",
      "chordName": "D#,,9,"
    }
  ],
  "E_major": [
    {
      "strings": "0 2 2 1 0 0",
      "fingering": "X 2 3 1 X X",
      "tones": "E,B,G#",
      "chordName": "E,,,"
    },
    {
      "strings": "X X 2 4 5 4",
      "fingering": "X X 1 2 4 3",
      "tones": "E,B,G#",
      "chordName": "E,,,"
    },
    {
      "strings": "4 7 6 4 5 4",
      "fingering": "1 4 3 1 2 1",
      "tones": "G#,E,B",
      "chordName": "E,,,"
    },
    {
      "strings": "7 7 9 9 9 7",
      "fingering": "1 1 2 3 4 1",
      "tones": "B,E,G#",
      "chordName": "E,,,"
    }
  ],
  "E_minor": [
    {
      "strings": "0 2 2 0 0 0",
      "fingering": "X 2 3 X X X",
      "tones": "E,B,G",
      "chordName": "E,m,,"
    },
    {
      "strings": "0 2 2 4 5 3",
      "fingering": "X 1 1 3 4 2",
      "tones": "E,B,G",
      "chordName": "E,m,,"
    },
    {
      "strings": "7 7 9 9 8 7",
      "fingering": "1 1 3 4 2 1",
      "tones": "B,E,G",
      "chordName": "E,m,,"
    },
    {
      "strings": "12 10 9 9 X X",
      "fingering": "4 3 1 2 X X",
      "tones": "E,G,B",
      "chordName": "E,m,,"
    }
  ],
  "E_dim": [
    {
      "strings": "X X 2 3 X 3",
      "fingering": "X X 1 2 X 3",
      "tones": "E,A#,G",
      "chordName": "E,dim,,"
    },
    {
      "strings": "X 7 5 X 5 6",
      "fingering": "X 4 1 X 2 3",
      "tones": "E,G,A#",
      "chordName": "E,dim,,"
    },
    {
      "strings": "X 7 8 9 8 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "E,A#,G",
      "chordName": "E,dim,,"
    },
    {
      "strings": "12 10 X 12 11 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "E,G,A#",
      "chordName": "E,dim,,"
    }
  ],
  "E_aug": [
    {
      "strings": "0 3 2 1 1 0",
      "fingering": "X 4 3 1 2 X",
      "tones": "E,C,G#",
      "chordName": "E,aug,,"
    },
    {
      "strings": "X 7 6 5 5 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "E,G#,C",
      "chordName": "E,aug,,"
    },
    {
      "strings": "X 7 10 9 9 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "E,C,G#",
      "chordName": "E,aug,,"
    },
    {
      "strings": "12 11 10 9 9 0",
      "fingering": "4 3 2 1 1 X",
      "tones": "E,G#,C",
      "chordName": "E,aug,,"
    }
  ],
  "E_sus2": [
    {
      "strings": "2 2 2 4 5 2",
      "fingering": "1 1 1 3 4 1",
      "tones": "F#,B,E",
      "chordName": "E,sus,2,"
    },
    {
      "strings": "0 7 9 9 7 7",
      "fingering": "X 1 3 4 1 1",
      "tones": "E,B,F#",
      "chordName": "E,sus,2,"
    },
    {
      "strings": "0 9 9 9 0 0",
      "fingering": "X 1 2 3 X X",
      "tones": "E,F#,B",
      "chordName": "E,sus,2,"
    },
    {
      "strings": "12 14 14 X 12 14",
      "fingering": "1 3 4 X 1 4",
      "tones": "E,B,F#",
      "chordName": "E,sus,2,"
    }
  ],
  "E_sus4": [
    {
      "strings": "0 2 2 2 0 0",
      "fingering": "X 2 3 4 X X",
      "tones": "E,B,A",
      "chordName": "E,sus,4,"
    },
    {
      "strings": "0 2 2 4 5 5",
      "fingering": "X 1 1 2 3 4",
      "tones": "E,B,A",
      "chordName": "E,sus,4,"
    },
    {
      "strings": "7 7 9 9 10 7",
      "fingering": "1 1 2 3 4 1",
      "tones": "B,E,A",
      "chordName": "E,sus,4,"
    },
    {
      "strings": "X X 9 9 10 0",
      "fingering": "X X 1 1 2 X",
      "tones": "B,E,A",
      "chordName": "E,sus,4,"
    }
  ],
  "E_7": [
    {
      "strings": "0 2 0 1 0 0",
      "fingering": "X 2 X 1 X X",
      "tones": "E,B,D,G#",
      "chordName": "E,,7,"
    },
    {
      "strings": "X 7 6 7 5 X",
      "fingering": "X 3 2 4 1 X",
      "tones": "E,G#,D",
      "chordName": "E,,7,"
    },
    {
      "strings": "7 7 9 7 9 7",
      "fingering": "1 1 3 1 4 1",
      "tones": "B,E,D,G#",
      "chordName": "E,,7,"
    },
    {
      "strings": "X X 9 9 9 10",
      "fingering": "X X 1 1 1 2",
      "tones": "B,E,G#,D",
      "chordName": "E,,7,"
    }
  ],
  "E_maj7": [
    {
      "strings": "0 2 1 1 0 0",
      "fingering": "X 3 1 2 X X",
      "tones": "E,B,D#,G#",
      "chordName": "E,maj,7,"
    },
    {
      "strings": "X X 2 4 4 4",
      "fingering": "X X 1 3 3 3",
      "tones": "E,B,D#,G#",
      "chordName": "E,maj,7,"
    },
    {
      "strings": "X 7 6 4 4 4",
      "fingering": "X 4 3 1 1 1",
      "tones": "E,G#,B,D#",
      "chordName": "E,maj,7,"
    },
    {
      "strings": "7 7 9 8 9 7",
      "fingering": "1 1 3 2 4 1",
      "tones": "B,E,D#,G#",
      "chordName": "E,maj,7,"
    }
  ],
  "E_m7": [
    {
      "strings": "0 2 2 0 3 0",
      "fingering": "X 2 3 X 4 X",
      "tones": "E,B,G,D",
      "chordName": "E,m,7,"
    },
    {
      "strings": "0 2 0 0 0 0",
      "fingering": "X 2 X X X X",
      "tones": "E,B,D,G",
      "chordName": "E,m,7,"
    },
    {
      "strings": "0 2 2 4 3 3",
      "fingering": "X 1 1 4 2 3",
      "tones": "E,B,D,G",
      "chordName": "E,m,7,"
    },
    {
      "strings": "7 7 9 7 8 7",
      "fingering": "1 1 3 1 2 1",
      "tones": "B,E,D,G",
      "chordName": "E,m,7,"
    },
    {
      "strings": "X X 9 9 8 10",
      "fingering": "X X 2 3 1 4",
      "tones": "B,E,G,D",
      "chordName": "E,m,7,"
    }
  ],
  "E_m7b5": [
    {
      "strings": "0 1 2 3 3 3",
      "fingering": "X 1 2 3 3 3",
      "tones": "E,A#,D,G",
      "chordName": "E,m,7b5,"
    },
    {
      "strings": "X 7 8 7 8 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "E,A#,D,G",
      "chordName": "E,m,7b5,"
    },
    {
      "strings": "X X 8 9 8 10",
      "fingering": "X X 1 2 1 4",
      "tones": "A#,E,G,D",
      "chordName": "E,m,7b5,"
    },
    {
      "strings": "12 X 12 12 11 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "E,D,G,A#",
      "chordName": "E,m,7b5,"
    }
  ],
  "E_dim7": [
    {
      "strings": "0 1 2 0 2 0",
      "fingering": "X 1 2 X 3 X",
      "tones": "E,A#,G,C#",
      "chordName": "E,dim,7,"
    },
    {
      "strings": "X X 2 3 2 3",
      "fingering": "X X 1 3 2 4",
      "tones": "E,A#,C#,G",
      "chordName": "E,dim,7,"
    },
    {
      "strings": "X 7 8 6 8 X",
      "fingering": "X 2 3 1 4 X",
      "tones": "E,A#,C#,G",
      "chordName": "E,dim,7,"
    },
    {
      "strings": "12 X 11 12 11 X",
      "fingering": "2 X 1 3 1 X",
      "tones": "E,C#,G,A#",
      "chordName": "E,dim,7,"
    }
  ],
  "E_6": [
    {
      "strings": "0 2 2 1 2 0",
      "fingering": "X 2 3 1 4 X",
      "tones": "E,B,G#,C#",
      "chordName": "E,,6,"
    },
    {
      "strings": "0 2 2 4 2 4",
      "fingering": "X 1 1 3 1 4",
      "tones": "E,B,C#,G#",
      "chordName": "E,,6,"
    },
    {
      "strings": "X 7 6 6 5 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "E,G#,C#",
      "chordName": "E,,6,"
    },
    {
      "strings": "X 7 9 9 9 9",
      "fingering": "X 1 3 3 3 3",
      "tones": "E,B,G#,C#",
      "chordName": "E,,6,"
    }
  ],
  "E_m6": [
    {
      "strings": "0 2 2 0 2 0",
      "fingering": "X 1 2 X 3 X",
      "tones": "E,B,G,C#",
      "chordName": "E,m,6,"
    },
    {
      "strings": "0 2 2 4 2 3",
      "fingering": "X 1 1 3 1 2",
      "tones": "E,B,C#,G",
      "chordName": "E,m,6,"
    },
    {
      "strings": "X 7 5 6 5 7",
      "fingering": "X 3 1 2 1 4",
      "tones": "E,G,C#,B",
      "chordName": "E,m,6,"
    },
    {
      "strings": "X X 9 9 8 9",
      "fingering": "X X 2 3 1 4",
      "tones": "B,E,G,C#",
      "chordName": "E,m,6,"
    }
  ],
  "E_add9": [
    {
      "strings": "0 2 2 1 0 2",
      "fingering": "X 2 3 1 X 4",
      "tones": "E,B,G#,F#",
      "chordName": "E,,add9,"
    },
    {
      "strings": "X 7 6 4 7 4",
      "fingering": "X 3 2 1 4 1",
      "tones": "E,G#,B,F#",
      "chordName": "E,,add9,"
    },
    {
      "strings": "X 7 6 X 7 7",
      "fingering": "X 2 1 X 3 4",
      "tones": "E,G#,F#,B",
      "chordName": "E,,add9,"
    },
    {
      "strings": "X X 14 13 12 14",
      "fingering": "X X 3 2 1 4",
      "tones": "E,G#,B,F#",
      "chordName": "E,,add9,"
    }
  ],
  "E_9": [
    {
      "strings": "0 2 0 1 0 2",
      "fingering": "X 2 X 1 X 3",
      "tones": "E,B,D,G#,F#",
      "chordName": "E,,9,"
    },
    {
      "strings": "4 X 2 4 3 2",
      "fingering": "3 X 1 4 2 1",
      "tones": "G#,E,B,D,F#",
      "chordName": "E,,9,"
    },
    {
      "strings": "7 7 6 7 7 7",
      "fingering": "2 2 1 3 3 4",
      "tones": "B,E,G#,D,F#",
      "chordName": "E,,9,"
    },
    {
      "strings": "0 9 9 9 9 10",
      "fingering": "X 1 1 1 1 2",
      "tones": "E,F#,B,G#,D",
      "chordName": "E,,9,"
    }
  ],
  "F_major": [
    {
      "strings": "1 3 3 2 1 1",
      "fingering": "1 3 4 2 1 1",
      "tones": "F,C,A",
      "chordName": "F,,,"
    },
    {
      "strings": "X 3 3 5 6 5",
      "fingering": "X 1 1 2 4 3",
      "tones": "C,F,A",
      "chordName": "F,,,"
    },
    {
      "strings": "5 8 7 5 6 5",
      "fingering": "1 4 3 1 2 1",
      "tones": "A,F,C",
      "chordName": "F,,,"
    },
    {
      "strings": "8 8 10 10 10 8",
      "fingering": "1 1 2 3 4 1",
      "tones": "C,F,A",
      "chordName": "F,,,"
    }
  ],
  "F_minor": [
    {
      "strings": "1 3 3 1 1 1",
      "fingering": "1 3 4 1 1 1",
      "tones": "F,C,G#",
      "chordName": "F,m,,"
    },
    {
      "strings": "X X 3 5 6 4",
      "fingering": "X X 1 3 4 2",
      "tones": "F,C,G#",
      "chordName": "F,m,,"
    },
    {
      "strings": "8 8 10 10 9 8",
      "fingering": "1 1 3 4 2 1",
      "tones": "C,F,G#",
      "chordName": "F,m,,"
    },
    {
      "strings": "13 11 10 10 X X",
      "fingering": "4 2 1 1 X X",
      "tones": "F,G#,C",
      "chordName": "F,m,,"
    }
  ],
  "F_dim": [
    {
      "strings": "X X 3 4 X 4",
      "fingering": "X X 1 2 X 3",
      "tones": "F,B,G#",
      "chordName": "F,dim,,"
    },
    {
      "strings": "X 8 6 X 6 7",
      "fingering": "X 4 1 X 2 3",
      "tones": "F,G#,B",
      "chordName": "F,dim,,"
    },
    {
      "strings": "X 8 9 10 9 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "F,B,G#",
      "chordName": "F,dim,,"
    },
    {
      "strings": "13 11 X 13 12 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "F,G#,B",
      "chordName": "F,dim,,"
    }
  ],
  "F_aug": [
    {
      "strings": "X X 3 2 2 1",
      "fingering": "X X 4 2 3 1",
      "tones": "F,A,C#",
      "chordName": "F,aug,,"
    },
    {
      "strings": "X 8 7 6 6 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "F,A,C#",
      "chordName": "F,aug,,"
    },
    {
      "strings": "X 8 X 10 10 9",
      "fingering": "X 1 X 3 4 2",
      "tones": "F,A,C#",
      "chordName": "F,aug,,"
    },
    {
      "strings": "13 12 11 10 10 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "F,A,C#",
      "chordName": "F,aug,,"
    }
  ],
  "F_sus2": [
    {
      "strings": "1 3 3 X 1 3",
      "fingering": "1 2 3 X 1 4",
      "tones": "F,C,G",
      "chordName": "F,sus,2,"
    },
    {
      "strings": "3 3 3 5 6 3",
      "fingering": "1 1 1 3 4 1",
      "tones": "G,C,F",
      "chordName": "F,sus,2,"
    },
    {
      "strings": "8 8 10 10 8 8",
      "fingering": "1 1 3 4 1 1",
      "tones": "C,F,G",
      "chordName": "F,sus,2,"
    },
    {
      "strings": "13 10 10 12 13 X",
      "fingering": "3 1 1 2 4 X",
      "tones": "F,G,C",
      "chordName": "F,sus,2,"
    }
  ],
  "F_sus4": [
    {
      "strings": "1 3 3 3 1 1",
      "fingering": "1 2 3 4 1 1",
      "tones": "F,C,A#",
      "chordName": "F,sus,4,"
    },
    {
      "strings": "X X 3 5 6 6",
      "fingering": "X X 1 2 3 4",
      "tones": "F,C,A#",
      "chordName": "F,sus,4,"
    },
    {
      "strings": "8 8 10 10 11 8",
      "fingering": "1 1 2 3 4 1",
      "tones": "C,F,A#",
      "chordName": "F,sus,4,"
    },
    {
      "strings": "X X 10 10 11 X",
      "fingering": "X X 1 1 2 X",
      "tones": "C,F,A#",
      "chordName": "F,sus,4,"
    }
  ],
  "F_7": [
    {
      "strings": "1 3 1 2 1 1",
      "fingering": "1 3 1 2 1 1",
      "tones": "F,C,D#,A",
      "chordName": "F,,7,"
    },
    {
      "strings": "X 3 3 5 4 5",
      "fingering": "X 1 1 3 2 4",
      "tones": "C,F,D#,A",
      "chordName": "F,,7,"
    },
    {
      "strings": "8 8 10 8 10 8",
      "fingering": "1 1 3 1 4 1",
      "tones": "C,F,D#,A",
      "chordName": "F,,7,"
    },
    {
      "strings": "X X 10 10 10 11",
      "fingering": "X X 1 1 1 2",
      "tones": "C,F,A,D#",
      "chordName": "F,,7,"
    }
  ],
  "F_maj7": [
    {
      "strings": "X X 3 2 1 0",
      "fingering": "X X 3 2 1 X",
      "tones": "F,A,C,E",
      "chordName": "F,maj,7,"
    },
    {
      "strings": "1 3 2 2 1 1",
      "fingering": "1 4 2 3 1 1",
      "tones": "F,C,E,A",
      "chordName": "F,maj,7,"
    },
    {
      "strings": "X 3 3 5 5 5",
      "fingering": "X 1 1 3 3 3",
      "tones": "C,F,E,A",
      "chordName": "F,maj,7,"
    },
    {
      "strings": "8 8 10 9 10 8",
      "fingering": "1 1 3 2 4 1",
      "tones": "C,F,E,A",
      "chordName": "F,maj,7,"
    }
  ],
  "F_m7": [
    {
      "strings": "1 3 1 1 1 1",
      "fingering": "1 3 1 1 1 1",
      "tones": "F,C,D#,G#",
      "chordName": "F,m,7,"
    },
    {
      "strings": "X X 3 5 4 4",
      "fingering": "X X 1 4 2 3",
      "tones": "F,C,D#,G#",
      "chordName": "F,m,7,"
    },
    {
      "strings": "8 8 10 8 9 8",
      "fingering": "1 1 3 1 2 1",
      "tones": "C,F,D#,G#",
      "chordName": "F,m,7,"
    },
    {
      "strings": "X X 10 10 9 11",
      "fingering": "X X 2 3 1 4",
      "tones": "C,F,G#,D#",
      "chordName": "F,m,7,"
    }
  ],
  "F_m7b5": [
    {
      "strings": "1 X 1 1 0 X",
      "fingering": "1 X 2 3 X X",
      "tones": "F,D#,G#,B",
      "chordName": "F,m,7b5,"
    },
    {
      "strings": "X X 3 4 4 4",
      "fingering": "X X 1 2 2 2",
      "tones": "F,B,D#,G#",
      "chordName": "F,m,7b5,"
    },
    {
      "strings": "X 8 9 8 9 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "F,B,D#,G#",
      "chordName": "F,m,7b5,"
    },
    {
      "strings": "13 11 13 13 0 X",
      "fingering": "2 1 3 4 X X",
      "tones": "F,G#,D#,B",
      "chordName": "F,m,7b5,"
    }
  ],
  "F_dim7": [
    {
      "strings": "1 X 0 1 0 1",
      "fingering": "1 X X 2 X 3",
      "tones": "F,D,G#,B",
      "chordName": "F,dim,7,"
    },
    {
      "strings": "X X 3 4 3 4",
      "fingering": "X X 1 3 1 4",
      "tones": "F,B,D,G#",
      "chordName": "F,dim,7,"
    },
    {
      "strings": "7 8 9 7 9 7",
      "fingering": "1 2 3 1 4 1",
      "tones": "B,F,D,G#",
      "chordName": "F,dim,7,"
    },
    {
      "strings": "13 X 12 13 12 X",
      "fingering": "3 X 1 4 2 X",
      "tones": "F,D,G#,B",
      "chordName": "F,dim,7,"
    }
  ],
  "F_6": [
    {
      "strings": "1 X 3 2 3 1",
      "fingering": "1 X 3 2 4 1",
      "tones": "F,A,D",
      "chordName": "F,,6,"
    },
    {
      "strings": "X 3 3 5 3 5",
      "fingering": "X 1 1 3 1 4",
      "tones": "C,F,D,A",
      "chordName": "F,,6,"
    },
    {
      "strings": "X 8 7 7 6 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "F,A,D",
      "chordName": "F,,6,"
    },
    {
      "strings": "8 8 10 10 10 10",
      "fingering": "1 1 3 3 3 3",
      "tones": "C,F,A,D",
      "chordName": "F,,6,"
    }
  ],
  "F_m6": [
    {
      "strings": "1 X 0 1 1 1",
      "fingering": "1 X X 2 3 4",
      "tones": "F,D,G#,C",
      "chordName": "F,m,6,"
    },
    {
      "strings": "X X 3 5 3 4",
      "fingering": "X X 1 3 1 2",
      "tones": "F,C,D,G#",
      "chordName": "F,m,6,"
    },
    {
      "strings": "X 8 6 7 6 8",
      "fingering": "X 3 1 2 1 4",
      "tones": "F,G#,D,C",
      "chordName": "F,m,6,"
    },
    {
      "strings": "X X 10 10 9 10",
      "fingering": "X X 2 3 1 4",
      "tones": "C,F,G#,D",
      "chordName": "F,m,6,"
    }
  ],
  "F_add9": [
    {
      "strings": "X X 3 2 1 3",
      "fingering": "X X 3 2 1 4",
      "tones": "F,A,C,G",
      "chordName": "F,,add9,"
    },
    {
      "strings": "X X 3 0 6 5",
      "fingering": "X X 1 X 4 3",
      "tones": "F,G,A",
      "chordName": "F,,add9,"
    },
    {
      "strings": "X 8 7 5 8 5",
      "fingering": "X 3 2 1 4 1",
      "tones": "F,A,C,G",
      "chordName": "F,,add9,"
    },
    {
      "strings": "X 8 7 0 8 8",
      "fingering": "X 2 1 X 3 4",
      "tones": "F,A,G,C",
      "chordName": "F,,add9,"
    }
  ],
  "F_9": [
    {
      "strings": "1 3 1 2 1 3",
      "fingering": "1 3 1 2 1 4",
      "tones": "F,C,D#,A,G",
      "chordName": "F,,9,"
    },
    {
      "strings": "X X 3 2 4 3",
      "fingering": "X X 2 1 4 3",
      "tones": "F,A,D#,G",
      "chordName": "F,,9,"
    },
    {
      "strings": "8 8 7 8 8 8",
      "fingering": "2 2 1 3 3 4",
      "tones": "C,F,A,D#,G",
      "chordName": "F,,9,"
    },
    {
      "strings": "X 10 10 10 10 11",
      "fingering": "X 1 1 1 1 2",
      "tones": "G,C,F,A,D#",
      "chordName": "F,,9,"
    }
  ],
  "F#_major": [
    {
      "strings": "2 4 4 3 2 2",
      "fingering": "1 3 4 2 1 1",
      "tones": "F#,C#,A#",
      "chordName": "F#,,,"
    },
    {
      "strings": "X 4 4 6 7 6",
      "fingering": "X 1 1 2 4 3",
      "tones": "C#,F#,A#",
      "chordName": "F#,,,"
    },
    {
      "strings": "6 9 8 6 7 6",
      "fingering": "1 4 3 1 2 1",
      "tones": "A#,F#,C#",
      "chordName": "F#,,,"
    },
    {
      "strings": "9 9 11 11 11 9",
      "fingering": "1 1 2 3 4 1",
      "tones": "C#,F#,A#",
      "chordName": "F#,,,"
    }
  ],
  "F#_minor": [
    {
      "strings": "2 4 4 2 2 2",
      "fingering": "1 3 4 1 1 1",
      "tones": "F#,C#,A",
      "chordName": "F#,m,,"
    },
    {
      "strings": "X 4 4 6 7 5",
      "fingering": "X 1 1 3 4 2",
      "tones": "C#,F#,A",
      "chordName": "F#,m,,"
    },
    {
      "strings": "X X 7 6 7 5",
      "fingering": "X X 3 2 4 1",
      "tones": "A,C#,F#",
      "chordName": "F#,m,,"
    },
    {
      "strings": "9 9 11 11 10 9",
      "fingering": "1 1 3 4 2 1",
      "tones": "C#,F#,A",
      "chordName": "F#,m,,"
    }
  ],
  "F#_dim": [
    {
      "strings": "2 0 X 2 1 X",
      "fingering": "2 X X 3 1 X",
      "tones": "F#,A,C",
      "chordName": "F#,dim,,"
    },
    {
      "strings": "X X 4 5 X 5",
      "fingering": "X X 1 2 X 3",
      "tones": "F#,C,A",
      "chordName": "F#,dim,,"
    },
    {
      "strings": "X 9 7 X 7 8",
      "fingering": "X 4 1 X 2 3",
      "tones": "F#,A,C",
      "chordName": "F#,dim,,"
    },
    {
      "strings": "X 9 10 11 10 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "F#,C,A",
      "chordName": "F#,dim,,"
    }
  ],
  "F#_aug": [
    {
      "strings": "X X 4 3 3 2",
      "fingering": "X X 4 2 3 1",
      "tones": "F#,A#,D",
      "chordName": "F#,aug,,"
    },
    {
      "strings": "X X 4 3 3 X",
      "fingering": "X X 2 1 1 X",
      "tones": "F#,A#,D",
      "chordName": "F#,aug,,"
    },
    {
      "strings": "X 9 8 7 7 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "F#,A#,D",
      "chordName": "F#,aug,,"
    },
    {
      "strings": "14 13 12 11 11 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "F#,A#,D",
      "chordName": "F#,aug,,"
    }
  ],
  "F#_sus2": [
    {
      "strings": "2 X X 1 2 2",
      "fingering": "2 X X 1 3 4",
      "tones": "F#,G#,C#",
      "chordName": "F#,sus,2,"
    },
    {
      "strings": "4 4 4 6 7 4",
      "fingering": "1 1 1 3 4 1",
      "tones": "G#,C#,F#",
      "chordName": "F#,sus,2,"
    },
    {
      "strings": "9 9 11 11 9 9",
      "fingering": "1 1 3 4 1 1",
      "tones": "C#,F#,G#",
      "chordName": "F#,sus,2,"
    },
    {
      "strings": "14 11 11 13 14 X",
      "fingering": "3 1 1 2 4 X",
      "tones": "F#,G#,C#",
      "chordName": "F#,sus,2,"
    }
  ],
  "F#_sus4": [
    {
      "strings": "2 4 4 4 2 2",
      "fingering": "1 2 3 4 1 1",
      "tones": "F#,C#,B",
      "chordName": "F#,sus,4,"
    },
    {
      "strings": "X 4 4 6 7 7",
      "fingering": "X 1 1 2 3 4",
      "tones": "C#,F#,B",
      "chordName": "F#,sus,4,"
    },
    {
      "strings": "9 9 11 11 12 9",
      "fingering": "1 1 2 3 4 1",
      "tones": "C#,F#,B",
      "chordName": "F#,sus,4,"
    },
    {
      "strings": "X X 11 11 12 14",
      "fingering": "X X 1 1 2 4",
      "tones": "C#,F#,B",
      "chordName": "F#,sus,4,"
    }
  ],
  "F#_7": [
    {
      "strings": "2 4 2 3 2 2",
      "fingering": "1 3 1 2 1 1",
      "tones": "F#,C#,E,A#",
      "chordName": "F#,,7,"
    },
    {
      "strings": "X 4 4 6 5 6",
      "fingering": "X 1 1 3 2 4",
      "tones": "C#,F#,E,A#",
      "chordName": "F#,,7,"
    },
    {
      "strings": "X 9 8 9 7 X",
      "fingering": "X 3 2 4 1 X",
      "tones": "F#,A#,E",
      "chordName": "F#,,7,"
    },
    {
      "strings": "9 9 11 9 11 9",
      "fingering": "1 1 3 1 4 1",
      "tones": "C#,F#,E,A#",
      "chordName": "F#,,7,"
    }
  ],
  "F#_maj7": [
    {
      "strings": "2 4 3 3 2 2",
      "fingering": "1 4 2 3 1 1",
      "tones": "F#,C#,F,A#",
      "chordName": "F#,maj,7,"
    },
    {
      "strings": "X 4 4 6 6 6",
      "fingering": "X 1 1 3 3 3",
      "tones": "C#,F#,F,A#",
      "chordName": "F#,maj,7,"
    },
    {
      "strings": "X 9 8 6 6 6",
      "fingering": "X 4 3 1 1 1",
      "tones": "F#,A#,C#,F",
      "chordName": "F#,maj,7,"
    },
    {
      "strings": "9 9 11 10 11 9",
      "fingering": "1 1 3 2 4 1",
      "tones": "C#,F#,F,A#",
      "chordName": "F#,maj,7,"
    }
  ],
  "F#_m7": [
    {
      "strings": "2 4 2 2 2 2",
      "fingering": "1 3 1 1 1 1",
      "tones": "F#,C#,E,A",
      "chordName": "F#,m,7,"
    },
    {
      "strings": "X X 4 6 5 5",
      "fingering": "X X 1 4 2 3",
      "tones": "F#,C#,E,A",
      "chordName": "F#,m,7,"
    },
    {
      "strings": "9 9 11 9 10 9",
      "fingering": "1 1 3 1 2 1",
      "tones": "C#,F#,E,A",
      "chordName": "F#,m,7,"
    },
    {
      "strings": "X X 11 11 10 12",
      "fingering": "X X 2 3 1 4",
      "tones": "C#,F#,A,E",
      "chordName": "F#,m,7,"
    }
  ],
  "F#_m7b5": [
    {
      "strings": "2 0 2 2 1 0",
      "fingering": "2 X 3 4 1 X",
      "tones": "F#,A,E,C",
      "chordName": "F#,m,7b5,"
    },
    {
      "strings": "X X 4 5 5 5",
      "fingering": "X X 1 2 2 2",
      "tones": "F#,C,E,A",
      "chordName": "F#,m,7b5,"
    },
    {
      "strings": "X 9 10 9 10 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "F#,C,E,A",
      "chordName": "F#,m,7b5,"
    },
    {
      "strings": "X X 10 11 10 12",
      "fingering": "X X 1 2 1 4",
      "tones": "C,F#,A,E",
      "chordName": "F#,m,7b5,"
    }
  ],
  "F#_dim7": [
    {
      "strings": "2 X 1 2 1 X",
      "fingering": "2 X 1 3 1 X",
      "tones": "F#,D#,A,C",
      "chordName": "F#,dim,7,"
    },
    {
      "strings": "2 3 4 2 4 2",
      "fingering": "1 2 3 1 4 1",
      "tones": "F#,C,A,D#",
      "chordName": "F#,dim,7,"
    },
    {
      "strings": "X X 4 5 4 5",
      "fingering": "X X 1 3 2 4",
      "tones": "F#,C,D#,A",
      "chordName": "F#,dim,7,"
    },
    {
      "strings": "8 9 10 8 10 8",
      "fingering": "1 2 3 1 4 1",
      "tones": "C,F#,D#,A",
      "chordName": "F#,dim,7,"
    }
  ],
  "F#_6": [
    {
      "strings": "2 X 1 3 2 X",
      "fingering": "2 X 1 4 3 X",
      "tones": "F#,D#,A#,C#",
      "chordName": "F#,,6,"
    },
    {
      "strings": "2 X 4 3 4 2",
      "fingering": "1 X 3 2 4 1",
      "tones": "F#,A#,D#",
      "chordName": "F#,,6,"
    },
    {
      "strings": "X 4 4 6 4 6",
      "fingering": "X 1 1 3 1 4",
      "tones": "C#,F#,D#,A#",
      "chordName": "F#,,6,"
    },
    {
      "strings": "X 9 11 11 11 11",
      "fingering": "X 1 3 3 3 3",
      "tones": "F#,C#,A#,D#",
      "chordName": "F#,,6,"
    }
  ],
  "F#_m6": [
    {
      "strings": "2 X 1 2 2 2",
      "fingering": "2 X 1 3 3 4",
      "tones": "F#,D#,A,C#",
      "chordName": "F#,m,6,"
    },
    {
      "strings": "X 4 4 6 4 5",
      "fingering": "X 1 1 3 1 2",
      "tones": "C#,F#,D#,A",
      "chordName": "F#,m,6,"
    },
    {
      "strings": "X 9 7 8 7 9",
      "fingering": "X 3 1 2 1 4",
      "tones": "F#,A,D#,C#",
      "chordName": "F#,m,6,"
    },
    {
      "strings": "X 9 11 8 10 X",
      "fingering": "X 2 4 1 3 X",
      "tones": "F#,C#,D#,A",
      "chordName": "F#,m,6,"
    }
  ],
  "F#_add9": [
    {
      "strings": "2 1 X 1 2 2",
      "fingering": "3 1 X 2 4 4",
      "tones": "F#,A#,G#,C#",
      "chordName": "F#,,add9,"
    },
    {
      "strings": "X X 4 3 2 4",
      "fingering": "X X 3 2 1 4",
      "tones": "F#,A#,C#,G#",
      "chordName": "F#,,add9,"
    },
    {
      "strings": "X 9 8 6 9 6",
      "fingering": "X 3 2 1 4 1",
      "tones": "F#,A#,C#,G#",
      "chordName": "F#,,add9,"
    },
    {
      "strings": "X 9 8 X 9 9",
      "fingering": "X 2 1 X 3 4",
      "tones": "F#,A#,G#,C#",
      "chordName": "F#,,add9,"
    }
  ],
  "F#_9": [
    {
      "strings": "2 4 2 3 2 4",
      "fingering": "1 3 1 2 1 4",
      "tones": "F#,C#,E,A#,G#",
      "chordName": "F#,,9,"
    },
    {
      "strings": "X X 4 3 5 4",
      "fingering": "X X 2 1 4 3",
      "tones": "F#,A#,E,G#",
      "chordName": "F#,,9,"
    },
    {
      "strings": "9 9 8 9 9 9",
      "fingering": "2 2 1 3 3 4",
      "tones": "C#,F#,A#,E,G#",
      "chordName": "F#,,9,"
    },
    {
      "strings": "X 11 11 11 11 12",
      "fingering": "X 1 1 1 1 2",
      "tones": "G#,C#,F#,A#,E",
      "chordName": "F#,,9,"
    }
  ],
  "G_major": [
    {
      "strings": "3 2 0 0 0 3",
      "fingering": "2 1 X X X 3",
      "tones": "G,B,D",
      "chordName": "G,,,"
    },
    {
      "strings": "3 5 5 4 3 3",
      "fingering": "1 3 4 2 1 1",
      "tones": "G,D,B",
      "chordName": "G,,,"
    },
    {
      "strings": "X 5 5 7 8 7",
      "fingering": "X 1 1 2 4 3",
      "tones": "D,G,B",
      "chordName": "G,,,"
    },
    {
      "strings": "7 10 9 7 8 7",
      "fingering": "1 4 3 1 2 1",
      "tones": "B,G,D",
      "chordName": "G,,,"
    }
  ],
  "G_minor": [
    {
      "strings": "3 1 0 0 3 3",
      "fingering": "2 1 X X 3 4",
      "tones": "G,A#,D",
      "chordName": "G,m,,"
    },
    {
      "strings": "3 5 5 3 3 3",
      "fingering": "1 3 4 1 1 1",
      "tones": "G,D,A#",
      "chordName": "G,m,,"
    },
    {
      "strings": "X X 5 7 8 6",
      "fingering": "X X 1 3 4 2",
      "tones": "G,D,A#",
      "chordName": "G,m,,"
    },
    {
      "strings": "10 10 12 12 11 10",
      "fingering": "1 1 3 4 2 1",
      "tones": "D,G,A#",
      "chordName": "G,m,,"
    }
  ],
  "G_dim": [
    {
      "strings": "3 1 X 3 2 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "G,A#,C#",
      "chordName": "G,dim,,"
    },
    {
      "strings": "X X 5 6 X 6",
      "fingering": "X X 1 2 X 3",
      "tones": "G,C#,A#",
      "chordName": "G,dim,,"
    },
    {
      "strings": "X 10 8 X 8 9",
      "fingering": "X 1 2 X 3 X",
      "tones": "G,A#,C#",
      "chordName": "G,dim,,"
    },
    {
      "strings": "X 10 11 12 11 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "G,C#,A#",
      "chordName": "G,dim,,"
    }
  ],
  "G_aug": [
    {
      "strings": "3 2 1 0 0 X",
      "fingering": "3 2 1 X X X",
      "tones": "G,B,D#",
      "chordName": "G,aug,,"
    },
    {
      "strings": "3 X 5 4 4 X",
      "fingering": "1 X 4 2 3 X",
      "tones": "G,B,D#",
      "chordName": "G,aug,,"
    },
    {
      "strings": "X X 5 4 4 X",
      "fingering": "X X 2 1 1 X",
      "tones": "G,B,D#",
      "chordName": "G,aug,,"
    },
    {
      "strings": "X 10 9 8 8 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "G,B,D#",
      "chordName": "G,aug,,"
    }
  ],
  "G_sus2": [
    {
      "strings": "3 0 0 0 3 3",
      "fingering": "1 X X X 2 3",
      "tones": "G,A,D",
      "chordName": "G,sus,2,"
    },
    {
      "strings": "5 5 5 7 8 5",
      "fingering": "1 1 1 3 4 1",
      "tones": "A,D,G",
      "chordName": "G,sus,2,"
    },
    {
      "strings": "X 10 7 7 8 10",
      "fingering": "X 3 1 1 2 4",
      "tones": "G,A,D",
      "chordName": "G,sus,2,"
    },
    {
      "strings": "10 10 12 12 10 10",
      "fingering": "1 1 3 4 1 1",
      "tones": "D,G,A",
      "chordName": "G,sus,2,"
    }
  ],
  "G_sus4": [
    {
      "strings": "3 3 0 0 1 3",
      "fingering": "2 3 X X 1 4",
      "tones": "G,C,D",
      "chordName": "G,sus,4,"
    },
    {
      "strings": "3 5 5 5 3 3",
      "fingering": "1 2 3 4 1 1",
      "tones": "G,D,C",
      "chordName": "G,sus,4,"
    },
    {
      "strings": "X 5 5 7 8 8",
      "fingering": "X 1 1 3 4 4",
      "tones": "D,G,C",
      "chordName": "G,sus,4,"
    },
    {
      "strings": "10 10 12 12 13 10",
      "fingering": "1 1 2 3 4 1",
      "tones": "D,G,C",
      "chordName": "G,sus,4,"
    }
  ],
  "G_7": [
    {
      "strings": "3 2 0 0 0 1",
      "fingering": "3 2 X X X 1",
      "tones": "G,B,D,F",
      "chordName": "G,,7,"
    },
    {
      "strings": "3 5 3 4 3 3",
      "fingering": "1 3 1 2 1 1",
      "tones": "G,D,F,B",
      "chordName": "G,,7,"
    },
    {
      "strings": "X 5 5 7 6 7",
      "fingering": "X 1 1 3 2 4",
      "tones": "D,G,F,B",
      "chordName": "G,,7,"
    },
    {
      "strings": "10 10 12 10 12 10",
      "fingering": "1 1 3 1 4 1",
      "tones": "D,G,F,B",
      "chordName": "G,,7,"
    }
  ],
  "G_maj7": [
    {
      "strings": "3 2 0 0 0 2",
      "fingering": "3 2 X X X 1",
      "tones": "G,B,D,F#",
      "chordName": "G,maj,7,"
    },
    {
      "strings": "3 5 4 4 3 3",
      "fingering": "1 4 2 3 1 1",
      "tones": "G,D,F#,B",
      "chordName": "G,maj,7,"
    },
    {
      "strings": "X 5 5 7 7 7",
      "fingering": "X 1 1 3 3 3",
      "tones": "D,G,F#,B",
      "chordName": "G,maj,7,"
    },
    {
      "strings": "X 10 12 11 12 10",
      "fingering": "X 1 3 2 4 1",
      "tones": "G,D,F#,B",
      "chordName": "G,maj,7,"
    }
  ],
  "G_m7": [
    {
      "strings": "3 5 3 3 3 3",
      "fingering": "1 3 1 1 1 1",
      "tones": "G,D,F,A#",
      "chordName": "G,m,7,"
    },
    {
      "strings": "X 5 5 7 6 6",
      "fingering": "X 1 1 4 2 3",
      "tones": "D,G,F,A#",
      "chordName": "G,m,7,"
    },
    {
      "strings": "X 10 8 10 8 10",
      "fingering": "X 2 1 3 1 4",
      "tones": "G,A#,F,D",
      "chordName": "G,m,7,"
    },
    {
      "strings": "10 10 12 10 11 10",
      "fingering": "1 1 3 1 2 1",
      "tones": "D,G,F,A#",
      "chordName": "G,m,7,"
    }
  ],
  "G_m7b5": [
    {
      "strings": "3 X X 3 2 1",
      "fingering": "3 X X 4 2 1",
      "tones": "G,A#,C#,F",
      "chordName": "G,m,7b5,"
    },
    {
      "strings": "3 X 3 3 2 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "G,F,A#,C#",
      "chordName": "G,m,7b5,"
    },
    {
      "strings": "X X 5 6 6 6",
      "fingering": "X X 1 2 2 2",
      "tones": "G,C#,F,A#",
      "chordName": "G,m,7b5,"
    },
    {
      "strings": "X 10 11 10 11 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "G,C#,F,A#",
      "chordName": "G,m,7b5,"
    }
  ],
  "G_dim7": [
    {
      "strings": "3 1 X 3 2 0",
      "fingering": "3 1 X 4 2 X",
      "tones": "G,A#,C#,E",
      "chordName": "G,dim,7,"
    },
    {
      "strings": "3 X 2 3 2 0",
      "fingering": "3 X 1 4 2 X",
      "tones": "G,E,A#,C#",
      "chordName": "G,dim,7,"
    },
    {
      "strings": "3 4 5 3 5 3",
      "fingering": "1 2 3 1 4 1",
      "tones": "G,C#,A#,E",
      "chordName": "G,dim,7,"
    },
    {
      "strings": "X X 5 6 5 6",
      "fingering": "X X 1 3 2 4",
      "tones": "G,C#,E,A#",
      "chordName": "G,dim,7,"
    }
  ],
  "G_6": [
    {
      "strings": "3 2 0 0 0 0",
      "fingering": "2 1 X X X X",
      "tones": "G,B,D,E",
      "chordName": "G,,6,"
    },
    {
      "strings": "3 X 2 4 3 X",
      "fingering": "2 X 1 4 3 X",
      "tones": "G,E,B,D",
      "chordName": "G,,6,"
    },
    {
      "strings": "X 5 5 7 5 7",
      "fingering": "X 1 1 3 1 4",
      "tones": "D,G,E,B",
      "chordName": "G,,6,"
    },
    {
      "strings": "X 10 12 12 12 12",
      "fingering": "X 1 3 3 3 4",
      "tones": "G,D,B,E",
      "chordName": "G,,6,"
    }
  ],
  "G_m6": [
    {
      "strings": "3 X 2 3 3 3",
      "fingering": "2 X 1 3 4 4",
      "tones": "G,E,A#,D",
      "chordName": "G,m,6,"
    },
    {
      "strings": "3 5 5 3 5 3",
      "fingering": "1 2 3 1 4 1",
      "tones": "G,D,A#,E",
      "chordName": "G,m,6,"
    },
    {
      "strings": "X 5 5 7 5 6",
      "fingering": "X 1 1 3 1 2",
      "tones": "D,G,E,A#",
      "chordName": "G,m,6,"
    },
    {
      "strings": "X 10 8 9 8 10",
      "fingering": "X 3 1 2 1 4",
      "tones": "G,A#,E,D",
      "chordName": "G,m,6,"
    }
  ],
  "G_add9": [
    {
      "strings": "3 0 0 2 0 3",
      "fingering": "2 X X 1 X 3",
      "tones": "G,A,D,B",
      "chordName": "G,,add9,"
    },
    {
      "strings": "X 10 9 7 10 7",
      "fingering": "X 3 2 1 4 1",
      "tones": "G,B,D,A",
      "chordName": "G,,add9,"
    },
    {
      "strings": "X 10 9 0 10 10",
      "fingering": "X 2 1 X 3 4",
      "tones": "G,B,A,D",
      "chordName": "G,,add9,"
    }
  ],
  "G_9": [
    {
      "strings": "3 0 0 0 0 1",
      "fingering": "3 X X X X 1",
      "tones": "G,A,D,B,F",
      "chordName": "G,,9,"
    },
    {
      "strings": "3 2 3 2 3 X",
      "fingering": "2 1 3 1 4 X",
      "tones": "G,B,F,A,D",
      "chordName": "G,,9,"
    },
    {
      "strings": "3 5 3 4 3 5",
      "fingering": "1 3 1 2 1 4",
      "tones": "G,D,F,B,A",
      "chordName": "G,,9,"
    },
    {
      "strings": "10 10 9 10 10 10",
      "fingering": "2 2 1 3 3 4",
      "tones": "D,G,B,F,A",
      "chordName": "G,,9,"
    }
  ],
  "G#_major": [
    {
      "strings": "4 3 1 1 1 X",
      "fingering": "3 2 1 1 1 X",
      "tones": "G#,C,D#",
      "chordName": "G#,,,"
    },
    {
      "strings": "4 6 6 5 4 4",
      "fingering": "1 3 4 2 1 1",
      "tones": "G#,D#,C",
      "chordName": "G#,,,"
    },
    {
      "strings": "X 6 6 8 9 8",
      "fingering": "X 1 1 2 4 3",
      "tones": "D#,G#,C",
      "chordName": "G#,,,"
    },
    {
      "strings": "8 11 10 8 9 8",
      "fingering": "1 4 3 1 2 1",
      "tones": "C,G#,D#",
      "chordName": "G#,,,"
    }
  ],
  "G#_minor": [
    {
      "strings": "4 6 6 4 4 4",
      "fingering": "1 3 4 1 1 1",
      "tones": "G#,D#,B",
      "chordName": "G#,m,,"
    },
    {
      "strings": "X X 6 8 9 7",
      "fingering": "X X 1 3 4 2",
      "tones": "G#,D#,B",
      "chordName": "G#,m,,"
    },
    {
      "strings": "X X 9 8 9 7",
      "fingering": "X X 3 2 4 1",
      "tones": "B,D#,G#",
      "chordName": "G#,m,,"
    },
    {
      "strings": "11 11 13 13 12 11",
      "fingering": "1 1 3 4 2 1",
      "tones": "D#,G#,B",
      "chordName": "G#,m,,"
    }
  ],
  "G#_dim": [
    {
      "strings": "4 2 X 4 3 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "G#,B,D",
      "chordName": "G#,dim,,"
    },
    {
      "strings": "X X 6 7 X 7",
      "fingering": "X X 1 2 X 3",
      "tones": "G#,D,B",
      "chordName": "G#,dim,,"
    },
    {
      "strings": "X 11 9 X 9 10",
      "fingering": "X 4 1 X 2 3",
      "tones": "G#,B,D",
      "chordName": "G#,dim,,"
    },
    {
      "strings": "X 11 12 13 12 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "G#,D,B",
      "chordName": "G#,dim,,"
    }
  ],
  "G#_aug": [
    {
      "strings": "4 3 2 1 1 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "G#,C,E",
      "chordName": "G#,aug,,"
    },
    {
      "strings": "4 X 6 5 5 X",
      "fingering": "1 X 4 2 3 X",
      "tones": "G#,C,E",
      "chordName": "G#,aug,,"
    },
    {
      "strings": "X X 6 5 5 X",
      "fingering": "X X 2 1 1 X",
      "tones": "G#,C,E",
      "chordName": "G#,aug,,"
    },
    {
      "strings": "X 11 10 9 9 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "G#,C,E",
      "chordName": "G#,aug,,"
    }
  ],
  "G#_sus2": [
    {
      "strings": "4 X X 3 4 4",
      "fingering": "2 X X 1 3 4",
      "tones": "G#,A#,D#",
      "chordName": "G#,sus,2,"
    },
    {
      "strings": "4 6 6 X 4 6",
      "fingering": "1 2 3 X 1 4",
      "tones": "G#,D#,A#",
      "chordName": "G#,sus,2,"
    },
    {
      "strings": "6 6 6 8 9 6",
      "fingering": "1 1 1 3 4 1",
      "tones": "A#,D#,G#",
      "chordName": "G#,sus,2,"
    },
    {
      "strings": "11 11 13 13 11 11",
      "fingering": "1 1 3 4 1 1",
      "tones": "D#,G#,A#",
      "chordName": "G#,sus,2,"
    }
  ],
  "G#_sus4": [
    {
      "strings": "X X 1 1 2 4",
      "fingering": "X X 1 1 2 4",
      "tones": "D#,G#,C#",
      "chordName": "G#,sus,4,"
    },
    {
      "strings": "4 6 6 6 4 4",
      "fingering": "1 2 3 4 1 1",
      "tones": "G#,D#,C#",
      "chordName": "G#,sus,4,"
    },
    {
      "strings": "X 6 6 8 9 9",
      "fingering": "X 1 1 2 3 4",
      "tones": "D#,G#,C#",
      "chordName": "G#,sus,4,"
    },
    {
      "strings": "11 11 13 13 14 11",
      "fingering": "1 1 2 3 4 1",
      "tones": "D#,G#,C#",
      "chordName": "G#,sus,4,"
    }
  ],
  "G#_7": [
    {
      "strings": "X X 1 1 1 2",
      "fingering": "X X 1 1 1 2",
      "tones": "D#,G#,C,F#",
      "chordName": "G#,,7,"
    },
    {
      "strings": "4 6 4 5 4 4",
      "fingering": "1 3 1 2 1 1",
      "tones": "G#,D#,F#,C",
      "chordName": "G#,,7,"
    },
    {
      "strings": "X 6 6 8 7 8",
      "fingering": "X 1 1 3 2 4",
      "tones": "D#,G#,F#,C",
      "chordName": "G#,,7,"
    },
    {
      "strings": "11 11 13 11 13 11",
      "fingering": "1 1 3 1 4 1",
      "tones": "D#,G#,F#,C",
      "chordName": "G#,,7,"
    }
  ],
  "G#_maj7": [
    {
      "strings": "4 6 5 5 4 4",
      "fingering": "1 4 2 3 1 1",
      "tones": "G#,D#,G,C",
      "chordName": "G#,maj,7,"
    },
    {
      "strings": "X 6 6 8 8 8",
      "fingering": "X 1 1 3 3 3",
      "tones": "D#,G#,G,C",
      "chordName": "G#,maj,7,"
    },
    {
      "strings": "X 11 10 12 9 X",
      "fingering": "X 3 2 4 1 X",
      "tones": "G#,C,G",
      "chordName": "G#,maj,7,"
    },
    {
      "strings": "11 11 13 12 13 11",
      "fingering": "1 1 3 2 4 1",
      "tones": "D#,G#,G,C",
      "chordName": "G#,maj,7,"
    }
  ],
  "G#_m7": [
    {
      "strings": "4 6 4 4 4 4",
      "fingering": "1 3 1 1 1 1",
      "tones": "G#,D#,F#,B",
      "chordName": "G#,m,7,"
    },
    {
      "strings": "X 6 6 8 7 7",
      "fingering": "X 1 1 4 2 3",
      "tones": "D#,G#,F#,B",
      "chordName": "G#,m,7,"
    },
    {
      "strings": "X 11 9 11 9 X",
      "fingering": "X 2 1 3 1 X",
      "tones": "G#,B,F#",
      "chordName": "G#,m,7,"
    },
    {
      "strings": "11 11 13 11 12 11",
      "fingering": "1 1 3 1 2 1",
      "tones": "D#,G#,F#,B",
      "chordName": "G#,m,7,"
    }
  ],
  "G#_m7b5": [
    {
      "strings": "X X 0 1 0 2",
      "fingering": "X X X 1 X 3",
      "tones": "D,G#,B,F#",
      "chordName": "G#,m,7b5,"
    },
    {
      "strings": "4 X 4 4 3 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "G#,F#,B,D",
      "chordName": "G#,m,7b5,"
    },
    {
      "strings": "X X 6 7 7 7",
      "fingering": "X X 1 2 2 2",
      "tones": "G#,D,F#,B",
      "chordName": "G#,m,7b5,"
    },
    {
      "strings": "X 11 12 11 12 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "G#,D,F#,B",
      "chordName": "G#,m,7b5,"
    }
  ],
  "G#_dim7": [
    {
      "strings": "X X 0 1 0 1",
      "fingering": "X X X 1 X 2",
      "tones": "D,G#,B,F",
      "chordName": "G#,dim,7,"
    },
    {
      "strings": "4 X 3 4 3 4",
      "fingering": "2 X 1 3 1 4",
      "tones": "G#,F,B,D",
      "chordName": "G#,dim,7,"
    },
    {
      "strings": "X X 6 7 6 7",
      "fingering": "X X 1 3 2 4",
      "tones": "G#,D,F,B",
      "chordName": "G#,dim,7,"
    },
    {
      "strings": "10 11 12 10 12 10",
      "fingering": "1 2 3 1 4 1",
      "tones": "D,G#,F,B",
      "chordName": "G#,dim,7,"
    }
  ],
  "G#_6": [
    {
      "strings": "X 3 1 1 1 1",
      "fingering": "X 3 1 1 1 1",
      "tones": "C,D#,G#,F",
      "chordName": "G#,,6,"
    },
    {
      "strings": "4 X 3 5 4 X",
      "fingering": "2 X 1 4 3 X",
      "tones": "G#,F,C,D#",
      "chordName": "G#,,6,"
    },
    {
      "strings": "X 6 6 8 6 8",
      "fingering": "X 1 1 3 1 4",
      "tones": "D#,G#,F,C",
      "chordName": "G#,,6,"
    },
    {
      "strings": "X 11 10 10 9 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "G#,C,F",
      "chordName": "G#,,6,"
    }
  ],
  "G#_m6": [
    {
      "strings": "4 X 3 4 4 X",
      "fingering": "2 X 1 3 4 X",
      "tones": "G#,F,B,D#",
      "chordName": "G#,m,6,"
    },
    {
      "strings": "4 6 6 4 6 4",
      "fingering": "1 2 3 1 4 1",
      "tones": "G#,D#,B,F",
      "chordName": "G#,m,6,"
    },
    {
      "strings": "X 6 6 8 6 7",
      "fingering": "X 1 1 3 1 2",
      "tones": "D#,G#,F,B",
      "chordName": "G#,m,6,"
    },
    {
      "strings": "X 11 9 10 9 11",
      "fingering": "X 3 1 2 1 4",
      "tones": "G#,B,F,D#",
      "chordName": "G#,m,6,"
    }
  ],
  "G#_add9": [
    {
      "strings": "4 3 X 3 4 X",
      "fingering": "3 1 X 2 4 X",
      "tones": "G#,C,A#,D#",
      "chordName": "G#,,add9,"
    },
    {
      "strings": "X X 6 5 4 6",
      "fingering": "X X 3 2 1 4",
      "tones": "G#,C,D#,A#",
      "chordName": "G#,,add9,"
    },
    {
      "strings": "X 11 10 8 11 8",
      "fingering": "X 3 2 1 4 1",
      "tones": "G#,C,D#,A#",
      "chordName": "G#,,add9,"
    },
    {
      "strings": "X 11 10 X 11 11",
      "fingering": "X 2 1 X 3 4",
      "tones": "G#,C,A#,D#",
      "chordName": "G#,,add9,"
    }
  ],
  "G#_9": [
    {
      "strings": "4 3 4 3 4 X",
      "fingering": "2 1 3 1 4 X",
      "tones": "G#,C,F#,A#,D#",
      "chordName": "G#,,9,"
    },
    {
      "strings": "4 6 4 5 4 6",
      "fingering": "1 3 1 2 1 4",
      "tones": "G#,D#,F#,C,A#",
      "chordName": "G#,,9,"
    },
    {
      "strings": "X X 6 5 7 6",
      "fingering": "X X 2 1 4 3",
      "tones": "G#,C,F#,A#",
      "chordName": "G#,,9,"
    },
    {
      "strings": "11 11 10 11 11 11",
      "fingering": "2 2 1 3 3 4",
      "tones": "D#,G#,C,F#,A#",
      "chordName": "G#,,9,"
    }
  ],
  "A_major": [
    {
      "strings": "X 0 2 2 2 0",
      "fingering": "X X 1 2 3 X",
      "tones": "A,E,C#",
      "chordName": "A,,,"
    },
    {
      "strings": "X 0 2 2 2 5",
      "fingering": "X X 1 1 1 4",
      "tones": "A,E,C#",
      "chordName": "A,,,"
    },
    {
      "strings": "5 7 7 6 5 5",
      "fingering": "1 3 4 2 1 1",
      "tones": "A,E,C#",
      "chordName": "A,,,"
    },
    {
      "strings": "X 0 7 9 10 9",
      "fingering": "X X 1 2 4 3",
      "tones": "A,E,C#",
      "chordName": "A,,,"
    }
  ],
  "A_minor": [
    {
      "strings": "X 0 2 2 1 0",
      "fingering": "X X 2 3 1 X",
      "tones": "A,E,C",
      "chordName": "A,m,,"
    },
    {
      "strings": "X 0 2 5 5 5",
      "fingering": "X X 1 4 4 4",
      "tones": "A,E,C",
      "chordName": "A,m,,"
    },
    {
      "strings": "5 7 7 5 5 5",
      "fingering": "1 3 4 1 1 1",
      "tones": "A,E,C",
      "chordName": "A,m,,"
    },
    {
      "strings": "X 0 7 9 10 8",
      "fingering": "X X 1 3 4 2",
      "tones": "A,E,C",
      "chordName": "A,m,,"
    }
  ],
  "A_dim": [
    {
      "strings": "X 0 1 2 1 X",
      "fingering": "X X 1 3 2 X",
      "tones": "A,D#,C",
      "chordName": "A,dim,,"
    },
    {
      "strings": "X X 7 8 X 8",
      "fingering": "X X 1 2 X 3",
      "tones": "A,D#,C",
      "chordName": "A,dim,,"
    },
    {
      "strings": "X 12 10 X 10 11",
      "fingering": "X 4 1 X 2 3",
      "tones": "A,C,D#",
      "chordName": "A,dim,,"
    }
  ],
  "A_aug": [
    {
      "strings": "X 0 3 2 2 1",
      "fingering": "X X 4 2 3 1",
      "tones": "A,F,C#",
      "chordName": "A,aug,,"
    },
    {
      "strings": "5 4 3 2 2 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "A,C#,F",
      "chordName": "A,aug,,"
    },
    {
      "strings": "5 X 7 6 6 5",
      "fingering": "1 X 4 2 3 1",
      "tones": "A,C#,F",
      "chordName": "A,aug,,"
    },
    {
      "strings": "X 12 11 10 10 X",
      "fingering": "X 3 2 1 1 X",
      "tones": "A,C#,F",
      "chordName": "A,aug,,"
    }
  ],
  "A_sus2": [
    {
      "strings": "X 0 2 2 0 0",
      "fingering": "X X 2 3 X X",
      "tones": "A,E,B",
      "chordName": "A,sus,2,"
    },
    {
      "strings": "X 0 2 4 0 0",
      "fingering": "X X 1 4 X X",
      "tones": "A,E,B",
      "chordName": "A,sus,2,"
    },
    {
      "strings": "7 7 7 9 10 7",
      "fingering": "1 1 1 3 4 1",
      "tones": "B,E,A",
      "chordName": "A,sus,2,"
    },
    {
      "strings": "X 0 9 9 0 0",
      "fingering": "X X 1 2 X X",
      "tones": "A,B,E",
      "chordName": "A,sus,2,"
    }
  ],
  "A_sus4": [
    {
      "strings": "X 0 2 2 3 0",
      "fingering": "X X 1 2 3 X",
      "tones": "A,E,D",
      "chordName": "A,sus,4,"
    },
    {
      "strings": "X 0 0 X 3 0",
      "fingering": "X X X X 1 X",
      "tones": "A,D,E",
      "chordName": "A,sus,4,"
    },
    {
      "strings": "5 7 7 7 5 5",
      "fingering": "1 3 3 4 1 1",
      "tones": "A,E,D",
      "chordName": "A,sus,4,"
    },
    {
      "strings": "X 7 7 9 10 10",
      "fingering": "X 1 1 2 3 4",
      "tones": "E,A,D",
      "chordName": "A,sus,4,"
    }
  ],
  "A_7": [
    {
      "strings": "X 0 2 0 2 0",
      "fingering": "X X 2 X 3 X",
      "tones": "A,E,G,C#",
      "chordName": "A,,7,"
    },
    {
      "strings": "X 0 2 2 2 3",
      "fingering": "X X 1 1 1 2",
      "tones": "A,E,C#,G",
      "chordName": "A,,7,"
    },
    {
      "strings": "5 7 5 6 5 5",
      "fingering": "1 3 1 2 1 1",
      "tones": "A,E,G,C#",
      "chordName": "A,,7,"
    },
    {
      "strings": "X 0 7 9 8 9",
      "fingering": "X X 1 3 2 4",
      "tones": "A,E,G,C#",
      "chordName": "A,,7,"
    }
  ],
  "A_maj7": [
    {
      "strings": "X 0 2 1 2 0",
      "fingering": "X X 2 1 3 X",
      "tones": "A,E,G#,C#",
      "chordName": "A,maj,7,"
    },
    {
      "strings": "X 0 2 2 2 4",
      "fingering": "X X 1 1 1 4",
      "tones": "A,E,C#,G#",
      "chordName": "A,maj,7,"
    },
    {
      "strings": "5 7 6 6 5 5",
      "fingering": "1 4 2 3 1 1",
      "tones": "A,E,G#,C#",
      "chordName": "A,maj,7,"
    },
    {
      "strings": "X 0 7 9 9 9",
      "fingering": "X X 1 3 3 3",
      "tones": "A,E,G#,C#",
      "chordName": "A,maj,7,"
    }
  ],
  "A_m7": [
    {
      "strings": "X 0 2 0 1 0",
      "fingering": "X X 2 X 1 X",
      "tones": "A,E,G,C",
      "chordName": "A,m,7,"
    },
    {
      "strings": "X 0 2 2 1 3",
      "fingering": "X X 2 3 1 4",
      "tones": "A,E,C,G",
      "chordName": "A,m,7,"
    },
    {
      "strings": "5 7 5 5 5 5",
      "fingering": "1 3 1 1 1 1",
      "tones": "A,E,G,C",
      "chordName": "A,m,7,"
    },
    {
      "strings": "X 7 7 9 8 8",
      "fingering": "X 1 1 4 2 3",
      "tones": "E,A,G,C",
      "chordName": "A,m,7,"
    }
  ],
  "A_m7b5": [
    {
      "strings": "X 0 1 0 1 X",
      "fingering": "X X 2 X 3 X",
      "tones": "A,D#,G,C",
      "chordName": "A,m,7b5,"
    },
    {
      "strings": "5 X 5 5 4 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "A,G,C,D#",
      "chordName": "A,m,7b5,"
    },
    {
      "strings": "5 6 7 5 8 5",
      "fingering": "1 2 3 1 4 1",
      "tones": "A,D#,C,G",
      "chordName": "A,m,7b5,"
    },
    {
      "strings": "X X 7 8 8 8",
      "fingering": "X X 1 2 2 2",
      "tones": "A,D#,G,C",
      "chordName": "A,m,7b5,"
    }
  ],
  "A_dim7": [
    {
      "strings": "X 0 1 2 1 2",
      "fingering": "X X 1 3 2 4",
      "tones": "A,D#,C,F#",
      "chordName": "A,dim,7,"
    },
    {
      "strings": "5 X 4 5 4 X",
      "fingering": "2 X 1 3 1 X",
      "tones": "A,F#,C,D#",
      "chordName": "A,dim,7,"
    },
    {
      "strings": "5 6 7 5 7 5",
      "fingering": "1 2 3 1 4 1",
      "tones": "A,D#,C,F#",
      "chordName": "A,dim,7,"
    },
    {
      "strings": "X 0 7 8 7 8",
      "fingering": "X X 1 3 2 4",
      "tones": "A,D#,F#,C",
      "chordName": "A,dim,7,"
    }
  ],
  "A_6": [
    {
      "strings": "X 0 2 2 2 2",
      "fingering": "X X 1 1 1 1",
      "tones": "A,E,C#,F#",
      "chordName": "A,,6,"
    },
    {
      "strings": "5 X 4 6 5 X",
      "fingering": "2 X 1 4 3 X",
      "tones": "A,F#,C#,E",
      "chordName": "A,,6,"
    },
    {
      "strings": "5 7 X 6 7 5",
      "fingering": "1 3 X 2 4 1",
      "tones": "A,E,C#,F#",
      "chordName": "A,,6,"
    },
    {
      "strings": "X 12 11 11 10 X",
      "fingering": "X 4 2 3 1 X",
      "tones": "A,C#,F#",
      "chordName": "A,,6,"
    }
  ],
  "A_m6": [
    {
      "strings": "X 0 2 2 1 2",
      "fingering": "X X 2 3 1 4",
      "tones": "A,E,C,F#",
      "chordName": "A,m,6,"
    },
    {
      "strings": "5 X 4 5 5 5",
      "fingering": "2 X 1 3 3 4",
      "tones": "A,F#,C,E",
      "chordName": "A,m,6,"
    },
    {
      "strings": "5 7 7 5 7 5",
      "fingering": "1 2 3 1 4 1",
      "tones": "A,E,C,F#",
      "chordName": "A,m,6,"
    },
    {
      "strings": "X 7 7 9 7 8",
      "fingering": "X 1 1 3 1 2",
      "tones": "E,A,F#,C",
      "chordName": "A,m,6,"
    }
  ],
  "A_add9": [
    {
      "strings": "X 0 2 4 2 0",
      "fingering": "X X 1 3 2 X",
      "tones": "A,E,B,C#",
      "chordName": "A,,add9,"
    },
    {
      "strings": "X X 7 6 5 7",
      "fingering": "X X 3 2 1 4",
      "tones": "A,C#,E,B",
      "chordName": "A,,add9,"
    },
    {
      "strings": "X 12 11 9 12 9",
      "fingering": "X 3 2 1 4 1",
      "tones": "A,C#,E,B",
      "chordName": "A,,add9,"
    },
    {
      "strings": "X 12 11 X 12 12",
      "fingering": "X 2 1 X 3 4",
      "tones": "A,C#,B,E",
      "chordName": "A,,add9,"
    }
  ],
  "A_9": [
    {
      "strings": "5 4 2 0 0 0",
      "fingering": "4 3 1 X X X",
      "tones": "A,C#,E,G,B",
      "chordName": "A,,9,"
    },
    {
      "strings": "X 0 2 4 2 3",
      "fingering": "X X 1 3 1 2",
      "tones": "A,E,B,C#,G",
      "chordName": "A,,9,"
    },
    {
      "strings": "5 7 5 6 5 7",
      "fingering": "1 3 1 2 1 4",
      "tones": "A,E,G,C#,B",
      "chordName": "A,,9,"
    },
    {
      "strings": "X 12 11 12 12 12",
      "fingering": "X 2 1 3 3 3",
      "tones": "A,C#,G,B,E",
      "chordName": "A,,9,"
    }
  ],
  "A#_major": [
    {
      "strings": "X 1 3 3 3 1",
      "fingering": "X 1 2 3 4 1",
      "tones": "A#,F,D",
      "chordName": "A#,,,"
    },
    {
      "strings": "6 5 3 3 3 X",
      "fingering": "4 3 1 1 1 X",
      "tones": "A#,D,F",
      "chordName": "A#,,,"
    },
    {
      "strings": "6 8 8 7 6 6",
      "fingering": "1 3 4 2 1 1",
      "tones": "A#,F,D",
      "chordName": "A#,,,"
    },
    {
      "strings": "X 8 8 10 11 10",
      "fingering": "X 1 1 2 4 3",
      "tones": "F,A#,D",
      "chordName": "A#,,,"
    }
  ],
  "A#_minor": [
    {
      "strings": "X 1 3 3 2 1",
      "fingering": "X 1 3 4 2 1",
      "tones": "A#,F,C#",
      "chordName": "A#,m,,"
    },
    {
      "strings": "6 8 8 6 6 6",
      "fingering": "1 3 4 1 1 1",
      "tones": "A#,F,C#",
      "chordName": "A#,m,,"
    },
    {
      "strings": "X X 8 6 6 6",
      "fingering": "X X 3 1 1 1",
      "tones": "A#,C#,F",
      "chordName": "A#,m,,"
    },
    {
      "strings": "X X 8 10 11 9",
      "fingering": "X X 1 3 4 2",
      "tones": "A#,F,C#",
      "chordName": "A#,m,,"
    }
  ],
  "A#_dim": [
    {
      "strings": "X 1 2 3 2 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "A#,E,C#",
      "chordName": "A#,dim,,"
    },
    {
      "strings": "6 4 X 6 5 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "A#,C#,E",
      "chordName": "A#,dim,,"
    },
    {
      "strings": "X X 8 9 X 9",
      "fingering": "X X 1 2 X 3",
      "tones": "A#,E,C#",
      "chordName": "A#,dim,,"
    },
    {
      "strings": "X 13 11 X 11 12",
      "fingering": "X 4 1 X 2 3",
      "tones": "A#,C#,E",
      "chordName": "A#,dim,,"
    }
  ],
  "A#_aug": [
    {
      "strings": "X 1 4 3 3 X",
      "fingering": "X 1 4 2 3 X",
      "tones": "A#,F#,D",
      "chordName": "A#,aug,,"
    },
    {
      "strings": "6 5 4 3 3 X",
      "fingering": "4 3 2 1 1 X",
      "tones": "A#,D,F#",
      "chordName": "A#,aug,,"
    },
    {
      "strings": "X X 8 7 7 6",
      "fingering": "X X 4 2 3 1",
      "tones": "A#,D,F#",
      "chordName": "A#,aug,,"
    },
    {
      "strings": "X X 8 7 7 X",
      "fingering": "X X 2 1 1 X",
      "tones": "A#,D,F#",
      "chordName": "A#,aug,,"
    }
  ],
  "A#_sus2": [
    {
      "strings": "1 1 3 3 1 1",
      "fingering": "1 1 3 4 1 1",
      "tones": "F,A#,C",
      "chordName": "A#,sus,2,"
    },
    {
      "strings": "6 3 3 5 6 X",
      "fingering": "3 1 1 2 4 X",
      "tones": "A#,C,F",
      "chordName": "A#,sus,2,"
    },
    {
      "strings": "8 8 8 10 11 8",
      "fingering": "1 1 1 3 4 1",
      "tones": "C,F,A#",
      "chordName": "A#,sus,2,"
    },
    {
      "strings": "X 13 10 10 11 13",
      "fingering": "X 3 1 1 2 4",
      "tones": "A#,C,F",
      "chordName": "A#,sus,2,"
    }
  ],
  "A#_sus4": [
    {
      "strings": "X 1 3 3 4 1",
      "fingering": "X 1 2 3 4 1",
      "tones": "A#,F,D#",
      "chordName": "A#,sus,4,"
    },
    {
      "strings": "X X 3 3 4 6",
      "fingering": "X X 1 1 2 4",
      "tones": "F,A#,D#",
      "chordName": "A#,sus,4,"
    },
    {
      "strings": "6 8 8 8 6 6",
      "fingering": "1 3 3 3 1 1",
      "tones": "A#,F,D#",
      "chordName": "A#,sus,4,"
    },
    {
      "strings": "X 8 8 10 11 11",
      "fingering": "X 1 1 2 3 4",
      "tones": "F,A#,D#",
      "chordName": "A#,sus,4,"
    }
  ],
  "A#_7": [
    {
      "strings": "X 1 3 1 3 1",
      "fingering": "X 1 3 1 4 1",
      "tones": "A#,F,G#,D",
      "chordName": "A#,,7,"
    },
    {
      "strings": "6 8 6 7 6 6",
      "fingering": "1 3 1 2 1 1",
      "tones": "A#,F,G#,D",
      "chordName": "A#,,7,"
    },
    {
      "strings": "X 8 8 10 9 10",
      "fingering": "X 1 1 3 2 4",
      "tones": "F,A#,G#,D",
      "chordName": "A#,,7,"
    },
    {
      "strings": "X 13 12 13 11 X",
      "fingering": "X 3 2 4 1 X",
      "tones": "A#,D,G#",
      "chordName": "A#,,7,"
    }
  ],
  "A#_maj7": [
    {
      "strings": "X 1 3 2 3 1",
      "fingering": "X 1 3 2 4 1",
      "tones": "A#,F,A,D",
      "chordName": "A#,maj,7,"
    },
    {
      "strings": "X X 3 3 3 5",
      "fingering": "X X 1 1 1 4",
      "tones": "F,A#,D,A",
      "chordName": "A#,maj,7,"
    },
    {
      "strings": "6 8 7 7 6 6",
      "fingering": "1 4 2 3 1 1",
      "tones": "A#,F,A,D",
      "chordName": "A#,maj,7,"
    },
    {
      "strings": "X 8 8 10 10 10",
      "fingering": "X 1 1 3 3 3",
      "tones": "F,A#,A,D",
      "chordName": "A#,maj,7,"
    }
  ],
  "A#_m7": [
    {
      "strings": "X 1 3 1 2 1",
      "fingering": "X 1 3 1 2 1",
      "tones": "A#,F,G#,C#",
      "chordName": "A#,m,7,"
    },
    {
      "strings": "X X 3 3 2 4",
      "fingering": "X X 2 3 1 4",
      "tones": "F,A#,C#,G#",
      "chordName": "A#,m,7,"
    },
    {
      "strings": "6 8 6 6 6 6",
      "fingering": "1 3 1 1 1 1",
      "tones": "A#,F,G#,C#",
      "chordName": "A#,m,7,"
    },
    {
      "strings": "X 8 8 10 9 9",
      "fingering": "X 1 1 4 2 3",
      "tones": "F,A#,G#,C#",
      "chordName": "A#,m,7,"
    }
  ],
  "A#_m7b5": [
    {
      "strings": "X 1 2 1 2 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "A#,E,G#,C#",
      "chordName": "A#,m,7b5,"
    },
    {
      "strings": "X X 2 3 2 4",
      "fingering": "X X 1 2 1 4",
      "tones": "E,A#,C#,G#",
      "chordName": "A#,m,7b5,"
    },
    {
      "strings": "6 X 6 6 5 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "A#,G#,C#,E",
      "chordName": "A#,m,7b5,"
    },
    {
      "strings": "X X 8 9 9 9",
      "fingering": "X X 1 2 2 2",
      "tones": "A#,E,G#,C#",
      "chordName": "A#,m,7b5,"
    }
  ],
  "A#_dim7": [
    {
      "strings": "X 1 2 0 2 0",
      "fingering": "X 1 2 X 3 X",
      "tones": "A#,E,G,C#",
      "chordName": "A#,dim,7,"
    },
    {
      "strings": "X X 2 3 2 3",
      "fingering": "X X 1 3 2 4",
      "tones": "E,A#,C#,G",
      "chordName": "A#,dim,7,"
    },
    {
      "strings": "6 7 8 6 8 6",
      "fingering": "1 2 3 1 4 1",
      "tones": "A#,E,C#,G",
      "chordName": "A#,dim,7,"
    },
    {
      "strings": "X X 8 9 8 9",
      "fingering": "X X 1 3 2 4",
      "tones": "A#,E,G,C#",
      "chordName": "A#,dim,7,"
    }
  ],
  "A#_6": [
    {
      "strings": "X 1 3 3 3 3",
      "fingering": "X 1 3 3 3 3",
      "tones": "A#,F,D,G",
      "chordName": "A#,,6,"
    },
    {
      "strings": "6 5 0 0 6 6",
      "fingering": "2 1 X X 3 4",
      "tones": "A#,D,G,F",
      "chordName": "A#,,6,"
    },
    {
      "strings": "6 8 X 7 8 6",
      "fingering": "1 3 X 2 4 X",
      "tones": "A#,F,D,G",
      "chordName": "A#,,6,"
    }
  ],
  "A#_m6": [
    {
      "strings": "X 1 3 X 2 3",
      "fingering": "X 1 3 X 2 4",
      "tones": "A#,F,C#,G",
      "chordName": "A#,m,6,"
    },
    {
      "strings": "X 4 5 3 6 X",
      "fingering": "X 2 3 1 4 X",
      "tones": "C#,G,A#,F",
      "chordName": "A#,m,6,"
    },
    {
      "strings": "6 X 5 6 6 6",
      "fingering": "2 X 1 3 3 4",
      "tones": "A#,G,C#,F",
      "chordName": "A#,m,6,"
    },
    {
      "strings": "6 8 8 6 8 6",
      "fingering": "1 2 3 1 4 1",
      "tones": "A#,F,C#,G",
      "chordName": "A#,m,6,"
    }
  ],
  "A#_add9": [
    {
      "strings": "X 1 0 3 1 1",
      "fingering": "X 1 X 4 2 3",
      "tones": "A#,D,C,F",
      "chordName": "A#,,add9,"
    },
    {
      "strings": "X X 8 7 6 8",
      "fingering": "X X 3 2 1 4",
      "tones": "A#,D,F,C",
      "chordName": "A#,,add9,"
    },
    {
      "strings": "X X 8 7 X 8",
      "fingering": "X X 2 1 X 3",
      "tones": "A#,D,C",
      "chordName": "A#,,add9,"
    },
    {
      "strings": "X 13 12 10 13 10",
      "fingering": "X 3 2 1 4 1",
      "tones": "A#,D,F,C",
      "chordName": "A#,,add9,"
    }
  ],
  "A#_9": [
    {
      "strings": "X 1 0 1 1 1",
      "fingering": "X 1 X 2 3 4",
      "tones": "A#,D,G#,C,F",
      "chordName": "A#,,9,"
    },
    {
      "strings": "6 5 6 5 6 X",
      "fingering": "2 1 3 1 4 X",
      "tones": "A#,D,G#,C,F",
      "chordName": "A#,,9,"
    },
    {
      "strings": "6 8 6 7 6 8",
      "fingering": "1 3 1 2 1 4",
      "tones": "A#,F,G#,D,C",
      "chordName": "A#,,9,"
    },
    {
      "strings": "X 13 12 13 13 13",
      "fingering": "X 2 1 3 3 3",
      "tones": "A#,D,G#,C,F",
      "chordName": "A#,,9,"
    }
  ],
  "B_major": [
    {
      "strings": "2 2 4 4 4 2",
      "fingering": "1 1 2 3 4 1",
      "tones": "F#,B,D#",
      "chordName": "B,,,"
    },
    {
      "strings": "X X 4 4 4 7",
      "fingering": "X X 1 1 1 4",
      "tones": "F#,B,D#",
      "chordName": "B,,,"
    },
    {
      "strings": "7 9 9 8 7 7",
      "fingering": "1 3 4 2 1 1",
      "tones": "B,F#,D#",
      "chordName": "B,,,"
    },
    {
      "strings": "X 9 9 11 12 11",
      "fingering": "X 1 1 2 4 3",
      "tones": "F#,B,D#",
      "chordName": "B,,,"
    }
  ],
  "B_minor": [
    {
      "strings": "2 2 4 4 3 2",
      "fingering": "1 1 3 4 2 1",
      "tones": "F#,B,D",
      "chordName": "B,m,,"
    },
    {
      "strings": "7 9 9 7 7 7",
      "fingering": "1 3 4 1 1 1",
      "tones": "B,F#,D",
      "chordName": "B,m,,"
    },
    {
      "strings": "X X 9 11 12 10",
      "fingering": "X X 1 3 4 2",
      "tones": "B,F#,D",
      "chordName": "B,m,,"
    },
    {
      "strings": "X X 12 11 12 10",
      "fingering": "X X 3 2 4 1",
      "tones": "D,F#,B",
      "chordName": "B,m,,"
    }
  ],
  "B_dim": [
    {
      "strings": "X 2 0 X 0 1",
      "fingering": "X 3 X X X 2",
      "tones": "B,D,F",
      "chordName": "B,dim,,"
    },
    {
      "strings": "X 2 3 4 3 X",
      "fingering": "X 1 2 4 3 X",
      "tones": "B,F,D",
      "chordName": "B,dim,,"
    },
    {
      "strings": "7 5 X 7 6 X",
      "fingering": "3 1 X 4 2 X",
      "tones": "B,D,F",
      "chordName": "B,dim,,"
    },
    {
      "strings": "X X 9 10 X 10",
      "fingering": "X X 1 2 X 3",
      "tones": "B,F,D",
      "chordName": "B,dim,,"
    }
  ],
  "B_aug": [
    {
      "strings": "X 2 1 0 0 X",
      "fingering": "X 2 1 X X X",
      "tones": "B,D#,G",
      "chordName": "B,aug,,"
    },
    {
      "strings": "X X 5 4 4 3",
      "fingering": "X X 4 2 3 1",
      "tones": "G,B,D#",
      "chordName": "B,aug,,"
    },
    {
      "strings": "7 X 9 8 8 X",
      "fingering": "1 X 4 2 3 X",
      "tones": "B,D#,G",
      "chordName": "B,aug,,"
    }
  ],
  "B_sus2": [
    {
      "strings": "2 2 4 4 2 2",
      "fingering": "1 1 3 4 1 1",
      "tones": "F#,B,C#",
      "chordName": "B,sus,2,"
    },
    {
      "strings": "7 X X 6 7 7",
      "fingering": "2 X X 1 3 4",
      "tones": "B,C#,F#",
      "chordName": "B,sus,2,"
    },
    {
      "strings": "9 9 9 11 12 9",
      "fingering": "1 1 1 3 4 1",
      "tones": "C#,F#,B",
      "chordName": "B,sus,2,"
    },
    {
      "strings": "X 14 11 11 12 14",
      "fingering": "X 3 1 1 2 4",
      "tones": "B,C#,F#",
      "chordName": "B,sus,2,"
    }
  ],
  "B_sus4": [
    {
      "strings": "2 2 4 4 5 2",
      "fingering": "1 1 2 3 4 1",
      "tones": "F#,B,E",
      "chordName": "B,sus,4,"
    },
    {
      "strings": "X X 4 4 5 7",
      "fingering": "X X 1 1 2 4",
      "tones": "F#,B,E",
      "chordName": "B,sus,4,"
    },
    {
      "strings": "7 9 9 9 7 7",
      "fingering": "1 2 3 4 1 1",
      "tones": "B,F#,E",
      "chordName": "B,sus,4,"
    },
    {
      "strings": "X 9 9 11 12 12",
      "fingering": "X 1 1 3 4 4",
      "tones": "F#,B,E",
      "chordName": "B,sus,4,"
    }
  ],
  "B_7": [
    {
      "strings": "X 2 1 2 0 2",
      "fingering": "X 2 1 3 X 4",
      "tones": "B,D#,A,F#",
      "chordName": "B,,7,"
    },
    {
      "strings": "2 2 4 2 4 2",
      "fingering": "1 1 3 1 4 1",
      "tones": "F#,B,A,D#",
      "chordName": "B,,7,"
    },
    {
      "strings": "X X 4 4 4 5",
      "fingering": "X X 1 1 1 2",
      "tones": "F#,B,D#,A",
      "chordName": "B,,7,"
    },
    {
      "strings": "7 9 7 8 7 7",
      "fingering": "1 3 1 2 1 1",
      "tones": "B,F#,A,D#",
      "chordName": "B,,7,"
    }
  ],
  "B_maj7": [
    {
      "strings": "2 2 4 3 4 2",
      "fingering": "1 1 3 2 4 1",
      "tones": "F#,B,A#,D#",
      "chordName": "B,maj,7,"
    },
    {
      "strings": "X X 4 4 4 6",
      "fingering": "X X 1 1 1 4",
      "tones": "F#,B,D#,A#",
      "chordName": "B,maj,7,"
    },
    {
      "strings": "7 9 8 8 7 7",
      "fingering": "1 4 2 3 1 1",
      "tones": "B,F#,A#,D#",
      "chordName": "B,maj,7,"
    },
    {
      "strings": "X 9 9 11 11 11",
      "fingering": "X 1 1 3 3 3",
      "tones": "F#,B,A#,D#",
      "chordName": "B,maj,7,"
    }
  ],
  "B_m7": [
    {
      "strings": "2 2 4 2 3 2",
      "fingering": "1 1 3 1 2 1",
      "tones": "F#,B,A,D",
      "chordName": "B,m,7,"
    },
    {
      "strings": "X X 4 4 3 5",
      "fingering": "X X 2 3 1 4",
      "tones": "F#,B,D,A",
      "chordName": "B,m,7,"
    },
    {
      "strings": "7 9 7 7 7 7",
      "fingering": "1 3 1 1 1 1",
      "tones": "B,F#,A,D",
      "chordName": "B,m,7,"
    },
    {
      "strings": "X 9 9 11 10 10",
      "fingering": "X 1 1 4 2 3",
      "tones": "F#,B,A,D",
      "chordName": "B,m,7,"
    }
  ],
  "B_m7b5": [
    {
      "strings": "X 2 3 2 3 X",
      "fingering": "X 1 3 2 4 X",
      "tones": "B,F,A,D",
      "chordName": "B,m,7b5,"
    },
    {
      "strings": "7 X 7 7 6 X",
      "fingering": "2 X 3 4 1 X",
      "tones": "B,A,D,F",
      "chordName": "B,m,7b5,"
    },
    {
      "strings": "7 8 9 7 10 7",
      "fingering": "1 2 3 1 4 1",
      "tones": "B,F,D,A",
      "chordName": "B,m,7b5,"
    },
    {
      "strings": "X X 9 10 10 10",
      "fingering": "X X 1 2 2 2",
      "tones": "B,F,A,D",
      "chordName": "B,m,7b5,"
    }
  ],
  "B_dim7": [
    {
      "strings": "X 2 3 1 3 1",
      "fingering": "X 2 3 1 4 1",
      "tones": "B,F,G#,D",
      "chordName": "B,dim,7,"
    },
    {
      "strings": "X X 3 4 3 4",
      "fingering": "X X 1 3 2 4",
      "tones": "F,B,D,G#",
      "chordName": "B,dim,7,"
    },
    {
      "strings": "7 X 6 7 6 X",
      "fingering": "3 X 1 4 2 X",
      "tones": "B,G#,D,F",
      "chordName": "B,dim,7,"
    },
    {
      "strings": "7 8 9 7 9 7",
      "fingering": "1 2 3 1 4 1",
      "tones": "B,F,D,G#",
      "chordName": "B,dim,7,"
    }
  ],
  "B_6": [
    {
      "strings": "X 2 1 1 0 X",
      "fingering": "X 3 1 2 X X",
      "tones": "B,D#,G#",
      "chordName": "B,,6,"
    },
    {
      "strings": "X 2 4 4 4 4",
      "fingering": "X 1 3 3 3 3",
      "tones": "B,F#,D#,G#",
      "chordName": "B,,6,"
    },
    {
      "strings": "7 X 9 8 9 X",
      "fingering": "1 X 3 2 4 X",
      "tones": "B,D#,G#",
      "chordName": "B,,6,"
    },
    {
      "strings": "X X 9 11 9 11",
      "fingering": "X X 1 3 1 4",
      "tones": "B,F#,G#,D#",
      "chordName": "B,,6,"
    }
  ],
  "B_m6": [
    {
      "strings": "2 2 0 1 0 2",
      "fingering": "2 3 X 1 X 4",
      "tones": "F#,B,D,G#",
      "chordName": "B,m,6,"
    },
    {
      "strings": "X X 4 4 3 4",
      "fingering": "X X 2 3 1 4",
      "tones": "F#,B,D,G#",
      "chordName": "B,m,6,"
    },
    {
      "strings": "7 X 6 7 7 X",
      "fingering": "2 X 1 3 4 X",
      "tones": "B,G#,D,F#",
      "chordName": "B,m,6,"
    },
    {
      "strings": "7 9 9 7 9 7",
      "fingering": "1 2 3 1 4 1",
      "tones": "B,F#,D,G#",
      "chordName": "B,m,6,"
    }
  ],
  "B_add9": [
    {
      "strings": "X 2 1 X 2 2",
      "fingering": "X 2 1 X 3 4",
      "tones": "B,D#,C#,F#",
      "chordName": "B,,add9,"
    },
    {
      "strings": "7 6 X 6 7 7",
      "fingering": "3 1 X 2 4 4",
      "tones": "B,D#,C#,F#",
      "chordName": "B,,add9,"
    },
    {
      "strings": "X X 9 8 7 9",
      "fingering": "X X 3 2 1 4",
      "tones": "B,D#,F#,C#",
      "chordName": "B,,add9,"
    },
    {
      "strings": "X 14 13 11 14 11",
      "fingering": "X 3 2 1 4 1",
      "tones": "B,D#,F#,C#",
      "chordName": "B,,add9,"
    }
  ],
  "B_9": [
    {
      "strings": "X 2 1 2 2 2",
      "fingering": "X 2 1 3 3 4",
      "tones": "B,D#,A,C#,F#",
      "chordName": "B,,9,"
    },
    {
      "strings": "7 4 4 6 4 5",
      "fingering": "4 1 1 3 1 2",
      "tones": "B,C#,F#,D#,A",
      "chordName": "B,,9,"
    },
    {
      "strings": "7 9 7 8 7 9",
      "fingering": "1 3 1 2 1 4",
      "tones": "B,F#,A,D#,C#",
      "chordName": "B,,9,"
    },
    {
      "strings": "X X 9 8 10 9",
      "fingering": "X X 2 1 4 3",
      "tones": "B,D#,A,C#",
      "chordName": "B,,9,"
    }
  ]
}

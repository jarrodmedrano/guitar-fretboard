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
  ]
}

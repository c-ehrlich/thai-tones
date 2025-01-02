# TODO

- [ ] find non-syllables with ai
  - [x] 1-500
  - [x] 501-1000
  - [x] 1001-1500
  - [x] 1501-2000
  - [x] 2001-2500
  - [x] 2501-3000
  - [x] 3001-3500
  - [ ] 3501-4000
  - [ ] 4001-4500
  - [ ] 4501-5000
  - [ ] 5001-5500
  - [ ] 5501-6000
  - [ ] 6001-6500
  - [ ] 6501-7000
  - [ ] 7001-7500
  - [ ] 7501-8000
  - [ ] 8001-8500
  - [ ] 8501-9000
  - [ ] 9001-9500
  - [ ] 9500-end
- [ ] manually confirm non-syllables (use voice gallery)
- [ ] better TTS (Azure https://speech.microsoft.com/portal/voicegallery)
  - [x] set up
  - [x] generate all syllables
  - [ ] go through syllables, tag
    - [ ] yellow: probably a syllable, but audio is bad
    - [ ] green: good
    - [ ] blue: no idea...
    - [ ] purple: (c1)a-(c2) pattern
  - [ ] delete non syllables
  - [ ] write a script that checks which syllables from the map are missing, delete them from the map and from the json
- [ ] enhance tone detection - return:
      - tone
      - consonant
      - consonant class
      - syllable dead or live (and why?)
      - tone marker
      - image?
      - [ ] ...and do something with this in ui
- [ ] UI that isn't dogshit
- [ ] SRS
- [ ] LocalStorage?
- [ ] ability to skew the algorithm - truncate at top 1k, standard, disproportionately show rare syls
- [ ] React Native? => would allow not needing a server...
- [ ] make some features paid - maybe neural voice, study mode, srs

# DONE

- [x] super basic TTS (web speech api)
- [x] super basic tone detection
- [x] allow replaying audio
- [x] mechanism for banning syllables

- [ ] landing page (on c-ehrlich.dev)
  - [ ] arrows https://x.com/leeerob/status/1874153083636506794
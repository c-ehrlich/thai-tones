# TODO

- [ ] better TTS (Azure https://speech.microsoft.com/portal/voicegallery)
  - [x] set up
  - [x] generate all syllables
  - [x] use in app
- [ ] enhance tone detection - return:
      - tone
      - consonant
      - consonant class
      - syllable dead or live (and why?)
      - tone marker
      - image?
      - [ ] ...and do something with this in ui
      - add support for "implied อะ" (eg บริ)
- [ ] setup prettier
  - [ ] gluestack https://gluestack.io/ui/docs/home/getting-started/tooling-setup
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

  
- [ ] go through syllables, tag
  - [ ] yellow: probably a syllable, but audio is bad
  - [ ] green: good
  - [ ] blue: no idea...
  - [ ] purple: (c1)a-(c2) pattern
- [ ] delete non syllables
- [ ] write a script that checks which syllables from the map are missing, delete them from the map and from the json
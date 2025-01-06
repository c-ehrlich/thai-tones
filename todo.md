# TODO

## To make it ready to let people test
- [ ] answer page improvements
  - [ ] (why is the consonant long or short)
  - [ ] put all of this in a modal?
  - [ ] make it look nice
  - [ ] (?) info for each section... for exampel ImpliedShortO
    - [ ] or only for some vowels/consonants/clusters?
- [ ] track practice count
  - [ ] alternative to mmkv that works with expo go?
- [ ] after 200 practices, throw up a form about
  - [ ] thanks for trying it
  - [ ] what do you like about this app?
  - [ ] what do you dislike about this app?
  - [ ] any other comments?
  - [ ] how much would you be willing to pay for unlimited use of this app? $0/2/4/8/16
- [x] settings
  - [ ] light/dark mode?
    - [x] create but it doesn't do anything
    - [x] rig up
    - [ ] make all components respect it

## Better syllable handling
- [ ] จารย์ parsed wrong (it thinks ารย is the vowel and รย์ is the final)
- [ ] ขนาด parsed wrong (vowel -นาด, final นาด)
- [ ] ไหน parsed wrong (its nai, not hain)
- [ ] handle two-syllables like ขนม (maybe break them up?)
  - [ ] another example: "implied อะ" (eg บริ)
  - [ ] ปฐม
- [ ] ...and do something with this in ui
- [ ] make sure the handling of glides at the bottom here is reasonable https://funtolearnthai.com/vowels_list.php
- [ ] either delete all words with ธรรม, or handle it correctly
  - [ ] https://rapidlearnthai.com/more-notes-about-the-%E0%B8%A3%E0%B8%A3-run-vowel/
- [ ] show transliteration of components (maybe on tap or sth?)

## platform
- [ ] split audio and explanation part of report, optional text box
- [ ] setup gluestack/tailwind prettier stuff https://gluestack.io/ui/docs/home/getting-started/tooling-setup
- [ ] SRS
- [ ] LocalStorage?
- [ ] ability to skew the algorithm - truncate at top 1k, standard, disproportionately show rare syls
- [ ] React Native? => would allow not needing a server...
- [ ] make some features paid - maybe neural voice, study mode, srs

## To make it ready to actually sell
- [ ] landing page (thaitones.c-ehrlich.dev, simple RSC react app or whatever)
  - [ ] arrows https://x.com/leeerob/status/1874153083636506794

## Super wishlist
- some automatic way to detect invalid final consonants and remove words with them. eg "จารย"

## Remove
- "อ"
- "พบท"

# DONE

- [x] super basic TTS (web speech api)
- [x] super basic tone detection
- [x] allow replaying audio
- [x] mechanism for banning syllables

- [x] better TTS (Azure https://speech.microsoft.com/portal/voicegallery)
  - [x] set up
  - [x] generate all syllables
  - [x] use in app
- [x] "good enough" answer page
  - [x] starting cluster + class
  - [x] ending consonant
  - [x] vowel
    - [x] function to get it if we know start+end
    - [x] edge case vowels
      - [x] short o
      - [x] short a
    - [x] more unit tests for that function
  - [x] syllable live or dead
  - [x] why is the syllable live or dead
  - [x] (when it matters: consonant long or short)
  - [x] get info onto the practice screen
- [x] enhance tone detection - return:
  - [x] tone
  - [x] starting cluster
  - [x] starting cluster class
  - [x] syllable dead or live
  - [x] vowel long or short
  - [x] tone marker
- [x] settings
  - [x] traditional or modern font (figure out what the right name is for this)
    - [x] create but it doesn't do anything
    - [x] rig up
    - [x] install a "modern" font and use it for the word info
    - [x] add a setting to show or hide the font toggle
- fix tone detection mistakes...
  - [x] แถว parsed wrong (it thinks ว is the vowel and แ the final consonant)
  - [x] เปิด parsed wrong (vowel and final)
  - [x] ทด parsed wrong (thinks it has a short vowel)

- [x] setup prettier
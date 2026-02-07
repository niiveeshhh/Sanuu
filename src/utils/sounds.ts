import { Howl } from 'howler';

// Placeholder URLs - replace with actual cute sounds
const POP_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.m4a';
const SUCCESS_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.m4a';
const BGM_URL = 'https://assets.mixkit.co/music/preview/mixkit-love-story-piano-solo-2947.mp3';

export const sounds = {
    pop: new Howl({ src: [POP_SOUND], volume: 0.5 }),
    success: new Howl({ src: [SUCCESS_SOUND], volume: 0.5 }),
    bgm: new Howl({ src: [BGM_URL], volume: 0.3, loop: true, html5: true }),
};

export const playPop = () => sounds.pop.play();
export const playSuccess = () => sounds.success.play();
export const toggleBgm = (play: boolean) => {
    if (play) {
        sounds.bgm.play();
    } else {
        sounds.bgm.pause();
    }
};

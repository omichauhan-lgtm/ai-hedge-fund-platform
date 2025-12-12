"use client";

import useSound from 'use-sound';

// Using consistent high-quality UI sounds
const SOUNDS = {
    CLICK: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Crisp Click
    HOVER: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Subtle tech swish
    SUCCESS: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3", // Positive notification
    BOOT: "https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3", // Cinematic Deep Boom
};

export function useUISounds() {
    const [playClick] = useSound(SOUNDS.CLICK, { volume: 0.5 });
    const [playHover] = useSound(SOUNDS.HOVER, { volume: 0.1 });
    const [playSuccess] = useSound(SOUNDS.SUCCESS, { volume: 0.5 });
    const [playBoot] = useSound(SOUNDS.BOOT, { volume: 0.6 });

    return { playClick, playHover, playSuccess, playBoot };
}

import { PUBLIC_POLESTAR_URL } from "$env/static/public";

type MountFunction = (target: HTMLElement, prop?: any) => void

interface RemoteNavbars {
    TopNavInstance: MountFunction;
    BottomNavInstance: MountFunction;
}

const remoteUrl = 'http://localhost:5174/navbars.js';

export async function loadRemoteNavbars(): Promise<RemoteNavbars> {
    const remote = await import(/* @vite-ignore */ PUBLIC_POLESTAR_URL);
    return remote
}
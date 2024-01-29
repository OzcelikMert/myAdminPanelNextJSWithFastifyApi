class Thread {
    static start(func: () => void, ms: number = 100): void {
        setTimeout(() => func(), ms);
    }
    static sleep(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, 750));
    }
}

export default Thread;
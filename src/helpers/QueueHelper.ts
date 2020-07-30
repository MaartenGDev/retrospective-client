export class QueueHelper {
    private static pendingBounceId?: number;

    static queue(bounceInMs: number, resolveAfterMs: number, onStart: () => any, onResolve: () => any) {
        if(this.pendingBounceId){
            clearInterval(this.pendingBounceId);
        }

        this.pendingBounceId = setTimeout(() => {
            onStart();

            setTimeout(() => {
                onResolve();
            }, resolveAfterMs)
        }, bounceInMs);
    }
}
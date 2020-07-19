export function parseId(rawId: string): number|string {
    const isNumber = !isNaN(rawId as any);

    return isNumber ? parseInt(rawId) : rawId;
}
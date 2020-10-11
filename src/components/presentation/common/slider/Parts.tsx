import React, {CSSProperties, Fragment} from 'react'

const railOuterStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
    borderRadius: 7,
    cursor: 'pointer',
}

const railInnerStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
    borderRadius: 7,
    pointerEvents: 'none',
    backgroundColor: 'rgb(155,155,155)',
}



interface SliderRailProps {
    getRailProps: () => any
}

export function SliderRail({getRailProps}: SliderRailProps) {
    return (
        <Fragment>
            <div style={railOuterStyle} {...getRailProps()} />
            <div style={railInnerStyle}/>
        </Fragment>
    )
}


interface HandleProps {
    domain: number[],
    handle: {
        id: string,
        value: number,
        percent: number,
    },
    getHandleProps: (id: string) => any,
    disabled?: boolean,
}

export function Handle({
                           domain: [min, max],
                           handle: {id, value, percent},
                           disabled = false,
                           getHandleProps,
                       }: HandleProps) {
    return (
        <Fragment>
            <div
                style={{
                    left: `${percent}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                    zIndex: 5,
                    width: 28,
                    cursor: 'pointer',
                    backgroundColor: 'none',
                }}
                {...getHandleProps(id)}
            />
            <div
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                style={{
                    left: `${percent}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    width: 24,
                    borderRadius: '50%',
                    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#ffc400',
                }}
            />
        </Fragment>
    )
}

interface KeyboardHandleProps {
    domain: number[],
    handle: {
        id: string,
        value: number,
        percent: number,
    },
    getHandleProps: (id: string) => any,
    disabled?: boolean,
}


export function KeyboardHandle({
                                   domain: [min, max],
                                   handle: {id, value, percent},
                                   disabled = false,
                                   getHandleProps,
                               }: KeyboardHandleProps) {
    return (
        <button
            role="slider"
            type="button"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{
                left: `${percent}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                width: 10,
                height: 27,
                borderRadius: '5px',
                border: 'none',
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                backgroundColor: 'white',
            }}
            {...getHandleProps(id)}
        />
    )
}

interface TrackProps {
    isFirst: boolean,
    isLast: boolean,
    source: {
        id: string,
        value: number,
        percent: number,
    },
    attributes: {
        name: string,
        color: string
    }
    target: {
        id: string,
        value: number,
        percent: number,
    },
    getTrackProps: () => any,
    disabled?: boolean,
}

export function Track({source, target, isFirst, isLast, attributes, getTrackProps, disabled = false}: TrackProps) {

    const borderRadius: CSSProperties = isFirst ? {
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
    } : isLast ? {
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
    } : {};

    return (
        <div
            style={{
                overflow: 'hidden',
                position: 'absolute',
                transform: 'translate(0%, -50%)',
                zIndex: 1,
                backgroundColor: attributes.color,
                cursor: 'pointer',
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
                ...borderRadius
            }}
            {...getTrackProps()}
        ><span style={{whiteSpace: "nowrap",color: "white", padding: "10px 0 10px 15px", display: "inline-block"}}>{attributes.name} ({Math.round(target.percent - source.percent)}%)</span></div>
    )
}

interface TickProps {
    tick: {
        id: string,
        value: number,
        percent: number
    }
    count: number,
    format?: (number: number) => string,
}

export function Tick({tick, count, format = number => "" + number}: TickProps) {
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    marginTop: 14,
                    width: 1,
                    height: 5,
                    backgroundColor: 'rgb(200,200,200)',
                    left: `${tick.percent}%`,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    marginTop: 22,
                    fontSize: 10,
                    textAlign: 'center',
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${tick.percent}%`,
                }}
            >
                {format(tick.value)}
            </div>
        </div>
    )
}
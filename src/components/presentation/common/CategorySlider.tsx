import React, {Component, CSSProperties} from 'react';
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { SliderRail, KeyboardHandle, Track } from './slider/Parts'

const SliderSection = styled.div`
  width: 100%;
  padding-top: 15px;
  height: 25px;
`;

export interface ICategory {
    id: number,
    name: string,
    value: number,
    color: string
}

interface IProps {
    disabled?: boolean,
    categories: ICategory[],
    onCategoriesChange: (categories: ICategory[]) => void
}
interface IState{
    values: readonly number[],
    attributes: {name: string, color: string}[]
}
const sliderStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
}

const domain = [0, 100]



export class CategorySlider extends Component<IProps,IState> {
    state = {
        values: [],
        attributes: []
    }

    componentDidMount() {
        this.loadCategories();
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if(prevProps === this.props){
            return;
        }
        this.loadCategories();
    }

    loadCategories(){
        const {categories} = this.props;

        const itemsToShow = categories.length - 1;

        const values = categories.slice(0, itemsToShow).map((c, index, items) => {
            return index === 0 ? c.value : (c.value + items[index - 1].value);
        });

        this.setState({
            values,
            attributes: categories.map(c => ({name: c.name, color: c.color }))
        });
    }

    onChange = (values: readonly number[]) => {
        const {categories, onCategoriesChange} = this.props

        const updatedCategories = categories.map((c, index, items) => {
            const previousValue = index === 0 ? 0 : values[index - 1];

            const nextValue = index > (values.length - 1)
                ? 100 - values[values.length -1]
                : values[index] - previousValue;

            return {...c, value: nextValue}
        });

        onCategoriesChange(updatedCategories);

        this.setState({ values })
    }

    render() {
        const {values, attributes} = this.state
        const {disabled} = this.props

        return (
            <SliderSection>
                <Slider
                    mode={3}
                    step={1}
                    domain={domain}
                    rootStyle={sliderStyle}
                    disabled={disabled}
                    onChange={this.onChange}
                    values={values}
                >
                    <Rail>
                        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                    </Rail>
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div>
                                {handles.map(handle => (
                                    <KeyboardHandle
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        disabled={disabled}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Tracks left={true} right={true}>
                        {({ tracks, getTrackProps }) => (
                            <div>
                                {tracks.map(({ id, source, target }, index) => {
                                    return <Track
                                        key={id}
                                        isFirst={index === 0}
                                        isLast={index === attributes.length -1}
                                        source={source}
                                        target={target}
                                        disabled={disabled}
                                        attributes={attributes[index] || {name: '', color: '#b28900'}}
                                        getTrackProps={getTrackProps}
                                    />
                                })}
                            </div>
                        )}
                    </Tracks>
                </Slider>
            </SliderSection>
        )
    }
}
import React, {Component, RefObject} from 'react';
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  
  div:first-of-type {
    border-radius: 5px 0 0 5px;
  }
  div:last-of-type {
      border-radius: 0 5px 5px 0;
  }
`;

const Section = styled.div`
  position: relative;
  color: white;
  padding: 10px;
`;

const SlidingHandle = styled.span`
 position: absolute;
 right: -5px;
 top: 5px;
 height: calc(100% - 10px);
 width: 10px;
 background-color: white;
 border-radius: 5px;
 z-index: 1;
 cursor: grab;
 box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

interface ICategory {
    name: string,
    value: number,
    color: string
}

interface IProps {
    categories: ICategory[],
    onCategoriesChange: (categories: ICategory[]) => void
}

interface IState {
    categories: ICategory[]
}


export class CategorySlider extends Component<IProps, IState> {
    startPosition = 0;
    categoryNameToUpdate = "";
    isDragging = false;
    bar: RefObject<HTMLDivElement> = React.createRef();

    state: IState = {
        categories: []
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleDocumentMouseDown);
        document.addEventListener('mouseup', this.handleDragFinished);
        document.addEventListener('mousemove', this.updateCategoryWidths);

        this.setState({categories: this.props.categories})
    }

    componentWillUnmount() {
        document.removeEventListener('Event', this.handleDocumentMouseDown);
        document.removeEventListener('Event', this.handleDragFinished);
        document.removeEventListener('Event', this.updateCategoryWidths);
    }

    private handleDocumentMouseDown = (event: Event) => {
        event.preventDefault();
        this.startPosition = ((event as MouseEvent).x);
        this.categoryNameToUpdate = ((event as MouseEvent).target! as HTMLSpanElement).id;
        this.isDragging = true;
    };

    private handleDragFinished = (event: Event) => {
        const {categories} = this.state
        this.props.onCategoriesChange(categories);
        this.updateCategoryWidths(event);
        this.isDragging = false;
    }

    private updateCategoryWidths = (event: Event) => {
        if (!this.categoryNameToUpdate || !this.isDragging) {
            return;
        }
        const endPosition = (event as MouseEvent).x;
        const sliderDimensions = (this.bar.current! as HTMLDivElement).getBoundingClientRect();
        const differenceFromStart = endPosition - this.startPosition;

        const totalWidth = sliderDimensions.right - sliderDimensions.left;

        const percentageChange = (differenceFromStart / totalWidth) * 100;

        const updatedCategories = this.state.categories.map(c => ({...c}));
        const changedCategoryIndex = updatedCategories.findIndex(c => c.name === this.categoryNameToUpdate);


        let pendingChange = Math.abs(percentageChange);

        const categoryIndexToReduce = percentageChange > 0 ? changedCategoryIndex : changedCategoryIndex - 1;
        const categoryIndexToIncrease = percentageChange > 0 ? changedCategoryIndex - 1 : changedCategoryIndex;

        if(updatedCategories[categoryIndexToReduce].value < pendingChange){
            pendingChange = updatedCategories[categoryIndexToReduce].value;
        }

        updatedCategories[categoryIndexToReduce].value = updatedCategories[categoryIndexToReduce].value - pendingChange;
        updatedCategories[categoryIndexToIncrease].value = updatedCategories[categoryIndexToIncrease].value + pendingChange;

        this.startPosition = endPosition;
        this.setState({categories: updatedCategories});
    };

    render() {
        const {categories} = this.state

        return (<Bar ref={this.bar}>
            {categories.map((category, index) => {
                const showHandle = index !== (categories.length - 1);
                const categoryId = showHandle ? categories[index + 1].name : '';

                return (
                    <Section key={category.name} style={{width: `${category.value}%`, backgroundColor: category.color}}>
                        <span>{category.name}</span> {showHandle ? <SlidingHandle id={categoryId}/> : null}
                    </Section>);
            })}
        </Bar>);
    }
}
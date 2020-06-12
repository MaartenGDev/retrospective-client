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
    categories: ICategory[],
    isDragging: boolean,
    dragStartX: number,
    categoryIndexToUpdate: number;
}


export class CategorySlider extends Component<IProps, IState> {
    private bar: RefObject<HTMLDivElement> = React.createRef();

    state: IState = {
        categories: [],
        isDragging: false,
        dragStartX: 0,
        categoryIndexToUpdate: -1
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleDragStart);
        document.addEventListener('mousemove', this.updateCategoryWidths);
        document.addEventListener('mouseup', this.handleDragFinished);

        this.setState({categories: this.props.categories})
    }

    componentWillUnmount() {
        document.removeEventListener('Event', this.handleDragStart);
        document.removeEventListener('Event', this.updateCategoryWidths);
        document.removeEventListener('Event', this.handleDragFinished);
    }

    private handleDragStart = (event: Event) => {
        const categoryIndexToUpdate = parseInt(((event as MouseEvent).target! as HTMLSpanElement).id, 10);
        if(isNaN(categoryIndexToUpdate)) return;

        event.preventDefault();

        this.setState({
            isDragging: true,
            dragStartX: (event as MouseEvent).x,
            categoryIndexToUpdate
        })
    };

    private handleDragFinished = (event: Event) => {
        this.updateCategoryWidths(event);
        this.setState({isDragging: false, categoryIndexToUpdate: -1})
        this.props.onCategoriesChange(this.state.categories);
    }

    private updateCategoryWidths = (event: Event) => {
        const {categories, isDragging, dragStartX, categoryIndexToUpdate} = this.state
        if (categoryIndexToUpdate === -1 || !isDragging) return;


        // Slider
        const sliderDimensions = (this.bar.current! as HTMLDivElement).getBoundingClientRect();
        const totalWidth = sliderDimensions.right - sliderDimensions.left;

        // Movement
        const currentX = (event as MouseEvent).x;
        const differenceFromStart = currentX - dragStartX;
        const percentageChange = (differenceFromStart / totalWidth) * 100;

        // Update categories
        let pendingChange = Math.abs(percentageChange);

        const categoryIndexToReduce = percentageChange > 0 ? categoryIndexToUpdate : categoryIndexToUpdate - 1;
        const categoryIndexToIncrease = percentageChange > 0 ? categoryIndexToUpdate - 1 : categoryIndexToUpdate;

        const updatedCategories = categories.map(c => ({...c}));

        // Prevent dragging category over entire other category
        if(updatedCategories[categoryIndexToReduce].value < pendingChange){
            pendingChange = updatedCategories[categoryIndexToReduce].value;
        }

        updatedCategories[categoryIndexToReduce].value = updatedCategories[categoryIndexToReduce].value - pendingChange;
        updatedCategories[categoryIndexToIncrease].value = updatedCategories[categoryIndexToIncrease].value + pendingChange;

        this.setState({categories: updatedCategories, dragStartX: currentX});
    };

    render() {
        const {categories} = this.state

        return (<Bar ref={this.bar}>
            {categories.map((category, categoryIndex) => {
                const showHandle = categoryIndex !== (categories.length - 1);
                const categoryId = categoryIndex + 1 + '';

                return (
                    <Section key={category.name} style={{width: `${category.value}%`, backgroundColor: category.color}}>
                        <span>{category.name} ({category.value.toFixed(0)}%)</span> {showHandle ? <SlidingHandle id={categoryId}/> : null}
                    </Section>);
            })}
        </Bar>);
    }
}
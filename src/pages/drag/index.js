import React, {useState, useCallback} from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import Card from './Card'
import './style.less'
import {toJS} from "mobx";

export default function Drag() {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        }
    ]);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
        console.log('cards:', toJS(cards))
    }, [cards]);
    const renderCard = (card, index) => {
        return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='container'>{cards.map((card, i) => renderCard(card, i))}</div>
        </DndProvider>
    )
}

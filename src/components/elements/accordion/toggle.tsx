import { useAccordionButton } from 'react-bootstrap/AccordionButton';

type IPageProps = {
    children: any
    eventKey: string
    onTrigger?: () => void
}

export default function ComponentAccordionToggle(props: IPageProps) {
    const decoratedOnClick = useAccordionButton(props.eventKey, props.onTrigger);

    return (
        <div onClick={decoratedOnClick}>
            {props.children}
        </div>
    );
}

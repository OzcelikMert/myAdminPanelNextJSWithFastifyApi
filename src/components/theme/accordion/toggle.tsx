import { useAccordionButton } from 'react-bootstrap/AccordionButton';

type PageProps = {
    children: any
    eventKey: string
    onTrigger?: () => void
}

export default function ThemeAccordionToggle(props: PageProps) {
    const decoratedOnClick = useAccordionButton(props.eventKey, props.onTrigger);

    return (
        <div onClick={decoratedOnClick}>
            {props.children}
        </div>
    );
}

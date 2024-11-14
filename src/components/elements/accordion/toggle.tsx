import { useAccordionButton } from 'react-bootstrap/AccordionButton';

type IPageProps = {
  children: any;
  eventKey: string;
  onClick?: () => void;
};

export default function ComponentAccordionToggle(props: IPageProps) {
  const decoratedOnClick = useAccordionButton(props.eventKey, props.onClick);

  return <div onClick={decoratedOnClick}>{props.children}</div>;
}

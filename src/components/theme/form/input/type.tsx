import React from 'react'

type PageProps = {
    title?: string,
    titleElement?: JSX.Element
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const ThemeFormType = React.forwardRef((props: PageProps, ref: any ) => {
    let input: JSX.Element;
    const elementProps = Object.assign({}, props);
    delete elementProps.titleElement;
    switch (props.type) {
        case `textarea`:
            input = <textarea
                {...elementProps}
                className={`field textarea ${typeof elementProps.className !== "undefined" ? elementProps.className : ``}`}
            >{elementProps.value}</textarea>;
            break;
        default:
            input = <input
                {...elementProps}
                className={`field ${typeof elementProps.className !== "undefined" ? elementProps.className : ``}`}
                placeholder=" "
            />;
            break;
    }
    return (
        <label className="theme-input">
            {input}
            <span className="label">{props.title} {props.titleElement}</span>
        </label>
    );
});

export default ThemeFormType;

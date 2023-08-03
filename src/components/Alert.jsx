import { useEffect } from "react";


export function Alert(props) {
    const {title, closeAlert} = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 1000);

        return () => {
            clearTimeout(timerId)
        };
        //eslint-disable-next-line
    }, [title]);

    return (
    <div id="toast-container">
        <div className="toast">{title} added to Basket</div>
    </div>
    )
}
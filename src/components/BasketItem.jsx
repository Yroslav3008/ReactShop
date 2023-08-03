export function BasketItem(props) {
    const {
        id,
        title,
        price,
        quantity,
        removeFromBasket,
        addQuantity,
        removeQuantity
    } = props;
    console.log(props);
    return <li className="collection-item">
        {title} x{quantity} = {price * quantity}grn
        <button className="addGood good" onClick={() => addQuantity(id)}>+</button>
        <button className="removeGood good" onClick={() => removeQuantity(id)}>-</button>
        <span className="secondary-content" onClick={() => removeFromBasket(id)}>
            <i className="material-icons basket-delete">delete</i>
        </span>
            </li>


}